const Koa = require('koa')
const app = new Koa()

// 实现了切面
app.use((ctx,next)=>{
	const start = Date.now()
	next()
	const end = Date.now()
	console.log(`请求${ctx.url} 耗时${end-start}`);
})

app.use((ctx,next)=>{
	const expire = Date.now()+100
	while(Date.now()<expire)
	ctx.body={
		name:'tom'
	}
})

app.listen(3000)