const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')

// 1.读取文件index.html
app.get('/',(req,res)=>{
	res.sendFile(path.resolve('./index.html'))
})

// 2.分页操作
app.get('/api/list',async (req,res)=>{
	const {page,category,keyword} = req.query
	const condition = {}
	if(category){
		condition.category = category
	}
	// 模糊查询
	if(keyword){
		condition.name = {
			$regex:new RegExp(keyword)
		}
	}
	const col = mongo.col('fruits')

	const total = await col.find().count()

	// find是全键，skip相当于
	/**
	 * sort:数据排列
	 * limit:限制查询多少条数据
	 * skip:从第几条开始查询数据
	 */
	const fruits = await col
		.find(condition)
		.skip((page - 1) * 5)
		.limit(5)
		.toArray();
		
	res.json({
		ok:1,
		data:{
			fruits,
			pagination:{
				total,
				page
			}
		}
	})
})

app.get('/api/category',async (req,res)=>{
	const col = mongo.col('fruits')

	// distinic：查询某一个字段所有的值
	const data = await col.distinct('category')

	res.json({
		ok:1,
		data
	})
})

app.listen(3000)