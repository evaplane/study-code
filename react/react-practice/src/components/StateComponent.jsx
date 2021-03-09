import React from "react";

class StateComponent extends React.Component {
	// 构造器,一个类中有多个构造方法会报错,如果没有显式指定构造方法,会默认添加
	constructor(props) {
		// 继承父组件的this,调用父类的构造方法,React.Component
		// 子类必须在constructor中指定super函数,否则在新建实例的时候会报错
		// 父组件传值,在contructor中通过形参接收
		super();
		console.log(props);

		this.state = {
			name: "eva",
			age: 17
		};
		// 事件更改this的方法2
		this.clickMe2 = this.clickMe2.bind(this, "小龙女", 899);
	}
	clickMe(name, age) {
		this.setState({
			name,
			age
		});
	}
	clickMe2(name, age) {
		this.setState({
			name,
			age
		});
	}
	clickMe3 = (name, age) => {
		this.setState({
			name,
			age
		});
	};
	sendValueToParent = () => {
		this.props.callback({
			name: this.state.name,
			age: this.state.age
		});
	};
	render() {
		return (
			<div>
				<p>
					{/* 我是注释 */}
					我是有状态的组件---{this.state.name}----{this.state.age}
					<br />
					{/* 父组件向子组件中传值,在render内用this.props.xxx接收 */}
					父组件传值---{this.props.name}---{this.props.age}
					<br />
					{/* 事件绑定,方法1*/}
					<button onClick={this.clickMe.bind(this, "段正淳", 9999)}>
						点击
					</button>
					<br />
					<br />
					{/* 事件绑定,方法2 */}
					<button onClick={this.clickMe2}>点击2</button>
					<br />
					<br />
					{/* 事件绑定,方法3,可以传参 */}
					<button
						onClick={() => {
							this.clickMe3("梅超风", 999);
						}}
					>
						点击3
					</button>
					{/* 子组件传值给父组件 */}
					<button
						onClick={() => {
							this.sendValueToParent();
						}}
					>
						给父组件传值了
					</button>
				</p>
			</div>
		);
	}
}
export { StateComponent };
