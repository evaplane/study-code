const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

// .hbs handlebars的后缀名
module.exports = async ()=>{
	const list =fs.readdirSync('./src/views')
		.filter(v=>v!=='Home.vue')
		.map(v=>(
			{
				name:v.replace('.vue','').toLowerCase(),
				"file":v
			}
		))
		compile({
			list
		},'./src/router.js','./template/router.js.hbs')
		compile({
			list
		},'./src/App.vue','./template/App.vue.hbs')
	/**
	 * 编译模板文件
	 * @param {*} meta  数据
	 * @param {*} filePath  输出文件
	 * @param {*} templatePath  模板文件
	 */
	function compile(meta,filePath,templatePath){
		// 判断有没有模板文件
		if(fs.existsSync(templatePath)){
			const content = fs.readFileSync(templatePath).toString()

			// 编译 vue3的原理就是把template编译为render函数，这步相当于编译，创建render
			const result = handlebars.compile(content)(meta)
			fs.writeFileSync(filePath,result)
		}
		console.log(chalk.green(`🚀${filePath} 创建成功`))
	}
}