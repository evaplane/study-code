const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()

// 配置session中间件
// koa2-cors处理跨域
app.use(cors({
	credentials:true
}))
app.keys=['some secret']
// 设置静态目录
app.use(static(__dirname+'/'))
// json解析器
app.use(bodyParser())
app.use(session(app))

app.use((ctx,next)=>{
	// login本来就没有权限
	if(ctx.url.indexOf('login')>-1){
		next()
	}else{
		if(!ctx.session.userinfo){
			ctx.body={
				msg:'login fail'
			}
		}else{
			next()
		}
	}
})

router.post('/users/login',async ctx=>{
	const {body} = ctx.request

	// 数据库匹配
	ctx.session.userinfo = body.username
	ctx.body={
		msg:'login'
	}
})

router.post('/users/logout',async ctx=>{
	delete ctx.session.userinfo
	ctx.body={
		msg:'logout ok'
	}
})

router.get('/users/getUser',async ctx=>{
	ctx.body={
		userinfo:ctx.session.userinfo
	}
})

app.use(router.routes())
app.listen(3000)
