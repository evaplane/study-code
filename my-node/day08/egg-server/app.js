class AppBootHook {
	constructor(app){
		this.app = app
		app.root_path = __dirname
	}
	async didReady(){
		console.log('==========init data==========');
		// 创建匿名上下文
		const ctx = await this.app.createAnonymousContext()

		// qingkong user
		await ctx.model.User.remove()
		// 创建默认数据
		ctx.service.user.create({
			mobile:'13627877878',
			password:'123456',
			realName:'burning'
		})
	}
}

module.exports = AppBootHook