// 子路由
module.exports={
	// 代表user/
	// 'get /':async ctx=>{
	// 	ctx.body = "用户首页"
	// },
	// // user/info
	// 'get /info':async ctx=>{
	// 	ctx.body = "用户详情"
	// }

	'get /':async app=>{
		const name = await app.$service.user.getName()
		app.ctx.body =  name
	},
	'get /info':app=>{
		app.ctx.body = '用户年龄'+app.$service.user.getAge()
	}
}