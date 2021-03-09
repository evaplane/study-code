// 生产阶段
// 导入 html-webpack-plugin,运行public/index.html并且导入打包好的js文件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const path = require("path");
module.exports = {
	// 这里面配置的都是webpack的核心概念
	mode: "production", // 压缩打包出来的js文件  如果是production就是压缩打包出来的js文件
	entry: "./src/index.js", // 指定webpack打包的入口文件
	// 开发阶段不需要配置出口,开发阶段会借助一个包  webpack-dev-serve 开启一个web服务,localhost:8080
	// 生产阶段要配置output
	output: {
		// 要用绝对路径 __dirname代表当前文件所在目录,就是根目录
		path: path.join(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		rules: [
			{
				// 以.js结尾或者以.jsx结尾都可以
				test: /\.jsx?$/,
				// exclude 排除第三方包的转换
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader"
					// 可以在loader里面写,也可以写.babelrc配置文件中写
					// options: {
					// 	presets: ["@babel/preset-react"]
					// }
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	// 配置文件不用写js和jsx json 更改webpack的配置文件要重新启动
	resolve: {
		extensions: [".jsx", ".js", ".json"]
	},
	// plugins中所有的插件都是通过new
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		})
	]
};
