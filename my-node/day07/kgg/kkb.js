// 内部自动生成router

const {initRouter,initController, initService,initConfig,initSchedule}  = require('./kkb-loader')
const Koa = require('koa')
class kkb{
	constructor(conf){
		this.$app = new Koa(conf)
		initConfig(this)
		this.$ctrl = initController(this)
		this.$router = initRouter(this)
		this.$service = initService(this)
		this.$app.use(this.$router.routes())
		initSchedule()
	}
	start(port){
		this.$app.listen(port,()=>{
			console.log(`服务器启动成功${port}`);
		})
	}
}
module.exports = kkb