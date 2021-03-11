const loaderUtile = require('loader-utils')
module.exports = function(source){
	// console.log(this.query);
	// const options = loaderUtile.getOptions(this)
	// console.log('options',options);
	const result = source.replace('hello',this.query.name)
	this.callback(null,result)
	// this.callback = this.async()
	// setTimeout(() => {
	// 	const result = source.replace('webpack',this.query.name)
	// 	this.callback(null,result)
	// }, 2000);
}