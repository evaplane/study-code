const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const wechat = require('co-wechat')
const app = new Koa()
const axios = require('axios')
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))
const conf = require('./conf')

router.all('/wechat',wechat(conf).middleware(
	async message => {
		console.log('wechat',message);
		return 'hello world'+ message.Content
	}
))

// const tokenCache = {
// 	access_token:'',
// 	updateTime:Date.now(),
// 	expire_in:7200
// }

// // 获取access_token
// router.get('/getTokens',async ctx=>{
// 	const url =` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
// 	const res = await axios.get(url)
// 	Object.assign(tokenCache,res.data,{
// 		updateTime:Date.now()
// 	})
// 	ctx.body = res.data
// })

// // 获取用户列表
// router.get('/getFollwer',async ctx=>{
// 	const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
// 	const res = await axios.get(url)
// 	// 获取用户的openid
// 	ctx.body = 	res.data
// })

const {ServerToken} = require('./mongoose')
const WeChatAPI = require('co-wechat-api')
/**
 * getToken,setToken 默认内存中，指定即指定地址
 * upsert:没有即可以添加
 */
const api = new WeChatAPI(conf.appid,conf.appsecret,
	async function(){
		return await ServerToken.findOne()
	},
	async function(token){
		return await ServerToken.updateOne({},token,{upsert:true})
	})
router.get('/getFollwer',async ctx=>{
	let res  = await api.getFollowers()
	res=await api.batchGetUsers([res.data.openid[0]],'zh_CN')
	ctx.body = res
})
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);