// export default function add(a,b){
// 	return a+b;
// }

// export function add(a,b){
// 	return a+b;
// }

// 这种写法是不用设置libraryExports的
module.exports = function(a,b){
	return a+b
}