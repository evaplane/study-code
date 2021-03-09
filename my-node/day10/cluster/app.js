const http = require('http')
const server = http.createServer((request,response)=>{

	// 要产生一个随机错误
	Math.random()>0.6?aa():'2'

	response.end('hello')
})

// 如果这个模块还有他的父级模块，就是被其他模块require
if(!module.parent){
	server.listen(3000,()=>{
		console.log('server is running');
	})
}else{
	module.exports = server
}