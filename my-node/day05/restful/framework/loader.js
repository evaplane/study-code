const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')


function load(dir,cb){
	const url = path.resolve(__dirname,dir)

	const files = fs.readdirSync(url)
	files.forEach(filename=>{
		// 去掉后缀
		filename = filename.replace('.js','')

		// user
		const file = require(url+'/'+filename)

		cb(filename,file)
	})
}

// model的每一个实例就是一个document，document可以保存到数据库，对数据库进行操作 
const loadModel = config=>app=>{
	mongoose.connect(config.db.url,config.db.options)
	const conn = mongoose.connection;

	conn.on('error',()=>console.log('连接失败'))
	app.$model={}
	// 加载model里面的所有文件。mongoose.model初始化
	load('../model',(filename,{schema})=>{
		console.log('load model',filename,schema);
	
		app.$model[filename] = mongoose.model(filename,schema)
	})
	
}

module.exports = {
	loadModel
}