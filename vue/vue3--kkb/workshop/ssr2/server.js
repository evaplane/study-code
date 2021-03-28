// server side render 服务端渲染
// 提升seo


const App = {
	template:`
		<div>
			<div v-for = "n in 1000">
				<ul>
					<li>eva</li>
					<li>eva</li>
					<li>eva</li>
					<li>eva</li>
					<li v-for="todo in todos">{{n}}-->{{todo}}</li>
				</ul>
			</div>
		</div>
	`,
	data(){
		return {
			todos:["乐乐乐","悦悦悦"]
		}
	}
}



const express = require("express");
const app = express();
const Vue = require("vue");
const renderer = require("vue-server-renderer").createRenderer();
const vue2Compiler = require("vue-template-compiler");

// 这步是预解析，预解析render，render是一个函数
App.render = new Function(vue2Compiler.ssrCompile(App.template).render)

app.get("/",async function(req,res){
	let vapp = new Vue(App);
	// 把vue的component的解析成字符串
	let html = await renderer.renderToString(vapp);

	res.send(`<h1>vue2 ssr</h1>${html}`);
})

app.listen("9092",()=>{
	console.log("listen 9092");
})