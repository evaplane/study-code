import React, { Component } from 'react';
import "./Book.css";

const cssStyle ={
	width:"100px",
	backgroundColor:"yellow"
}

class componentName extends Component {
	constructor(){
		super();
		this.state={
			books:[
				{id:1001,text:"水浒传"},
				{id:2001,text:"红楼梦"},
				{id:3001,text:"西游记"},
				{id:4001,text:"三国演义"}
			],
			bookName:"",
			editId:null
		}
	}
	render() {
		return (
			<div>
				{/* <p style={{width:"100px",backgroundColor:"pink"}}>我是Book</p>
				<p style={cssStyle}>我是Book1</p>
				<p class="test">我是test</p> */}
				<form action="">
					<label>书名:</label>
					<input type="text" value={this.state.bookName} onChange={this.changeBookName} ref="bookSearch" />
					<button type="button" onClick={()=>{this.submit()}}>submit</button>
				</form>
				<br/>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>书名</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{this.state.books.map(item=>{
							return (<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.text}</td>
								<td><span onClick={()=>{this.editBook(item.id)}}>修改</span>&nbsp;<span onClick={()=>{this.deleteBook(item.id)}}>删除</span></td>
							</tr>)
						})}
					</tbody>
				</table>
			</div>
		);
	}
	changeBookName=e=>{
		this.setState({
			bookName:e.target.value
		})
	}

	// 获取id最大值
	_getid(){
		const ids = this.state.books.map(item=>item.id);
		// return Math.max(...ids) + 1;
		return Math.max.apply(null,ids)+1;
	}
	submit=()=>{
		if(this.state.bookName.trim().length==0) return;
		if(this.state.editId){
			const editBook = this.state.books.find(item=>item.id===this.state.editId);
			editBook.text = this.state.bookName;
			this.setState({
				books:this.state.books
			},()=>{
				this.state.editId=null;
				this.setState({
					bookName:""
				})
			})
			
		}else{
			const id =this. _getid();
			const newBooks = [...this.state.books,{id:id,text:this.state.bookName}]
			this.setState({
				books:newBooks
			},()=>{
				this.setState({
					bookName:""
				})
			})
		}
		
		
	}
	deleteBook=(id)=>{
		// 找到id所在的索引
		const idIndex = this.state.books.findIndex(item=>item.id===id);
		this.state.books.splice(idIndex,1);
		// 注意这里要再赋值
		this.setState({
			books:this.state.books
		})
		
	}
	editBook=id=>{
		const currentBook = this.state.books.find(item=>item.id===id);
		this.setState({
			editId:currentBook.id,
			bookName:currentBook.text
		})
	}
}

export default componentName;