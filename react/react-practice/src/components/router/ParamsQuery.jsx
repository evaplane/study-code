import React, { Component } from 'react';

import {HashRouter as Router,Route,Link} from "react-router-dom";

class NewsList extends Component {
	render(){
		// return <ul>
		// 	<li><Link to="/newsdetail/1001">破冰行动导演道歉</Link>	</li>
		// 	<li><Link to="/newsdetail/1002"> 罗永浩机场起争执</Link></li>
		// 	<li><Link to="/newsdetail/1003">华为份额反超苹果</Link></li>
		// </ul>
		return <ul>
			<li><Link to="/newsdetail?newsId=1001&name=张三">破冰行动导演道歉</Link>	</li>
			<li><Link to="/newsdetail?newsId=1002&name=李四"> 罗永浩机场起争执</Link></li>
			<li><Link to="/newsdetail?newsId=1003&name=乐乐仔">华为份额反超苹果</Link></li>
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

class NewsDetail extends Component{
	constructor(props){
		super()
		console.log(props);
		const query =  new URLSearchParams(props.location.search);
		this.state={
			newsId:query.get("newsId"),
			name:query.get("name")
		}
		
	}

	render(){
		return <div>
			{/* 我是详情组件 --- {this.props.match.params.newsId} */}
			我是详情组件 --- {this.state.newsId} --- {this.state.name}
		</div>
	}
}

class ParamsQuery extends Component {
	render() {
		return (
			<Router>
			<div>
			<div>
				<Link to="/">新闻列表</Link> &nbsp;
				<Link to="/foodList">食品列表</Link>
			</div>
			<div>
				<Route exact path="/" component={NewsList} />
				<Route path="/foodList" component={FoodList} />
				{/* <Route path="/newsdetail/:newsId" component={NewsDetail} /> */}
				<Route path="/newsdetail" component={NewsDetail} />
			</div>
			</div>
			</Router>
		);
	}
}

export default ParamsQuery;