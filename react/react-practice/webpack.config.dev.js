// 开发阶段
// 导入 html-webpack-plugin,运行public/index.html并且导入打包好的js文件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
module.exports = {
	// 这里面配置的都是webpack的核心概念
	mode: "development", // 不会压缩打包出来的js文件  如果是production就是压缩打包出来的js文件
	entry: "./src/index.js", // 指定webpack打包的入口文件
	// 开发阶段不需要配置出口,开发阶段会借助一个包  webpack-dev-serve 开启一个web服务,localhost:8080
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
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
				  {
					loader: 'url-loader',
					options: {
					// 图片小于8192byte的时候,用base64的形式展示图片
					  limit: 8192
					}
				  }
				]
			},
			{
				test: /\.(ttf|woff)$/i,
				use: [
				  {
					loader: 'url-loader'
				  }
				]
			  }
		]
	},
	// 配置文件不用写js和jsx json 更改webpack的配置文件要重新启动
	resolve: {
		extensions: [".jsx", ".js", ".json"],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		  }
	},
	// plugins中所有的插件都是通过new
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		})
	],
	devServer: {
		// 当页面404的时候会跳转到主目录的index.html,自己设置的index没有用,需要用rewrites来配置
		historyApiFallback:true,
		proxy: {
		  '/': {
			  target:"http://127.0.0.1:3000/", // 发送给真正的服务器
			  secure:false // 设置支持https的代理
		  }
		}
	  }
};
