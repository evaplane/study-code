const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length;
console.log('numCPUs',numCPUs);
const process = require('process')
const workers = {}

if(cluster.isMaster){
	// 主进程，用于管理
	for(let i =0;i<numCPUs;i++){
		const worker = cluster.fork()
		// console.log('init...pid',worker.process);
		workers[worker.process.pid]
	}

	// 监督执行状态，如果有退出的
	cluster.on('exit',(worker,code,signal)=>{
		console.log('工作进程关闭',code);
		// 清退
		delete workers[worker.process.pid]

		// 请一个新的worker
		worker = cluster.fork()
		workers[worker.process.pid] = worker
	})

}else{
	// 子进程，用于执行
	// 一旦fork就会走这里
	// 启动真正的服务器资源
	
	const app = require('./app')
	app.listen(3000,()=>{
		console.log('启动了一个子进程');
	})
}


// ctrl + c 
// 希望结束终端操作工作进程和子进程完全退出
process.on('SIGTERM',()=>{
	console.log(111);
	for (const pid in workers) {
		process.kill(pid)
	}
	// 本地进程
	process.exit(0)
})

// 自动运行
require('./test')