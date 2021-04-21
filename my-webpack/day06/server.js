const express = require('express');
const app = express()
app.get('/api/info',(req,res)=>{
	res.json({
		name:'eva'
	})
}).listen(3000,()=>{
	console.log('服务器启动');
})