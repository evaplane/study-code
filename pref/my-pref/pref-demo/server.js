// 自己建一个node后台，运行dist
const express = require("express")
const compression = require("compression")
const app = express()
app.use(compression())
app.use(express.static('dist'))

app.listen(3001,()=>{
	console.log(3001);
})