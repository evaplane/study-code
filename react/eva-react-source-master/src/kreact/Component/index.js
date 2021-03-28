export default function Component(props){
	this.props = props
}

// 这里用来区分类组件和函数组件
Component.prototype.isReactComponent = {}
