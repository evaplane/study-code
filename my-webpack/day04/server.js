const express = require('express')

const app = express()

app.get('/api/info',(req,res)=>{
	res.json({
		name:'eva'
	})
})

app.listen(9092,()=>{
	console.log('server is running');
})