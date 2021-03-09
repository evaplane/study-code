function createElement(type,config,...children){
	// type:tagName  config:null || props (key ref self source)
	// 不考虑key 和 ref 
	// source就是路径fileName和lineNumber
	// 不想要source和self
	if(config){
		delete config.__source
		delete config.__self
	}
	// 源码中判断了children的长度，这里只考虑children的长度大于1的情况
	// map方法返回一个数组
	// 源码中这里要把key和ref过滤掉，但是我们今天不考虑这个
	const props = 
	{
	// 如果有默认的就用默认的，下面的config也可以覆盖默认的属性，源码中是for...in遍历的
	...((type && type.defaultProps) || {}),
	...config,
	children:children.map(child=> typeof child =="object" ? child:createTextNode(child))
	}
	return {
		type,
		// 返回的props里面有处理好的children
		props
	}
}		

// 把文本节点变成对象
// !!! 源码中没有这个转换，需要判断是文本节点还是原生节点
function createTextNode(text){
	return {
		type:"TEXT",
		props:{
			children:[],
			nodeValue:text
		}
	}
}

export default{
	createElement
}