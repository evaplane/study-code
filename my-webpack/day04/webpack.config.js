const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiNiCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
	entry:{
		index:"./src/index.js"
	},
	output:{
		filename:"js/[name]-[hash:6].js",
		path:path.resolve(__dirname,"./dist")
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.less$/,
				use:[MiNiCssExtractPlugin.loader,"css-loader","postcss-loader","less-loader"]
			},
			{
				test:/\.(eto|ttf|woff2|woff|svg)$/,
				use:{
					loader:"file-loader",
					options:{
						publicPath:"../"
					}
				}
			}
		]
	},
	mode:"development",
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			filename:'index.html'
		}),
		new MiNiCssExtractPlugin({
			filename:"css/[name]-[contenthash:6].css"
		}),
		new CleanWebpackPlugin()
	],
	devtool:"eval-cheap-source-map"
}