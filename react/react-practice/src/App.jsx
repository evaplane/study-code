import React from "react";
// 引入子组件
import NoStateComponent from "./components/NoStatusComponent.jsx";
// 引入有状态的组件
import { StateComponent } from "./components/StateComponent.jsx";
// 引入兄弟组件1
import Brother1 from "./components/Brother1.jsx";
// 引入兄弟组件2
import Brother2 from "./components/Brother2.jsx";
// 引入生命周期
import LifeCycle from "./components/LifeCycle.jsx";

// 引入条件渲染IF
import IF from "./components/IF.jsx";

// 受控组件
import Form from "./components/Form.jsx";
// 非受控组件
import Ref from "./components/Ref.jsx";

// 样式组件
import Book from "./components/book/Book.jsx";

// router
import Basic from "./components/router/Basic.jsx"
// 重定向
import Redirect from "./components/router/Redirect.jsx"

// 传参
import ParamsQuery from "./components/router/ParamsQuery.jsx"

// 路由嵌套
import NestedRoutes from "./components/router/NestedRoutes.jsx"

// redux 
import Index from "./components/redux/counter/Index.jsx"

// 购物车组件
import Index1 from "./components/redux/cart/Index.jsx"

// 有网络请求的book案例
import Book1 from "./components/book_networking/Book"

// 组件首字母大写
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "张三",
			isShowLifeCycle: true
		};
	}
	getValue = val => {
		console.log(val);
	};
	componentWillMount = () => {
		// 父组件重新传递props
		setTimeout(() => {
			this.setState({
				name: "李四"
			});
		}, 3000);
	};

	// 生命周期方法
	render() {
		return (
			<div>
				{/* Hello World */}
				{/* <NoStateComponent name="张无忌" age={18} />
				<StateComponent
					name="周芷若"
					age={16}
					callback={this.getValue}
				/>
				<br />
				<br />
				<Brother1 />
				<Brother2 />
				<LifeCycle name={this.state.name} /> */}
				{/* <IF /> */}
				{/* 条件判断 */}
				{/* {this.state.isShowLifeCycle && <LifeCycle />} */}
				{/* <Form /> */}
				{/* <Ref /> */}
				{/* <Book /> */}
				{/* <Basic /> */}
				{/* <Redirect /> */}
				{/* <ParamsQuery /> */}
				{/* <NestedRoutes /> */}
				{/* <Index /> */}
				{/* <Index1 /> */}
				<Book1 />
			</div>
		);
	}
}

export default App;
