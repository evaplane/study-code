// import React, { Component } from 'react';

// import Child from "./Child"
// import store from "./store/index"
// class Index extends Component {
// 	componentWillMount(){
// 		// 观察者订阅模式  父组件监听store
// 		store.subscribe(()=>{
// 			this.setState({
// 				num:store.getState()
// 			})
// 		})
// 	}
	
// 	constructor(){
// 		super();
// 		this.state={
// 			num:store.getState()
// 		}
// 	}

// 	render() {
// 		return (
// 			<div>
// 				张乐乐 ---- {store.getState()} <br/><br/>
// 				<Child />
// 			</div>
// 		);
// 	}
// }

// export default Index;