import React, { Component } from 'react';

const login ={
	height:"200px",
	width:"400px",
	margin:"100px auto",
	border:"1px solid rgba(97,97,97,0.3)",
	display:"flex",
	flexDirection:"column",
	alignItems:"center",
	justifyContents:"center"
}
class Login extends Component {
	login=()=>{
		// 编程式导航
		this.props.history.push("/layout");
	}
	render() {
		return (
			<div style={login}>
				用户名: <input type="text"/> <br/>
				密码: <input type="text"/> <br/>
				<button onClick={this.login}>登录</button>
			</div>
		);
	}
}

export default Login;