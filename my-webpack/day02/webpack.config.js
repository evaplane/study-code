
const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const MiNiCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	entry:{
		index:"./src/index.js"
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname,"./dist"),
		// publicPath:"https://www.baidu.com"
	},
	mode:'development',
	plugins:[
		new htmlwebpackplugin({
			filename:"index.html",
			template:'./src/index.html'
		}),
		new MiNiCssExtractPlugin({
			filename:"[name].css"
		})
	],
	resolveLoader:{
		modules:['node_modules','./myLoaders']
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:["style-loader","css-loader"]
			},
			{
				test:/\.less$/,
				use:[
				// 	{
				// 	loader:MiNiCssExtractPlugin.loader,
				// 	options:{
				// 		// 打包后的css的URL发生了变化
				// 		// publicPath:"../assets"
				// 	}
				// },
				// "postcss-loader"
				"my-style-loader","my-css-loader",,"my-less-loader"],
			},
			{
				test:/\.(png|jpe?g|gif)$/,
				use:{
					loader:"file-loader",
					options:{
						name:"[name]-[hash].[ext]",
						outputPath:'images/'
					}
				}
			},
			// {
			// 	test:/\.js$/,
			// 	use:[{
			// 		// loader:path.resolve(__dirname,"./myLoaders/replace-loader.js"),
			// 		loader:'replace-loader',
			// 		options:{
			// 			name:'你好'
			// 		}
			// 	},
			// 	{
			// 		// loader:path.resolve(__dirname,"./myLoaders/replace-loader-async.js"),
			// 		loader:'replace-loader-async',
			// 		options:{
			// 			name:'eva'
			// 		}
			// 	}]
			// }
		]
	}
}