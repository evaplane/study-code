const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 加载文件夹里面的文件
// 实际上是一个抽象的函数，具体做什么处理由callback函数决定
function load(dir,cb){
	// 转化为绝对路径
	const url = path.resolve(__dirname,dir)
	const files = fs.readdirSync(url)

	files.forEach(filename=>{
		filename = filename.replace('.js','')
		const file = require(url+'/'+filename)
		cb(filename,file)
	})
}

function initRouter(app){
	const router = new Router()
	load('routes',(filename,routes)=>{
		const prefix = filename === 'index'?'':`/${filename}`
		routes = typeof routes === 'function'?routes(app):routes
		// 对象遍历，依次注册为路由规则
		Object.keys(routes).forEach(key=>{
			// 判断routes是路由还是路由的工厂
			const [method,path] = key.split(' ')
			console.log(`正在映射地址 ${method.toLocaleLowerCase()} ${prefix + path}`);
			// router[method](prefix+path,routes[key])
			// routes/user.js变成了函数，执行函数，参数是app,把ctx赋值给app,然后执行routes[key](app)
			// routes[key]查找user.js中的每一个对象的值
			router[method](prefix+path,async ctx=>{
				app.ctx = ctx
				await routes[key](app)
			})
		})
	})
	return router
}

function initController(app){
	const controllers = {}
	load('controller',(filename,controller)=>{
		controllers[filename] = controller(app)
	})
	return controllers
}

function initService(app){
	const services = {}
	load('service',(filename,service)=>{
		// services.user = service service是service/user.js中module.exports的部分
		services[filename] = service(app)
	})
	return services
}

const Sequelize = require('sequelize')
function initConfig (app){
	load('config',(filename,conf)=>{
		if(conf.db){
			app.$db = new Sequelize(conf.db)
			app.$model = {}
			load('model',(filename,{schema,options})=>{
				app.$model[filename] = app.$db.define(filename,schema,options)
			})
			app.$db.sync()
		}
		if(conf.middleware){
			// 依次加载中间件
			conf.middleware.forEach(mid=>{
				const midPath = path.resolve(__dirname,'middleware',mid)
				app.$app.use(require(midPath))
			})
		}
	})
}

const schedule = require('node-schedule')
function initSchedule(){
	load('schedule',(filename,scheduleConfig)=>{
		schedule.scheduleJob(scheduleConfig.interval,scheduleConfig.handler)
	})
}

module.exports = {initRouter,initController,initService,initConfig,initSchedule	}