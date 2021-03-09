// 持久化层都是异步的
// 用promise模拟一个异步的方法，进行io处理
const delay = (data,tick)=> new Promise(resolve=>{
	setTimeout(() => {
		resolve(data)
	}, tick);
})

module.exports = app=>({
	getName(){
		// return delay('jerry',1000)
		return app.$model.user.findAll()
	},
	getAge(){
		return 20
	}
})