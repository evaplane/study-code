// import less from './css/index.less'
// import axios from 'axios'
// axios.get('/api/info').then(res=>{
// 	console.log(res);
// })
// console.log('webpack111');
// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn)
// btn.onclick = function(){
// 	var div = document.createElement('div')
// 	div.innerHTML = 'item'
// 	document.body.appendChild(div)
// }

import counter from "./counter"
import number from "./number"

counter()
number()
if(module.hot){
	module.hot.accept("./number.js",()=>{
		// 通过id找到number
		const div = document.getElementById('number')
		// 移除
		document.body.removeChild(div)
		// 创建
		number()
	})
}