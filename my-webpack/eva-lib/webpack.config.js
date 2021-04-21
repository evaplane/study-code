const path = require("path")
const terserPlugin = require('terser-webpack-plugin')
module.exports={
	entry:{
		"add-number":"./src/index.js",
		"add-number.min":"./src/index.js",
	},
	output:{
		filename:"[name].js",
		library:"addNumber",
		libraryTarget:"umd",
		path:path.resolve(__dirname,'./umd'),
		// libraryExport:"default"
	},
	mode:'none',
	optimization:{
		minimize:true,
		minimizer:[
			new terserPlugin({
				test:/\.min\.js$/
			})
		]	
	}
}