import React, { Component } from 'react';

import {HashRouter as Router,Route,Redirect,Switch} from "react-router-dom";  
import Login from "./Login";
import Layout from "./Layout";
import NotFound from "./404";

class NestedRoutes extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						{/* rediect在已有规则后面 */}
						<Route path="/login" component={Login}/>
						<Route path="/Layout" component={Layout}/>
						<Redirect exact from="/" to="/login"/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default NestedRoutes;