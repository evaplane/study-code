// require	

const mongodb = require('./models/db')


// 保证连接了数据库之后才有代码
mongodb.once('connect',async ()=>{
	// 连接fruits表名
	const col = mongodb.col('fruits')

	// 数据全部清空
	await col.deleteMany()

	// new Array().fill()
	/**
	 * 当我们想借助new Array()生成指定数组长度的假数据的时候，可以写new Array(数字)
	 * 打印之后我们发现数据是空的，原因在于虽然定义了数组长度为5的数组，但是没有往里面添加数据
	 * 使用fill这个数组方法，fill会自动根据数组长度替换数组中所有的值为undefined
	 */
	const data = new Array(100).fill().map((v,i)=>{
		return {
			name:'xxx'+i,
			price:i,
			category:Math.random()>0.5?'蔬菜':'水果'
		}
	})

	await col.insertMany(data)
	console.log('插入成功');
})