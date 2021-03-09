import React, { Component } from "react";
import bus from "../common/bus";
export default class Brother1 extends Component {
	sendValueToBrother2 = () => {
		console.log("我是兄弟组件1", bus);
		bus.emit("myevent", {
			id: 1001,
			name: "书桓"
		});
	};
	render() {
		return (
			<div>
				我是兄弟组件1
				<button
					onClick={() => {
						this.sendValueToBrother2();
					}}
				>
					传值给兄弟组件2
				</button>
			</div>
		);
	}
}
