

const fs = require("fs");
const path = require("path");
const Koa = require("koa");


const app = new Koa();
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");

// 这里是最简单的正则，用捕获分组
// 解析.js结尾的时候会报错，因为把main.js中的from "vue"解析为from "/@modules/vue"，所以报错
/**
 * Failed to load module script: The server responded with a non-JavaScript MIME type of "text/plain". 
 * 	Strict MIME type checking is enforced for module scripts per HTML spec.
 */


/**
 * 支持ts,scss,less....这些都是类似webpack的loader的功能
 */

//  用语法模块最好
function rewriteImport(content){
	return content.replace(/from ['|"]([^'"]+)['|"]/g,function(s0,s1){
		if(s1[0]!=="." && s1[1]!=="/"){
			return `from "/@modules/${s1}"`
		}else{
			return s0;
		}
	})
}

// 这些用koa中间件做最适合
app.use(async ctx=>{
	// ctx是有koa传入的封装了request和response的变量，我们可以通过它访问request和response
	const {request:{url,query}}=ctx;
	if(url=="/"){
		let content = fs.readFileSync("./index.html","utf-8");
		content = content.replace("<script",`
			<script>
				window.process = {env:{NODE_ENV:'DEV'}}
			</script>
			<script`)
		ctx.type = "text/html";
		ctx.body = content;
	}else if(url.endsWith(".js")){
		// url = /src/main.js
		// url.slice(1) = src/main.js
		// __dirname 父文件夹的绝对路径 D:\study\vue3.0\vue3--kkb\workshop\vite-mini
		// path.resolve 拼接
		const p = path.resolve(__dirname,url.slice(1));
		// D:\study\vue3.0\vue3--kkb\workshop\vite-mini\src\main.js
		const content = fs.readFileSync(p,"utf-8");
		ctx.type = "application/javascript";
		ctx.body =rewriteImport(content);
	}else if(url.startsWith("/@modules/")){
		const prefix = path.resolve(__dirname,"node_modules",url.replace("/@modules/",""));
		// prefix:D:\study\vue3.0\vue3--kkb\workshop\vite-mini\node_modules\vue
		// url:/@modules/vue

		const module = require(prefix+"/package.json").module;
		// module:dist/vue.runtime.esm-bundler.js

		const p = path.resolve(prefix,module);
		// D:\study\vue3.0\vue3--kkb\workshop\vite-mini\node_modules\vue\dist\vue.runtime.esm-bundler.js
		
		const ret = fs.readFileSync(p,"utf-8");
		ctx.type = "application/javascript";
		ctx.body =rewriteImport(ret);
	}else if(url.indexOf(".vue")>-1){
		// 解析单文件组件，vue专门提供了库，vue-compiler-sfc
		const p = path.resolve(__dirname,url.split("?")[0].slice(1));
		console.log(query);
		const {descriptor} = compilerSfc.parse(fs.readFileSync(p,"utf-8"));
		if(!query.type){
			// 由于这里又import了,所以判断query
			// 这里是script
			ctx.type = "application/javascript";
			ctx.body = `
			${rewriteImport(descriptor.script.content).replace("export default","const __script =")}
			import {render as __render} from "${url}?type=template"
			__script.render = __render
			export default __script
			`
		}else if(query.type == "template"){
			// 这里是template
			// content是里面的内容，但是template需要去render
			// vue提供了render的库 @vue/compiler-dom
			const template = descriptor.template;
			// mode:module 支持es6
			const render = compilerDom.compile(template.content,{mode:"module"}).code;
			ctx.type = "application/javascript";
			ctx.body = rewriteImport(render);
		}
		
	}else if(url.endsWith(".css")){
		// 直接返回css没有意义
		// 把css转换成link标签插入全局
		// 和css-loader的原理差不多 
		const p = path.resolve(__dirname,url.slice(1));
		const file = fs.readFileSync(p,"utf-8");
		const content = `
			const css = '${file.replace(/\n/g,"")}';
			let link = document.createElement("style");
			link.setAttribute("type","text/css");
			document.head.appendChild(link);
			link.innerHTML = css;
			export default css; 
		`
		ctx.type = "application/javascript";
		ctx.body = content;
	}else{
		ctx.body="嘿嘿";
	}
})

app.listen(3001,()=>{
	console.log(3001);
})