import React, { Component } from 'react';

import {HashRouter as Router,Route,Link,Redirect,Switch} from "react-router-dom";

import NotFound from "./404.jsx"

class NewsList extends Component {
	render(){
		return <ul>
			<li>破冰行动导演道歉</li>
			<li>罗永浩机场起争执</li>
			<li>华为份额反超苹果</li>
		</ul>
	}
}

class FoodList extends Component {
	render(){
		return <ul>
			<li>周黑鸭</li>
			<li>辣椒炒肉</li>
			<li>鸡蛋</li>
		</ul>
	}
}

export default class Basic extends Component {
	render() {
		return (
			<Router>
				<div>
			<div>
				<Link to="/">新闻列表</Link> &nbsp;
				<Link to="/foodList">食品列表</Link>
			</div>
			<div>
				<Switch>
					<Route path="/newsList" component={NewsList} />
					<Route path="/foodList" component={FoodList} />
					<Redirect exact from="/" to="/newsList"></Redirect>
					<Route  component={NotFound} />
				</Switch>
			</div>
			</div>
			</Router>
		);
	}
}
