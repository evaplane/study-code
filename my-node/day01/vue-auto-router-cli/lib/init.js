const {promisify} = require('util')

const figlet = promisify(require("figlet"))

const clear = require('clear')

const chalk = require('chalk')
const log = content=>console.log(chalk.green(content));
const {clone} = require('./download')

const spawn = async(...args)=>{
	const {spawn} = require('child_process')
	const options = args[args.length - 1]
    if(process.platform === 'win32'){
		// 设置 shell 选项为 true 以隐式地调用 cmd
		console.log(111); 
        options.shell = true
    }else {
        // nothing
    }
	return new Promise(resolve=>{
		const proc = spawn(...args)
		proc.stdout.pipe(process.stdout)
		proc.stderr.pipe(process.stderr)
		proc.on('close',()=>{
			resolve()
		})
	})
}

module.exports=async name=>{
	// 打印欢迎界面
	clear()
	const data = await figlet('KKB welcome')
	log(data)

	console.log(`创建项目 ${name}`);
	await clone('github:su37josephxia/vue-template',name)

	log('安装依赖')
	await spawn('npm',['install'],{
		cwd:`./${name}`
	})
	log(chalk.green(`
		👌安装完成：
		To get Start:
		===========================
		cd ${name}
		npm run serve
		=========================== `
	))
	const open = require('open')
    open('http://localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
