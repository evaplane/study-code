// const add = (x,y)=>x+y;
// const square = z => z*z

const { resolve } = require("path");

 
// const compose = (fn1,fn2)=>(...args)=>fn2(fn1(...args))

// const compose = (...[first,...others])=>(...args)=>{
// 	let ret = first(...args)
// 	others.forEach(fn=>{
// 		ret = fn(ret)
// 	})
// 	return ret
// }

// const fn = compose(add,square,square)

// console.log(fn(1,2))

// middlewares是一个函数的数组
function compose(middlewares){
	return function(){
		return dispatch(0)
		// dispatch是一个执行承诺
		// 可以用reduce做，先走一个递归
		function dispatch(i){
			let fn = middlewares[i]
			// async和await是必须返回Promise，所以没有的情况也得返回一个空的Promise
			if(!fn){
				// async必须返回promise
				return Promise.resolve()
			}
			return Promise.resolve(
				fn(function next(){
					// next里面是下一个执行承诺
					return dispatch(i+1)
				})
			)
		}
	}
}

async function fn1(next){
	console.log('fn1');
	await next()
	console.log('end fn1');
}	

async function fn2(next){
	console.log('fn2');
	await delay()
	await next()
	console.log('end fn2');
}	

function fn3(){
	console.log('fn3');
}

function delay(){
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
			resolve()
		}, 2000);
	})
}

const middlewares= [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()