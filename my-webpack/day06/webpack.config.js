const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
module.exports = {
	entry:{
		index:"./src/index.js"
	},
	output:{      
		filename:"[name].js",
		path:path.resolve(__dirname,"./dist")
	},
	mode:"development",
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			filename:'index.html'
		}),
		new MiniCssExtractPlugin({
			filename:"css/[name]-[contenthash:6].css"
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns:["*/"]
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module:{
		rules:[{
			test:/\.css$/,
			use:[
				"style-loader","css-loader"
			]
		},
		{
			test:/\.less$/,
			use:[MiniCssExtractPlugin.loader,'css-loader',"postcss-loader",'less-loader']
		}
	]
	},
	devServer:{
		contentBase:'./dist',
		open:true,
		port:8081,
		hot:true,
		hotOnly:true,// 关闭浏览器的刷新
		proxy:{
			"/api":{
				target:"http://localhost:3000"
			}
		}
	}

}