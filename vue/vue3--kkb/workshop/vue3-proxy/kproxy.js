
/**
 * 响应式是必须掌握的api
 */

 let activeEffect;
 // 依赖收集 Dep是vue2.x的，vue3.x用Map 
 class Dep {
	 // 订阅：将注册的函数收集起来 subscribe
	 constructor(){
		this.subs = new Set()
	 }

	 depend(){
		// 收集依赖
		if(activeEffect){
			this.subs.add(activeEffect)
		}

	 }

	 notify(){
		// 数据变化，触发effect执行
		this.subs.forEach(effect=>effect())
	 }
 }

 function effect(fn){
	activeEffect = fn;
	// fn执行一次，就能收集到依赖一次
	fn();
 }

 const dep = new Dep(); // vue3.x里面变成一个大的map



 // 数据  ref大概的原理
 function ref(val){
	let _value = val; 
	// 拦截.value操作
	let state = {
		get value(){
		   // 获取值，收集依赖  track
		   dep.depend();
		   return _value; 
		},
		set value(newCount){
			// 修改值，通知dep,执行有这个依赖的effect函数
		   _value = newCount;
		   // trigger
		   dep.notify();
		}
	}

	return state;
 }

 const state = ref(0);

 // effect副作用，依赖state变化
 // effect的执行传入的参数是一个函数 fn
 effect(()=>{
	 console.log(state.value);
 })


 setInterval(()=>{
	state.value++;
 },1000)

 /**
  * reactive 遍历然后用proxy,proxy拦截所有的属性。ref只拦截.value
  */