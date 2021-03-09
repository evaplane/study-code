import React,{Component} from "react"

export default class Ref extends Component{
	constructor(){
		super();
		this.myRef = React.createRef();
	}
	render(){
		return (<div>
			{/* 获取焦点 */}
			{/* <input type="text" ref="myRef" /> */}
			{/* <input type="text" ref={this.myRef} /> */}

			{/* 文件 */}
			<form action="" onSubmit={this.handleSubmit}>
				<input type="file" ref="myFileRef"/>
				<button type="submit">submit</button>
			</form>
		</div>)
	}

	componentDidMount(){
		// this.refs.myRef.focus();
		// this.myRef.current.focus();
	}

	handleSubmit=e=>{
		e.preventDefault();
		// 获取文件内容
		console.log(this.refs.myFileRef.files[0]);

		// 通过formData的append上传
		// let formData = new formData();
		// formData.append()
		
	}
}