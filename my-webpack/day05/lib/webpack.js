const fs = require('fs')
// 解析为AST的模块
const parser = require('@babel/parser')
// 对AST进行增删改查的模块
const traverse = require('@babel/traverse').default;
const path = require('path')
const {transformFromAst}  = require('@babel/core')
module.exports = class Webpack{
	constructor(options){
		this.entry = options.entry
		this.output = options.output
		this.modules = []
	}
	run(){
		const info = this.parse(this.entry)
		this.modules.push(info)
		for(let i = 0;i<this.modules.length;i++){
			const item = this.modules[i]
			const yilai = item.yilai;
			if(yilai){
				for (const j in yilai) {
					this.modules.push(this.parse(yilai[j]))
				}
			}
		}
		// modules转换 arr to obj
		const obj = {}
		this.modules.forEach(item=>{
			obj[item.entryFile] = {
				yilai:item.yilai,
				code:item.code,
			}
		})
		this.file(obj)
	}
	// 解析入口模块路径
	parse(entryFile){
		const content = fs.readFileSync(entryFile,'utf-8')
		// 拿到抽象语法树,解析的结果放在ast.program.body的数组里
		const ast = parser.parse(content,{
			sourceType:'module'
		})
		// 过滤语句，根据node的type类型
		// 得到的路径是相对于入口模块的，不是相对于项目的
		const yilai = {}
		traverse(ast,{
			ImportDeclaration({node}){
				// windows的路径是反斜杠，所以会有问题
				const newPathName = "./" + path.join(path.dirname(entryFile),node.source.value).replace(/\\/g,"/")
				yilai[node.source.value] = newPathName
			}
		})
		// 把ast转换为js代码
		const {code} = transformFromAst(ast,null,{presets:["@babel/preset-env"]})
		return {
			yilai,
			code,
			entryFile
		}
	}
	// bundle文件的生成,接收依赖图谱
	file(obj){
		// 1.生成bundle文件，从output配置字段拿到文件的存储位置和文件的名称
		const bundlePath = path.join(this.output.path,this.output.filename)
		const newObj = JSON.stringify(obj)
		const content =`(function(modules){
			function require(module){
				function newRequire(relativePath){
					return require(modules[module].yilai[relativePath])
				}
				const exports = {};
				(function(exports,require,code){
					eval(code);
				})(exports,newRequire,modules[module].code)

				return exports;
			}
			require("${this.entry}")
		})(${newObj})`;
		fs.writeFileSync(bundlePath,content,'utf-8')
	}
}