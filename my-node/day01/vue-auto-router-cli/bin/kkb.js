#!/usr/bin/env node
console.log('cli ...666')
const program = require('commander')
program.version(require('../package.json').version)

program
	.command('init <name>')
	.description('init project')
	// .action(name=>{
	// 	console.log('init:'+name);
	// })
	.action(require('../lib/init.js'))
program
	.command('refresh')
	.description('refresh routers')
	.action(require('../lib/refresh'))

console.log("process.argv",process.argv);
// 必须加这句话,process是主进程的描述，从主进程的参数获取进行解析然后完成命令行的定制
program.parse(process.argv)