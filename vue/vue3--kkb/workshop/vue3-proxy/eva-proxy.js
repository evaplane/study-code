/**
 * reactive可以是多个，用一个大的map来存储，每一个reactive又可能有多个属性
 * 源码中的reactive支持 Object,Array,Map,Set,WeakMap,WeakSet
 * package---reactivity---src 
 */


 // 所有依赖的集合是一个数组，栈
 const effectStack = [];

 // 存储所有的reactive,所有key对应的依赖
 let targetMap = new WeakMap();
 /**
  * targetMap格式
  * 这里的key对应track里面的参数key
  * 
  * {
	 target:
	 // new Map() depMap
	 {
		// new Set() dep
		// 同时effect是一个函数，里面有一个deps数组也存储push了effect后的dep
		 key:[effect]
	 }
 	}
  */
 

 function track(target,key){
	 // 收集依赖
	const effect = effectStack[effectStack.length-1];
	if(effect){
		// 做初始化
		let depMap = targetMap.get(target);
		if(!depMap){
			depMap = new Map();
			targetMap.set(target,depMap);
		}

		let dep = depMap.get(key);
		if(!dep){
			dep = new Set();
			depMap.set(key,dep)
		}

		// 添加依赖
		dep.add(effect);
		// effect函数也知道依赖谁，双向存储
		effect.deps.push(dep); 
	}
 }

 // computed是一个特殊的effect，要和effect做区别处理
 function trigger(target,key,info){
	// 触发更新
	let depMap = targetMap.get(target);
	if(!depMap){
		return;
	}

	const effects = new Set();
	const computedRunners = new Set();
	if(key){
		let deps = depMap.get(key);
		deps.forEach(effect=>{
			if(effect.computed){
				computedRunners.add(effect);
			}else{
				effects.add(effect);
			}
		})
	}

	effects.forEach(effect=>effect())
	computedRunners.forEach(computed=>computed())
 }

 function effect(fn,options={}){
	// lazy 首次不执行，后续更新才执行
	// computed判断是否是computed函数
	// option = {lazy:false,computed:false}

	// 响应式函数 createReactiveEffect
	let e = createReactiveEffect(fn,options);

	// 如果首次执行
	if(!options.lazy){
		e();
	}
	return e; 
 }

  // proxy的第二个参数,对target做一些拦截操作
const baseHandler = {
	get(target,key){
		// 这地方用Reflect更合理 Reflect.get()
		const res = target[key];
		track(target,key);
		return res;
	},
	set(target,key,val){
		// 这里用Reflect.set()更合理
		const info = {oldVal:target[key],newVal:val};
		target[key] = val;
		// 触发更新
		trigger(target,key,info);
	}
 }

 // 响应式函数
 function createReactiveEffect(fn,options){
	 // effect是一个对象函数
	const effect = function(...args){
		return run(effect,fn,args)
	}

	// 为了后续清理以及缓存
	effect.deps=[];
	effect.computed = options.computed;
	effect.lazy = options.lazy;
	return effect;
 }

 // 辅助函数
 function run(effect,fn,args){
	 // 如果不存在
	if(effectStack.indexOf(effect)===-1){
		try{
			effectStack.push(effect);
			return fn(...args);
		}finally{
			// 如果栈有问题，就删除最后一个push进去的元素
			effectStack.pop();
		}
	}
 }

 function computed(fn){
	// 特殊的effect
	const runner = effect(fn,{lazy:true,computed:true})
	return {
		effect:runner,
		get value(){
			return runner();
		}
	};
 }



 function reactive(target){
	// target变成响应式
	const observerd = new Proxy(target,baseHandler);
	return observerd;
 }

