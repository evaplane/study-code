const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa()
const axios = require('axios')
const querystring = require('querystring')

// 给index.html提供静态服务
app.use(static(__dirname+'/'))

const config={
	client_id:'00f00a9c8cf592cc332e',
	client_secret:'bf45b76256ca5edc450fadcf32e6acff44192496'
}

router.get('/github/login',async ctx=>{
	// 重定向到GitHub服务器
	// 服务器需要知道是谁跳转的，需要把client_id传过去
	let path = `https://github.com/login/oauth/authorize`
	path += `?client_id=${config.client_id}`

	// 跳转GitHub服务器
	ctx.redirect(path)
})

// 第三方认证之后会回调auth/github/callback这个接口，需要实现这个接口
router.get('/auth/github/callback',async ctx=>{
	console.log('callback...');
	const {code} = ctx.query
	console.log('code',code);

	// 认证参数
	const params = {	
		client_id:config.client_id,
		client_secret:config.client_secret,
		code:code
	}
	let ret = await axios.post('https://github.com/login/oauth/access_token',params)
	console.log('access_token',querystring.parse(ret.data));

	const {access_token} = querystring.parse(ret.data)
	console.log('access_token',access_token);
 
	// 通过access_token调用用户的其他接口，取用户信息
	ret = await axios({
		method:'get',
		headers: {
			'Authorization': 'token '+access_token
		},
		url:'https://api.github.com/user'
	})

	ctx.body = `
		<h1>Hello ${ret.data.login}</h1>
		<img src="${ret.data.avatar_url}" alt=""  />
	`
	
	console.log('user',ret.data);
})

app.use(router.routes())
app.listen(7001)
