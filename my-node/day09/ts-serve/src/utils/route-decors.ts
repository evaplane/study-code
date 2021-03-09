import * as KoaRouter from 'koa-router'
import * as glob from 'glob'
import * as  Parameter from 'parameter'
const router = new KoaRouter()

// target User property list 和 add
// 个体装饰器先执行，想后执行，异步
export const createMethod = (router:KoaRouter) => (method:'get' | 'post' | 'delete' |'put')=>(
	path:string,options?:{
		middlewares:Array<any>
	}
) => {
	return (target,property)=>{
		process.nextTick(()=>{
			// 使用中间件
			const middlewares = []
			
			if(target.middlewares){
				middlewares.push(...target.middlewares)
			}
			if(options && options.middlewares){
				middlewares.push(...options.middlewares)
			}

			// 添加路由 User.list 和 User.add
			middlewares.push(target[property])		
			router[method](path,...middlewares)
		})
		
	}
}

const method = createMethod(router)
export const get = method('get')
export const post = method('post')
// 类装饰器后执行，想先执行，同步
export const middleware = function(middlewares){
	// 向User的prototype里面添加@middleware里面的function
	return function(target){
		target.prototype.middlewares = middlewares
	}
}

// 写一个专门的函数加载，遍历文件夹下的文件
/**
 * 
 * @param folder 加载的模块
 */
export const loader = (folder:string):KoaRouter=>{
	const extname = '.{js,ts}';
	// 同步扫描 folder文件夹下的无限层级中的所有.js和.ts文件
	glob.sync(require('path').join(folder,`./**/*${extname}`))
	.forEach(item=>require(item))
	return router
}

const validateRule = paramPart => rule => {
	return function(target,name,descriptor){
		// 有效性检查
		const oldValue = descriptor.value
		descriptor.value = function(){
			const ctx = arguments[0]
			const p = new Parameter()
			const data = ctx[paramPart]
			const errors = p.validate(rule,data)
			console.log('error',errors);
			if(errors)throw new Error(JSON.stringify(errors))
			return oldValue.apply(null,arguments)
		}
		return descriptor;
	}
}

export const querystring = validateRule('query')
export const body = validateRule('body')