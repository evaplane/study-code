const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(require('koa-static')(__dirname+'/'))
app.use(bodyParser())

// 初始化数据库
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// 设定模型和模型之间的多对多关系

// user <--> products
// constraints：外键约束
// CASCADE:级联，主键表中的记录被删除，外键表的该行记录也相应删除
Product.belongsTo(User,{
	constraints:true,
	onDelete:'CASCADE'
})

User.hasMany(Product)

User.hasOne(Cart) // 自动生成User.createCart delete update的方法

Cart.belongsTo(User)
// 中间表是多对多关系要反向设置
Cart.belongsToMany(Product,{
	through:CartItem
})

Product.belongsToMany(Cart,{
	through:CartItem
})

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{
	through:OrderItem
})
Product.belongsToMany(Order,{
	through:OrderItem
})

// 建立了User和Cart
sequelize.sync().then(
	async result=>{
		let user = await User.findByPk(1)
		if(!user){
			user = await User.create({
				name:'eva',
				email:'aa@qq.com'
			})
			await user.createCart();
		}
		app.listen(3000,()=>{
			console.log('listen 3000');
		})
	}
)

const router = require('koa-router')()
// 模拟鉴权
// 所有的操作都模拟这个人展开
app.use(async(ctx,next)=>{
	const user = await User.findByPk(1)
	ctx.user = user
	await next()
})

// 查询接口
router.get('/admin/products',async (ctx,next)=>{
	const products = await Product.findAll()
	ctx.body = {
		prods:products
	}
})

// 创建商品，但是你得知道是谁创建的
router.post('/admin/product',async (ctx)=>{
	const body = ctx.request.body
    const res = await ctx.user.createProduct(body)
    ctx.body = { success: true }
})

// 删除商品
router.delete('/admin/product/:id',async ctx=>{
	const id = ctx.params.id;
	const res = await Product.destroy({
		where:{
			id
		}
	})
	ctx.body={
		success:true
	}
})

// 查询购物车
// user查cart，cart查products
router.get('/cart',async ctx=>{
	const cart = await ctx.user.getCart()
	console.log(cart);
	const products = await cart.getProducts()
	ctx.body ={
		products
	}
})

// 添加购物车
router.post('/cart',async ctx=>{
	const body = ctx.request.body;
	console.log('ctx.body',ctx.request.body);
	// 商品id
	const prodId = body.id;
	let fetchedCart;
	let newQty =1
	// 获取购物车
	const cart = await ctx.user.getCart()
	fetchedCart = cart
	// 获取购物车对应的商品
	const products = await cart.getProducts({
		where:{
			id:prodId
		}
	})
	console.log('products',products);
	let product;
	if(products.length>0){
		product = products[0]
	}

	if(product){
		const oldQty = product.cartItem.quantity;
		newQty = oldQty+1;
	}else{
		product = await Product.findByPk(prodId)
	}

	await fetchedCart.addProduct(product,{
		through:{
			quantity:newQty
		}
	})

	ctx.body = {success:true}
	
})

// 外联，两个表
// 查询user的order，并且order属于哪个product，然后根据createdAt排序
// 获取user的orders，包括products,根据创建时间排序
router.get('/orders',async ctx=>{
	const orders = await ctx.user.getOrders({
		include:['products'],
		order:[
			'createdAt'
		]
	})
	ctx.body={orders}
})

// 生成订单
// 获取当前购物车中的所有products
router.post('/orders',async ctx=>{
	let fetchedCart;
	const cart = await ctx.user.getCart()
	fetchedCart = cart;
	const products = await cart.getProducts()
	const order = await ctx.user.createOrder()
	const result = await order.addProducts(
		products.map(p=>{
			p.orderItem={
				quantity:p.cartItem.quantity
			}
			return p
		})
	)
	await fetchedCart.setProducts(null)
	ctx.body={success:true}
})

// 删除对应的cartItem
router.delete('/cartItem/:id',async ctx=>{
	const id = ctx.params.id;
	const cart = await ctx.user.getCart()
	const products = await cart.getProducts({
		where:{id}
	})
	const product = products[0]
	await product.cartItem.destroy()
	ctx.body = {success:true}
})

app.use(router.routes())



