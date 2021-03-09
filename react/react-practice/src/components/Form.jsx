import React, { Component } from "react";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  changeUsername(e) {
    this.setState({ username: e.target.value });
  }
  changePassword(e) {
    this.setState({ password: e.target.value });
  }
  // 属性名表达式 这里必须用箭头函数,下面可以不用复杂的箭头函数
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        受控组件示例 <br />
        {/* 分开赋值 */}
        {/* 用户名:
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={e => {
						this.changeUsername(e);
					}}
				/>
				密码:
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={e => this.changePassword(e)}
				/>
				<br />
				<button onClick={() => this.login()}>登录</button> */}
        {/* 合起来赋值 */}
        用户名:
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.change}
        />
        密码:
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.change}
        />
        <br />
        <button onClick={() => this.login()}>登录</button>
      </div>
    );
  }
  login() {
    console.log(this.state);
  }
}

export default Form;
