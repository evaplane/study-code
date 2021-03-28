const Controller = require('egg').Controller

class UserController extends Controller{
	async index(){
		// return this.ctx.body = {
		// 	name:'tom'
		// }
		const {ctx} = this
		ctx.body = await ctx.service.user.getAll()
	}
}

module.exports = UserController