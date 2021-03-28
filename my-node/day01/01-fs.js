// toString()把二进制以某种编码形式解码
// buffer处理二进制，开辟了一段内存空间，缓冲区，

// 异步更好的方法 promise风格
(async function(){
	const fs = require('fs')
	const {promisify} = require('util')
	const readFile = promisify(fs.readFile)
	const data = await readFile('./conf.js')
	console.log(data.toString())
})()

// 同步
// const data = fs.readFileSync('./conf.js') // 代码会阻塞在这里，就是他不做完其他的任务无法执行
// console.log(data);

// 以错误为优先的回调
// fs.readFile('./conf.js',(err,data)=>{
// 	if(err)	throw err
// 后执行
// 	console.log(data.toString());
// })

// 先执行
// console.log('read...');