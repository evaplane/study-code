const http = require('http')
const fs = require('fs')
// 创建了服务器对象
const server = http.createServer((request,response)=>{
	// console.log('...response',getPrototypeChain(response));
	// response.end('666')

	// 提供基本的页面服务
	const {url,method,headers} = request
	if(url==='/' && method==='GET'){
		// response应答把内容传过去
		fs.readFile('./index.html',(err,data)=>{
			if(err){
				console.log(err);
				response.writeHead(500,{
					'Content-Type':"text/plain;chartset=utf-8"
				})
				response.end('500')
			}
			response.statusCode = 200
			response.setHeader('Content-type','text/html')
			response.end(data)
		})
	}else if(url==='/users'&& method==='GET'){
		response.writeHead(200,{
			'Content-type':'application/json'
		})
		response.end(JSON.stringify({
			name:'tom'
		}))
	}else if(method==='GET' && headers.accept.indexOf('image/*')!==-1){
		// 读图片，覆盖所有的image请求，不能写成某一个文件
		fs.createReadStream('.'+url).pipe(response)
	}
})

server.listen(3000)


function getPrototypeChain(obj){
	const prototypeChain = []

	while(obj = Object.getPrototypeOf(obj)){
		prototypeChain.push(obj)
	}

	return prototypeChain
}