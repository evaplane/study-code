// const http = require('http')

// const server = http.createServer((req,res)=>{
// 	res.writeHead(200)
// 	res.end('eva study')
// })

// server.listen(3000,()=>{
// 	console.log('监听窗口 3000');
// })

const EVA = require('./eva')
const app = new EVA()

// 这里的req和res就是createServer里面的req和res
// app.use((req,res)=>{
// 	res.writeHead(200)
// 	res.end('eva study1')
// })

// app.use(ctx=>{
// 	ctx.body='mamahaha'
// })

app.use(async (ctx,next)=>{
	ctx.body='1'
	await next()
	ctx.body+="5"
})
app.use(async (ctx,next)=>{
	ctx.body+='2'
	await next()
	ctx.body+="4"
})

app.use(async (ctx,next)=>{
	ctx.body+='3'
})

app.listen(3000,()=>{
	console.log('监听窗口 3000');
})

