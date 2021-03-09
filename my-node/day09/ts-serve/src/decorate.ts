function createDecorate(s){
	return (target,property,descriptor)=>{
		console.log(target); // Log{}
		console.log(property); // print
		
		// descriptor是decorate里面属性的描述符,print是一个方法，那old就是一个方法
		const old = descriptor.value
		descriptor.value = msg=>{
			msg = `${s}${s}${msg}${s}${s}`
			return old.apply(null,[msg])
		}
		return descriptor
	}

}


class Log{
	@createDecorate('*')
	print(msg){
		console.log(msg);
	}
}

// 装饰器工厂
// const createDec = s=>(target,property)=>{
// 	const old = target.prototype[property]
// 	target.prototype[property] = msg => {
// 		msg = `${s}${s}${msg}${s}${s}`
// 		old(msg)
// 	}
// }
// const dec = createDec('-')
// dec(Log,'print')

const log = new Log()
log.print('hello')



