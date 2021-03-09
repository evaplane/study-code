// 1.引入react
import React from "react";

//2.写组件
function NoStateComponent(props) {
	return (
		<div>
			<p>
				我是无状态组件
				<br />
				父组件向无状态组件传值 ---{props.name}---{props.age}
			</p>
		</div>
	);
}

// 3. 导出
export default NoStateComponent;
