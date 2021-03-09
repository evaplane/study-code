import React, { Component } from "react";

export class LifeCycle extends Component {
	constructor() {
		super();
		this.state = {
			name: "无名氏",
			age: 1
		};
	}
	// 初始化阶段 componentWillMount render componentDidMount 可以看到初次渲染的结果
	// 组件即将挂载
	componentWillMount() {
		console.log("---lifeCycel ComponentWillMount---");
		// 模拟网络请求
		setTimeout(() => {
			this.setState({
				name: "张三丰",
				age: 666
			});
		}, 2000);
	}
	// 渲染
	render() {
		console.log("---lifeCycle Render---");

		return (
			<div>
				我是生命周期 <br /> 姓名是---{this.state.name}---,年龄是---
				{this.state.age}---
			</div>
		);
	}
	//组件初次挂载完毕
	componentDidMount() {
		console.log("---lifeCycle ComponentDidMount---");
	}

	// 数据发生改变了,是否真的要更新,如果return true就是要更新,return false就是不更新
	// 数据发生改变了就shouldComponentUpdate  componentWillUpdate render componentDidUpdate
	shouldComponentUpdate() {
		console.log("---lifeCycle shouldComponentUpdate---");
		return true;
	}

	componentWillUpdate() {
		console.log("---lifeCycle componentWillUpdate---");
	}

	componentDidUpdate() {
		console.log("---lifeCycle componentDidUpdate---");
	}

	componentWillReceiveProps = nextProps => {
		console.log("---lifeCycle componentDidUpdate---", nextProps);
	};

	// 卸载阶段
	componentWillUnmount = () => {
		console.log("---lifeCycle componentWillUnmount---");
	};
}

export default LifeCycle;
