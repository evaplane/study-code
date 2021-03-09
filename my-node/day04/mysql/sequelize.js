(async ()=>{
	const Sequelize = require('sequelize')

	// 建立连接
	const sequelize = new Sequelize('kaikeba','root','123456',{
		host:"localhost",
		dialect:'mysql',
		operatorAliases:false // 仍可通过传入 operators map 至 operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
	})

	// 定义模型
	const Fruit = sequelize.define('Fruit',{
		id:{
			type:Sequelize.DataTypes.UUID,
			defaultValue:Sequelize.DataTypes.UUIDV1,
			primaryKey:true
		},
		name:{
			type:Sequelize.STRING(20),
			allowNull:false,
			// get(){
			// 	const fname = this.getDataValue('name');
			// 	const price = this.getDataValue('price');
			// 	const stock = this.getDataValue('stock');
			// 	return `${fname}(价格：￥${price} 库存：${stock}kg)`
			// }
		},
		price:{
			type:Sequelize.FLOAT,
			allowNull:false,
			validate:{
				isFloat:{msg:'价格字段请输入数字'},
				min:{args:[0],msg:'价格字段必须大于0'}
			}
		},
		stock:{
			type:Sequelize.INTEGER,
			defaultValue:0,
			validate:{
				isNumeric:{msg:'库存字段请输入数字'}
			}
		},
	},{
		timestamps:false,
		// tableName:'TBL_FRUIT',
		getterMethods:{
			amount(){
				return this.getDataValue('stock')+'kg'
			}
		},
		setterMethods:{
			amount(val){
				const idx = val.indexOf('kg')
				const v = val.slice(0,idx)
				this.setDataValue('stock',v)
			}
		}
	})

	// force:true就是模型发生变化要不要强制更新的问题，如果应该开就是有损更新
	let ret = await Fruit.sync()

	// 插入数据
	ret =await Fruit.create({
		name:"香蕉",
		price:3.5
	})
	ret =await Fruit.create({
		name:"苹果",
		price:2.5
	})
	ret =await Fruit.create({
		name:"草莓",
		price:1.5
	})
	await sequelize.sync()

	// 通过模型实例触发setterMethods
	Fruit.findAll().then(fruits=>{
		fruits[0].amount = '200kg'
		fruits[0].save()
		sequelize.sync()	
	})

	const Op = Sequelize.Op
	// 查询数据
	ret = await Fruit.findAll({
		where:{
			price:{
				[Op.lt]:4,
				[Op.gt]:2
			}
		}
	}).then(fruits=>{
		console.log('select',JSON.stringify(fruits));
	})

	// 添加类级别方法
	Fruit.classify = function(name){
		const tropFruits = ['香蕉','芒果','椰子']
		return tropFruits.includes(name)?'热带水果':'其他水果'
	}

	// 添加实例级别方法
	Fruit.prototype.totalPrice = function(count){
		return (this.price * count).toFixed(2)
	}

	const fruitArr = ['香蕉','草莓']
	// 使用类方法
	fruitArr.forEach(f=>console.log(f+'是'+Fruit.classify(f)))

	// 使用实例方法
	Fruit.findAll().then(fruits=>{
		const [f1] = fruits
		console.log(f1,'f1');
		console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`);
	})

	// 数据查询
	// 通过属性查询
	Fruit.findOne({where:{name:'香蕉'}}).then(fruit=>{
		console.log(fruit.get(),'fruit.get');
	})

	Fruit.findOne({attributes:['name']}).then(fruit=>{
		console.log(fruit.get());
	})	

	Fruit.findAndCountAll().then(result=>{
		console.log(result.count);
		console.log(result.rows.length)
	})

	Fruit.findAll({
		where:{
			price:{
				[Op.or]:[{[Op.gt]:3},{[Op.lt]:2}]
			}
		}
	}).then(fruits=>{
		console.log(fruits[0].get());
	})

	// 分页
	Fruit.findAll({
		offset:0,
		limit:2
	})

	// 排序
	Fruit.findAll({
		order:[['price']]
	}).then(fruits=>{
		// console.log('order by price',fruits);
	})

	Fruit.max('price').then(max=>{
		console.log('max',max);
	})

	Fruit.sum('price').then(sum=>{
		console.log('sum',sum);
	})

	Fruit.findByPk('04491af0-6942-11eb-a0fc-23bf8687f261').then(fruit=>{
		fruit.price = 4;
		fruit.save().then(()=>console.log('update'))
	})

	Fruit.update({price:4},{where:{id:'04574bc0-6942-11eb-a0fc-23bf8687f261'}}).then(r=>{
		console.log(r);
		console.log('update!!!');
	})

	Fruit.findOne({where:{id:'04491af0-6942-11eb-a0fc-23bf8687f261'}}).then(r=>r.destroy())

	Fruit.destroy({where:{id:"0481de30-6942-11eb-a0fc-23bf8687f261"}}).then(r=>console.log(r))

})()