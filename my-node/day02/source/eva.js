const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')
class EVA{
	constructor(){
		this.middlewares = []
	}
	// use(callback){
	// 	this.callback = callback
	// }

	use(middleware){
		this.middlewares.push(middleware)
	}

	listen(...args){
		const server = http.createServer(async (req,res)=>{
			// this.callback(req,res)
			// 组装一个上下文
			const ctx = this.createContext(req,res)
			// 在listen里面调use的callback
			// this.callback(ctx)

			// 合成函数
			const fn = this.compose(this.middlewares)
			await fn(ctx)
			res.end(ctx.body)
		})
		server.listen(...args)
	}
	// 创建上下文
	createContext(req,res){
		const ctx = Object.create(context)
		ctx.request = Object.create(request)
		ctx.response = Object.create(response)

		// 创建ctx.req 和 ctx.res，使ctx和ctx.request，rex.response产生关系
		ctx.req = ctx.request = req
		ctx.res = ctx.response = res
		return ctx
	}

	// 合成函数
	compose(middlewares){
		return function(ctx){
			return dispatch(0)
			// dispatch是一个执行承诺
			// 可以用reduce做，先走一个递归
			function dispatch(i){
				let fn = middlewares[i]
				// async和await是必须返回Promise，所以没有的情况也得返回一个空的Promise
				if(!fn){
					// async必须返回promise
					return Promise.resolve()
				}
				return Promise.resolve(
					fn(ctx,function next(){
						// next里面是下一个执行承诺
						return dispatch(i+1)
					})
				)
			}
		}
	}
}

module.exports = EVA