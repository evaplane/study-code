const {Service} = require('egg')
class UserAccessService extends Service {
	async login(payload){
		const {ctx,service} = this
		const user = await service.user.findByMobile(payload.mobile)
		if(!user){
			ctx.throw(404,'user is not found')
		}
		// 验证密码，表单中的密码哈希，然后和数据库的密码进行比对
		let verifyPsy = await ctx.compare(payload.password,user.password)
		if(!verifyPsy){
			ctx.throw(404,'user password is error')
		}

		return {
			token:await service.actionToken.apply(user._id)
		}
	}

	async logout(){

	}

	async current(){
		// 返回现在用户的登录信息
		const {ctx,service} = this
		// jwt会直接解析token
		const _id = ctx.state.user.data._id
		const user = await service.user.find(_id)
		if(!user){
			ctx.throw('404 user is not found')
		}
		user.password = ''
		return user
	}
}

module.exports = UserAccessService