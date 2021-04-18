// 更新时间
function updateTime(){
	console.log(this.timmer);
	this.timmer = this.timmer || setInterval(()=>this.time = new Date().toUTCString(),5000)
	return this.time
}

// 创建一个web服务，动态生成js函数的内容
// 这里的main.js如果走缓存了，那么updateTime就会有区别
// 如果不走缓存，那么这两个时间多数情况下是相同的，HTML代码刷新。js走缓存，updateTime使用旧的时间，就可以看出来走没走缓存
const http = require('http')
http.createServer((req,res)=>{
	const {url} = req;
	if(url==='/'){
		res.end(`
			<html>
				Html UpdateTime ${updateTime()}
				<script src="main.js"></script>
			</html>
		`)
	}else if(url==='/main.js'){
		const content = `document.writeln("<br/>JS UpdateTime:${updateTime()}")`
		// 强缓存 expires
		// 10s钟后过期
		// res.setHeader('Expires',new Date(Date.now()+10*1000).toUTCString())
		// res.setHeader("Cache-Control","max-age=2")

		// 协商缓存,强制不走强缓存
		res.setHeader("Cache-Control","no-cache")
		// last-modified & if-modified-since
		// res.setHeader("last-modified",new Date().toUTCString())
		// // 下面的判断说明现在的时间还没到上次时间的3s
		// if(new Date(req.headers["if-modified-since"]).getTime()+ 3 * 1000 > Date.now()){
		// 	// 缓存命中
		// 	console.log('缓存命中');
		// 	res.statusCode=304
		// 	res.end()
		// 	return
		// }

		// crypto加密
		const crypto = require('crypto')
		const hash = crypto.createHash('sha1').update(content).digest('hex')
		// console.log(hash);
		res.setHeader("Etag",hash)
		if(req.headers['if-none-match']===hash){
			// 缓存命中
			console.log('缓存命中');
			res.statusCode = 304
			res.end()
			return
		}
		res.statusCode = 200;
		res.end(content);
	}else if(url==='/favicon.ico'){
		res.end("")
	}
}).listen(3000,()=>{
	console.log('http cache test run at 3000');
})