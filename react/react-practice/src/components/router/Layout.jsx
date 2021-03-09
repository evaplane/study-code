import React, { Component } from 'react';

import "./Layout.css";
import {Link,Route} from "react-router-dom"; 

class User extends Component{
	render(){
		return <div>用户列表</div>
	}
}
class Right extends Component{
	render(){
		return <div>权限列表</div>
	}
}

class Layout extends Component {
	render() {
		return (
			<div className="layout">
				<div className="left">
					<Link to="/layout/user">用户列表</Link><br/>
					<Link to="/layout/right">权限列表</Link>
				</div>
				<div className="right">
					<Route path="/layout/user" component={User}/>
					<Route path="/layout/right" component={Right}/>
					<Route path="/layout" exact component={User}/>
				</div>
			</div>
		);
	}
}

export default Layout;