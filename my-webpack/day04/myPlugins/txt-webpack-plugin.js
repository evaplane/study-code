class TxtWebpackPlugin{
	constructor(options){
		// console.log(options);
	}
	apply(compiler){
		compiler.hooks.emit.tapAsync("TxtWebpackPlugin",(complication,cb)=>{
			
			const fileNames = Object.keys(complication.assets).map(key=>{
				return key
			})
			const fileNum = fileNames.length;
			complication.assets['eva.txt']={
				source:()=>{
					return `文件名称:${JSON.stringify(fileNames)},文件个数：${fileNum}`
				},
				size:()=>{
					return 1024
				}
			}
			cb()
		})
	}
}

module.exports = TxtWebpackPlugin