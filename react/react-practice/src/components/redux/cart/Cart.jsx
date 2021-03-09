import React, { Component } from 'react';

// 导入store
import store from "./store";

import {Table,Button,InputNumber} from "element-react";

class Cart extends Component {

	constructor(){
		super();

		this.state={
			columns:[
				{type:"index"},
				// prop对应的数组中显示的名字
				{
					label: "名称",
        			prop: "name"
				},
				{
					label: "图片",
					render:function(data){
						return (
							<img src={data.url} style={{width:100,height:100}}/>
						)
					}
				},
				// 修改了数量会造成三个地方,总价,购物车的数量,还有最下面的总价改变
				// 只需要更改仓库中的数据即可,Index,Cart 只需要监听仓库中数据的改变,重新渲染即可
				// 要用箭头函数才不会改变this的指向
				{
					label: "数量",
        			prop: "num",
					render: data => {
						// InputNumber的onChange事件的坑,要设置value值才会生效
						return (
							<InputNumber defaultValue={data.num} value={data.num} onChange={this.changeNumber.bind(this,data)} min={1}></InputNumber>
						)
					}
				},
				{
					label: "单价",
        			prop: "price",
				},
				{
					label: "总价",
					render:function(data){
						return(
							<span>
								{data.num * data.price}
							</span>
						)
					}
				},
				{
					label: "操作",
        			prop: "price",
					render: data=>{
						return (
						  <span>
						   		<Button onClick={()=>{this.deleteGoods(data.id)}} type="danger" size="small">删除</Button>
						  </span>
						)
					  }
				},
			],
			goodList:store.getState(),
			totalPrice:this.calcTotalPrice()
		}
	}

	calcTotalPrice=()=>{
		let totalPrice = 0;
		store.getState().forEach(item=>{
			totalPrice+= item.num * item.price;
		})
		return totalPrice;
	}

	changeNumber=(goods,num)=>{
		// 深拷贝值修改后再传到仓库中
		store.dispatch({
			type:"UPDATE_GOODS",
			id:goods.id,
			value:num
		})
	}

	deleteGoods=(id)=>{
		store.dispatch({
			type:"DELETE_GOODS",
			id:id
		})
	}

	// 当数据发生变化的时候重新去仓库取值
	componentWillMount(){
		store.subscribe(this.watchStore)
	}

	watchStore=()=>{
		this.setState({
			goodList:store.getState(),
			totalPrice:this.calcTotalPrice()
		})
	}

	// 取消对store的监听
	componentWillUnmount(){
		if(store && store.unsubscribe){
			store.unsubscribe(this.watchStore);
		}
	}

	render() {
		return (
			<div>
				<Table
     				 style={{width: '100%'}}
     				 columns={this.state.columns}
     				 data={this.state.goodList}
    			/>
				<p>总价:{this.state.totalPrice}</p>
				<br/>
				<Button style={{margin:5}} type="success">结算</Button>
			</div>
		);
	}
}

export default Cart;