import React, { Component } from 'react';

import {HashRouter as Router,Link,Route,Switch,Redirect} from "react-router-dom"
import "./Index.css";

import 'element-theme-default';
//导入子组件
import GoodsList from "./GoodsList.jsx"
import Cart from "./Cart.jsx"

// 导入store
import store from "./store";

class Index extends Component {
	constructor(){
		super();
		this.state={
			goodslist:store.getState(),
			totalCount:this.calcTotalCount()
		}
	}

	componentWillMount(){
		// 监听store中数值的变化,订阅
		store.subscribe(this.watchStore);

		// 监听浏览器的刷新和关闭
		window.onbeforeunload = function(){
			window.localStorage.setItem("MYCART",JSON.stringify(store.getState()))
		}
	}

	
	componentWillUnmount(){
		// 销毁当前index组件的时候把监听移除
		if(store && store.unsubscribe){
			store.unsubscribe(this.watchStore);
		}
	}

	// 监听store
	watchStore=()=>{
		this.setState({
			// 重新去仓库中获取最新的值
			totalCount:this.calcTotalCount()
		})
	}

	// 获取总数
	calcTotalCount=()=>{
		let goodslist = store.getState();
		
		let totalCount = 0;
		goodslist.forEach(goods=>{
			totalCount+=goods.num;
		})

		return totalCount;
	}

	render() {
		return (
			<Router>
			<div>
				<h2 className="title">
					买买买 -- 商城
					<p>
						<Link to="/goodslist" className="router-link-exact-active router-link-active">
							商品列表
						</Link>
						<Link to="/cart">
							{/* 使用store获取值 */}
		购物车{this.state.totalCount >= 0 && <span>({this.state.totalCount})</span>}
						</Link>
					</p>
				</h2>
				<div className="index-container">
					<Switch>
						<Route path="/goodslist" component={GoodsList}/>
						<Route path="/cart" component={Cart}/>
						<Redirect exact from="/" to="/goodslist" />
					</Switch>
				</div>
			</div>
			</Router>
		);
	}
}

export default Index;