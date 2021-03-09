// vnode vvnode 代表虚拟dom
// node代表真实dom
// container代表容器节点
function render(vnode,container){
	// vnode是createElement返回的对象，就是vdom,里面有config，type，props,children 
	// container是容器
	// @todo 1.vnode 变成 node

	// const node = createNode(vnode,container)
	// @todo 2.插入到容器中
	// node会有一个初始值null，如果node = null就代表是fragment
	// node 存在才执行appendChild
	// node && container.appendChild(node)

	// * fiber之后的操作 先赋值wipRoot,再赋值nextUnitOfWork
	wipRoot = {
		stateNode:container,
		props:{
			children:[vnode]
		}
	}

	nextUnitOfWork = wipRoot

}

// 其实是递归的过程
function createNode(vnode,parentNode){
	// type就是节点的类型
	// 1.原生节点，字符串  div p ...
	// 2.文本节点 需要把文本节点的结构通过createTextNode转换的和原生节点格式一样
	const {type,props} = vnode;
	let node = null;
	// todo 根据节点类型，生成dom节点
	if(type == "TEXT"){
		// 文本节点
		node = document.createTextNode("")
	}else if(typeof type =="string"){
		// 原生节点
		node = document.createElement(type)
	}else if(typeof type =="function"){
		// 这里的vnode其实就是函数组件的节点
		// 函数组件的type就是函数返回的结果，类组件就得创建实例
		node = type.prototype.isReactComponent?updateClassComponent(vnode,parentNode):  updateFunctionComponent(vnode,parentNode)
	}

	if(type==undefined){
		// node = document.createDocumentFragment();
		// fragment 找到fragment的父节点，然后遍历fragment的子节点，把fragment跳过去
		// 这里就需要把node赋初始值，null，文档碎片也不用插入，所以appendChild的时候过滤掉
		reconcileChildren(parentNode,props.children)
	}else{
		// 上面的代码只渲染了最外层的节点，子节点需要再遍历渲染
		reconcileChildren(node,props.children)

		// 在这里添加属性，要拿到真实的dom节点之后再添加属性
		updateNode(node,props)
	}
	
	return node;

}

// 协调子节点
function reconcileChildren(workInProgress,children){
	let previousNewFiber = null
	for(let i = 0;i<children.length;i++){
		const child = children[i]
		// * fiber之前
		// child是vnode,转化成node就好了
		// 插入到父dom节点中
		// 这不就和render函数做的事情一样吗
		// render(child,node)
		// * fiber之后

		let newFiber = {
			type:child.type,
			props:child.props,
			key:child.key,
			stateNode:null, // 原生dom
			child:null, // 第一个子节点
			sibling:null, // 下一个兄弟节点
			return:workInProgress // 父节点
		}

		// 如果i = 0 ，给child赋值，其他的时候给sibling赋值
		if(i===0){
			workInProgress.child = newFiber
		}else{
			// 构建sibling
			previousNewFiber.sibling = newFiber 
		}
		previousNewFiber = newFiber;
	}
}

// 更新属性 nextVal是props就是object
function updateNode(node,nextVal){
	// 属性值如果是children就不能放在里面，要过滤掉
	Object.keys(nextVal)
	.filter(k=>k!="children")
	.forEach(key=>{
		if(key=="style"){
			nextVal[key].split(';').forEach(styleKey=>{
				if(styleKey){
					node.style[styleKey.split(':')[0]]=styleKey.split(':')[1]
				}
			})
		}else{
			node[key] = nextVal[key]
		}
	})
}

// 类组件
function updateClassComponent(vnode,parentNode){
	const {type,props} = vnode;
	const instance = new type(props)
	// 这里执行render返回的就是类虚减render函数中return的结果
	const vvnode = instance.render();
	const node = createNode(vvnode,parentNode)
	return node
}

// 函数组件
function updateFunctionComponent(vnode,parentNode){
	// 想拿到函数组件内部返回的内容，直接执行函数组件就可以了，函数组件的type就是函数本身，就不是节点了
	const {type,props} = vnode;

	// 生成的就是函数组件返回的vnode
	const vvnode = type(props)
	// 生成真实的dom节点，不需要插入到父容器
	const node = createNode(vvnode,parentNode)

	return node
}

// 下一个要更新的fiber
let nextUnitOfWork = null;

// work in progress的根节点
let wipRoot = null;

// 处理原生标签节点
function updateHostComponent(workInProgress){
	// step 1:创建stateNode
	if(!workInProgress.stateNode){
		workInProgress.stateNode = createNode(workInProgress)
	}
	// step 2:协调子节点  父节点workInProgress，子节点props.children
	reconcileChildren(workInProgress,workInProgress.props.children)
}

// 处理当前fiber并且返回下一个fiber
function performUnitOfWork(workInProgress){
	// step 1:处理当前fiber
	// 原生节点 div p span 
	updateHostComponent(workInProgress)

	// step 2:返回下一个fiber
	// 如果有第一个第一个子节点，就更新第一个子节点，如果有兄弟节点，就更新兄弟节点，如果有叔叔节点，就更新叔叔节点
	if(workInProgress.child){
		return workInProgress.child
	}

	let next = workInProgress;
	while(next){
		if(next.sibling){
			return next.sibling
		}
		// 父fiber
		next = next.return
	}
}


// 更新fiber队列
function wookLoop(idleDeadline){
	while (nextUnitOfWork && idleDeadline.timeRemaining()>1){
		// 处理当前的fiber并且要返回下一个fiber
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
	}

	if(!nextUnitOfWork && wipRoot){
		// 把vnode插入到node当中，更新到container中去
		commitRoot()
	}

}

// 浏览器空闲时间更新fiber
requestIdleCallback(wookLoop)

// 只提交一次，然后wipRoot就是空了，防止重复提交
function commitRoot(){
	// child是第一个子节点
	commitWorker(wipRoot.child)
	wipRoot = null
}

// 这里有递归，所以只有一个wipRoot但是可以调用很多个commitWorker
function commitWorker(workInProgress){
	// 死循环终止
	if(!workInProgress){
		return
	}
	// step 1:提交自己
	// 找到父节点的真实dom，然后appendChild
	let parentNodeFiber = workInProgress.return;
	let parentNode = parentNodeFiber.stateNode

	if(workInProgress.stateNode){
		parentNode.appendChild(workInProgress.stateNode)
	}

	// step 2:提交child
	commitWorker(workInProgress.child)

	// step 3:提交sibling
	commitWorker(workInProgress.sibling)
}

export default {
	render
}