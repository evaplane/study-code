// 测试高并发 autocannon
(async ()=>{
	const autocannon = require('autocannon')
	const result = await autocannon({
		url:'http://localhost:3000/buy',
		connections:100,
		pipelining:1,
		duration:1
	})
	console.log('秒杀完成');
})()