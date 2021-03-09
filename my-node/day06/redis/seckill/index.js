const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')

// promise的redis
const wrapper = require('co-redis')
const client = wrapper(redisClient);

client.on('ready',()=>{
	console.log('redis ready...');
})

const router = new Router()

// 创建商品
router.get('/create',async ctx=>{
	// 清空商品
	await client.ltrim('goods',-1,0)

	// 添加30个商品,随机产生
	// Redis Rpush 命令用于将一个或多个值插入到列表的尾部(最右边)
	new Array(30).fill().forEach(async (v,i)=>{
		await client.rpush('goods',i)
		console.log('添加商品',i);
	})

	const num = await client.llen('goods')
	console.log('抢购商品数量',num);

	ctx.body={
		ok:1
	}
})

// 买商品
router.get('/buy',async ctx=>{
	// 产生一个随机的用户id
	const uid = (Math.random() * 9999999).toFixed()
	let pid = await client.lpop('goods')
	if(pid){
		// 写入订单，写入redis
		// 创建订单 hash表,表名，key,value
		await client.hset('orders',pid,uid)
		console.log('订单生成',pid,uid);
	}else{
		console.log('卖光了');
	}
	ctx.body={
		ok:1
	}
})

// 打印订单
// 秒杀结束以后要把他写会传统的数据库中
router.get('/orders',async ctx=>{
	// 用于打印hash表中所有的key
	const keys = await client.hkeys('orders')
	console.log('订单列表');
	console.log('==========');
	const orders = await client.hgetall('orders')
	for( k of keys){
		console.log(`${k} => ${await client.hget('orders',k)}`);
	}
	ctx.body = {
		orders
	}
})

router.get('/order/clear',async ctx=>{
	const keys = await client.hkeys('orders')
	for( k of keys){
		console.log(`删除订单：${await client.hdel('orders',k)}`);
	}
	ctx.body={ok:1}
})



app.use(router.routes())
app.listen(3000,()=>{
	console.log('listening on * 3000');
})