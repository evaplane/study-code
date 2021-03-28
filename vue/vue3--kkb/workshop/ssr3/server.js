

const App = {
	template:`
		<div>
			<div v-for="n in 1000">
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
			todos:[
				"开开心心","快快乐乐"
			]
		}
	}
}


const express = require("express");
const app = express();
const Vue = require("vue");
const render = require("@vue/server-renderer");
const vue3Compiler = require("@vue/compiler-ssr");

// 预解析 template,因为vue3的源码中有import，就是require
App.ssrRender = new Function("require",vue3Compiler.compile(App.template).code)(require);

app.get("/",async function(req,res){
	let vapp = Vue.createApp(App);

	let html = await render.renderToString(vapp);

	res.send(`<h1>Vue3 ssr</h1>${html}`)
})



app.listen(9093,()=>{
	console.log(9093);
})