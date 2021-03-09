const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
module.exports = {
	entry:{
		index:"./src/index.js",
		test:"./src/index.js",
	},
	output:{
		filename:"[name]-[hash:6].js",
		path:path.resolve(__dirname,"./dist")
	},
	mode:'development',
	module:{
		rules:[
			{
				test:/\.css$/,
				loader:["style-loader","css-loader"]
			}
		]
	},
	plugins:[
		new htmlwebpackplugin({
			template:"./src/index.html",
			filename:'index.html',
			chunks:['index']
		}),
		new htmlwebpackplugin({
			template:"./src/test.html",
			filename:'test.html',
			chunks:['test']
		})
	]
}