const http = require('http')
const fs = require('fs')

http.createServer((req,res)=>{
	const {method,url} = req
	console.log('url',url);
	console.log('method',method);
	console.log('cookie',req.headers.cookie);
	if(method==='GET' && url==='/'){
		fs.readFile('./index.html',(err,data)=>{
			res.setHeader('Content-Type','text/html')
			res.end(data)
		})
	}else if(method==='GET' && url ==='/api/users'){
		res.setHeader('Content-Type','application/json')
		res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
		res.setHeader('Set-Cookie','cookie=123')
		res.setHeader('Access-Control-Allow-Credentials','true')
		res.end(JSON.stringify({
			name:'tom'
		}))
		console.log('api/users response');
	}else if(method==='OPTIONS' && url==='/api/users'){
		res.setHeader('Set-Cookie','cookie=123')
		res.setHeader('Access-Control-Allow-Credentials','true')
		res.writeHead(200,{
			'Access-Control-Allow-Origin':'http://localhost:3000',
			'Access-Control-Allow-Headers':'X-Token,Content-Type',
			'Access-Control-Allow-Methods':'PUT'
		})
		
		res.end()
	}else if(method==='POST' && url==='/api/save'){
		let reqData=[]
		// 流里面一滴一滴的水
		req.on('data',data=>{
			reqData.push(data)
		})
		// 汇集流
		req.on('end',()=>{
			const data = Buffer.concat(reqData)
			res.end(`formdata,${data.toString()}`)
		})
	}		
}).listen(4000,()=>{
	console.log('api listen 4000');
})