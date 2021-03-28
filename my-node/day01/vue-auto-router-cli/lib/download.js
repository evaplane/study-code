const {promisify} = require('util')

// repo 地址
// desc 描述
module.exports.clone = async function (repo,desc){
	// 下载项目的库
	const download = promisify(require("download-git-repo"))
	// 进度条
	const ora = require('ora')
	const process = ora(`下载... ${repo}`)
	process.start()
	await download(repo,desc)
	process.succeed()
}