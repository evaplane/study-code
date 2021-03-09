// import React ,{Component} from "react";
// import * as ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";

import "./index.css";


function FunctionComponent(props){
	return <div className="border">FunctionComponent-{props.name}</div>
}

function Node(){
	return <>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</>
}

// 类组件，是自己定义个类继承Component,但是Component本质是一个function
class ClassComponent extends Component{
	static defaultProps = {
		color:"pink"
	}
	render(){
	return (<div className="border">ClassComponent---{this.props.name}
		<p className={this.props.color}> color </p>
	</div>)
	}
}
const jsx = (
	<div className="border" style="backgroundColor:pink;height:200px">
		<h1>开飞机的小历悦</h1>
		<p>第一次学react</p>
		<a href="#">面试好难</a>
		{/* <FunctionComponent name='函数组件'/>
		<ClassComponent name="类组件" />
		<ul>
			<Node />
		</ul> */}
	</div>
)



// 经过babel-loader编译，jsx就是React.createElement(...)函数执行
ReactDOM.render(jsx,document.getElementById('root'))
console.log("version-sy-log", React.version); //sy-log

// 原生标签节点
// 文本节点
// 函数组件节点

// *
// !
// ?
// todo 这里不是要做的事情 只是大家对黄色敏感而已
// todo React.createElement什么时候调用了？
// * 因为react里我写的jsx， jsx经过babel-loader编译，会变成React.createElement(...)函数的执行

// todo 函数组件和类组件区别?
//
