// 订阅发布器
const {EventEmitter} = require('events')

const event = new EventEmitter()

// db的连接事件是异步过程，不能通过顺序处理描述，只能通过订阅的方式
// 触发的异步过程
event.on('connect',num=>{
	console.log('insert 123',num)
})

event.on('connect1',num=>{
	console.log('insert 456',num)
})

let num = 0
// 相当于连接过程
// 回调里面触发通知
setTimeout(()=>{
	event.emit('connect',num++)
},1000)
setTimeout(()=>{
	event.emit('connect1',num++)
},1000)

// 假设前面有一个异步过程，后面需要串行处理，就是连接之后要怎么样的话，需要通过订阅发布的方式，就是eventEmitter