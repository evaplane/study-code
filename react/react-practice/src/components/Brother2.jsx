import React, { Component } from "react";

// 接收值
import bus from "../common/bus";
export default class Brother2 extends Component {
	// 在componentWillMount生命周期钩子里接收
	componentWillMount() {
		bus.on("myevent", data => {
			console.log(data);
		});
	}
	render() {
		return <div>我是兄弟组件2</div>;
	}
}
