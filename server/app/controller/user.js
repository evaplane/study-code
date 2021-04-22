const BaseController = require('./base')
const md5 = require('md5');
const hashSalt = ":eva-0614"
const jwt = require("jsonwebtoken")
const createRule = {
	email:{type:"email"},
	password:{type:"string"},
	nickname:{type:"string"},
	captcha:{type:"string"},
}
class UserController extends BaseController{
	async login(){
		const {ctx,app} = this;
		const {email,captcha,password} = ctx.request.body;
		if(captcha.toUpperCase()!==ctx.session.captcha.toUpperCase()){
			return this.error('验证码错误')
		}
		console.log(ctx.model.User);
		const user = await ctx.model.User.fineOne({
			email,
			password:md5(password)
		})
		if(!user) return this.error("用户名密码错误")

		// jsonwebtoken
		const token = jwt.sign({
			_id:user._id,
			email,
		},app.config.jwt.secret,{
			// token过期时间
			expiresIn:"1h"
		})
		this.success({token,email,nickname:user.nickname})
	}

	async register(){
		const {ctx} = this;
		try{
			ctx.validate(createRule)
		}catch(e){
			return this.error('参数校验失败',e.errors)
		}

		const {email,password,nickname,captcha} = ctx.request.body;

		this.success({name:'kkb'})
		if(captcha.toUpperCase()!==ctx.session.captcha.toUpperCase()){
			return this.error('验证码错误')
		}
		// 邮箱和id不能重复
		if(await this.checkEmail(email)){
			this.error('邮箱重复了')
		}else{
			const result = await ctx.model.User.create({
				email,
				nickname,
				password:md5(password+hashSalt)
			})
			if(result._id){
				this.message("注册成功")
			}
		}
	}
	async checkEmail(email){
		const user = await this.ctx.model.User.findOne({email})
		return user
	}
	async verify(){
		// 校验用户名是否存在

	}

	async info(){
		
	}
}

module.exports = UserController;