Vue3和Vue2性能对比

1.Proxy替代defineProperty
	最大可能性利用浏览器本身的渲染，proxy是拦截，天生自带懒执行，会比defineProperty快
2.vdom重写 
	2.1 静态标记
	2.2 纯静态节点会被标记
	_createVNode第四个参数不传，在vdom的diff的时候，纯静态会直接忽略
	_createVNode第四个参数有如下值，可以确定到底哪些是动态的，vdom在diff的时候，判断是只需要操作text，还是属性props，还是class
	vue2中如果两个dom标签的key相同，在同层级，会对比所有的props，event，children，会不停的递归
	_createVNode的第四个参数是位运算,按位或来授予，按位与来校验
	源码位置
		vue-next --- share --- src --- patchFlags
	动态的节点，会维护在一个数组里（block 内部）
3.diff算法
	vue2的时候是双端比较
	vue3的时候加入了最长递增子序列


编译原理+位运算

vue3结构
	let App = {
		setup(){

		}
	}

	proxy响应式通知到组件，组件内部vdom，diff算出修改
	
	watchEffect(()=>{
		这个函数执行了，意味着数据变了
		要做vdom的diff，做最小化的操作dom，
	})