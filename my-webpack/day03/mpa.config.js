const path = require('path')
const MiNiCssExtractPlugin = require('mini-css-extract-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// glob.sync同步读取指定文件夹下的文件
const glob = require('glob')
const setMAP = ()=>{
	const entry = {}
	const htmlWebpackPlugins = []
	const entryFiles = glob.sync(path.resolve(__dirname,"./src/*/index.js"))
	entryFiles.map((item,index)=>{
		const entryFile = entryFiles[index];
		const match = entryFile.match(/src\/(.*)\/index.js$/)
		const pageName = match[1];
		entry[pageName] = entryFile
		htmlWebpackPlugins.push(new htmlwebpackplugin({
			template:`./src/${pageName}/index.html`,
			filename:`${pageName}.html`,
			chunks:[pageName]
		}))
	})
	return {
		entry,
		htmlWebpackPlugins
	}
}
const {entry,htmlWebpackPlugins} = setMAP()

module.exports = {
	// entry:{
	// 	"index":"./src/index.js",
	// 	"list":"./src/list.js",
	// },
	entry,
	output:{
		// filename:"js/[name]-[hash].js",
		filename:"js/[name].js?[chunkhash:6]",
		path:path.resolve(__dirname,"./mpa")
	},
	mode:"development",
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.less$/,
				use:[MiNiCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
			},
			/**
			 * url-loader和file-loader配置基本一样
			 * 只是url-loader有一个limit配置，小于配置子节就会转成base64,大于就会变成静态文件
			 */
			{
				test:/\.(png|webp|jpe?g|gif)$/,
				use:[{
					loader:'url-loader',
					options:{
						// name:"[name]-[hash].[ext]"
						name:"[name].[ext]",
						outputPath:'images',
						publicPath:'../images',
						limit:22*1024
					}
				},
				// {
				// 	loader: 'image-webpack-loader',
				// },
			  
			]
			},
			{
				test:/\.(woff|woff2|eot)$/,
				use:{
					loader:"file-loader",
					options:{
						publicPath:'../'
					}
				}
			}
		]
	},
	plugins:[
		...htmlWebpackPlugins,
		new MiNiCssExtractPlugin({
			// filename:"css/[name].css"
			filename:"css/[name]-[contenthash:6].css"
		}),
		new CleanWebpackPlugin({
			// cleanOnceBeforeBuildPatterns:["*","!css"]
		})
	]
}