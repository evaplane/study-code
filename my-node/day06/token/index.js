const Koa = require('koa')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const secret = 'it is a secret'
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()

app.keys = ['some secret']
app.use(static(__dirname+'/'))
app.use(bodyParser())

router.post('/users/login-token',async ctx=>{
	const {body} = ctx.request;
	const userinfo = body.username
	ctx.body = {
		message:'登录成功',
		user:userinfo,
		token:jwt.sign(
			{
			data:userinfo,
			// 设置token过期时间为一小时后
			exp:Math.floor(Date.now()/1000) + 60 *60
			},
			secret
		)
	}
})


// jwtAuth
router.get('/users/getUser-token',
	jwtAuth({
		secret
	}),
	async ctx=>{
		console.log(ctx.state.user);
		ctx.body = {
			msg:'ok',
			userinfo:ctx.state.user.data
		}
	}
)
app.use(router.routes())
app.listen(3000)