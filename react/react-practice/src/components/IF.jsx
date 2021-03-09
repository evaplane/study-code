import React, { Component } from "react";

// 无状态组件
// 未登录
function Layout() {
	return <div>欢迎登陆</div>;
}

// 已登录
function Login() {
	return (
		<div>
			用户名
			<input type="text" />
		</div>
	);
}

// 条件渲染1:if
export class IF extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			persons: [
				{ id: 1001, name: "大熊", age: 100 },
				{ id: 1002, name: "哆啦A梦", age: 882 },
				{ id: 1003, name: "静香", age: 18 }
			]
		};
	}

	// render() {
	// 	// if方法
	// 	// let component = null;
	// 	// if (this.state.isLogin) {
	// 	// 	component = <Login />;
	// 	// } else {
	// 	// 	component = <Layout />;
	// 	// }
	// 	// return <div>{component}</div>;

	// 	// 三目运算符
	// 	return <div>{this.state.isLogin ? <Login /> : <Layout />}</div>;
	// }

	// 与运算
	// render() {
	// 	return (
	// 		<div>
	// 			{/* 要保证前面的是true才能返回后面的值,如果this.state.isLogin = false !this.state.isLogin = true,就返回Layout */}
	// 			{this.state.isLogin && <Login />}
	// 			{!this.state.isLogin && <Layout />}
	// 		</div>
	// 	);
	// }

	// 列表渲染
	render() {
		return (
			<div>
				{this.state.persons.map(item => {
					return (
						<li key={item.id}>
							{item.name}---{item.age}
						</li>
					);
				})}
			</div>
		);
	}
}

export default IF;
