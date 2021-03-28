// const webpack = require('webpack')
// const options = require('../webpack.config')

// const compiler = webpack(options)
// Object.keys(compiler.hooks).forEach(hookName=>{
// 	compiler.hooks[hookName].tap('eva',()=>{
// 		console.log(`run ----> ${hookName}`);
// 	})
// })

// compiler.run()

// import "./css/index.less"
// import "@babel/polyfill"
// import axios from 'axios'
// axios.get('/api/info').then(res=>{
// 	console.log(res);
// })

// const arr = [new Promise(()=>{}),new Promise(()=>{})]
// import Vue from 'vue/dist/vue.esm.js'
// import './App.vue'
// import React from 'react'
// import ReactDOM from 'react-dom';
// class App extends React.Component{
// 	render(){
// 		return (
// 			<div>hello react </div>
// 		)
// 	}
// }
// ReactDOM.render(<App />,document.getElementById('app'))

// const arr = [new Promise(()=>{})]
// console.log('hello webpack');
// new Vue({
// 	el:"#app"
// })
/**
 * sourceMap:源码与bundle代码之间的映射关系
 * 适合开发环境：
 * 		eval
 * 		eval-source-map
 * 		eval-cheap-source-map
 * 		eval-module-cheap-source-map
 * 适合生产环境
 * 		none
 * 		hidden-source-map
 */