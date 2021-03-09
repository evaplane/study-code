import * as Koa from 'koa'
import {get,post,middleware,querystring} from '../utils/route-decors'
import model from '../model/user'

// const users = [{name:'tom'}]
const api = {
	findByName(name){
		return new Promise((resolve,reject)=>{
			setTimeout(() => {
				if(name==='xia'){
					reject('用户已存在')
				}else{
					resolve
				}
			}, 500);
		})
	}
}

@middleware([
	async function guard(ctx,next){
		if(ctx.header.token){
			await next()
		}else{
			// throw '请登录'
			await next()
		}
	}
])
export default class User{
	@get('/users')
	@querystring({
		age:{type:'int',required:true,max:200,convertType:'int'}
	})
	public async list(ctx:Koa.Context){
		const users = await model.findAll()
		ctx.body = {ok:1,data:users}
	}

	@post('/users',{
		middlewares:[
			async function validation(ctx:Koa.Context,next:()=>Promise<any>){
				// 用户必须输入
				const name = ctx.request.body.name
				if(!name){
					throw '请输入用户名'
				}
				try {
					await api.findByName(name)
					await next()
				} catch (error) {
					throw error
				}
				
			}
		]
	})
	public add(ctx:Koa.Context){
		// users.push(ctx.request.body)
		model.create(ctx.request.body)
		ctx.body = {ok:1}
	}
}