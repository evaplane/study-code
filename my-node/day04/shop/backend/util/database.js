const Sequelize = require('sequelize')
const env = require('dotenv')
const conf = require('./conf')

// 默认读取项目根目录下的env文件
env.config()

/**
 * dialect:要连接的数据库类型
 * host:数据库的主机
 * operatorsAliases：操作符别名
 */
const sequelize = new Sequelize(conf.database,conf.username,conf.password,{
	host:conf.host,
	dialect:'mysql',
	operatorsAliases:false
})

module.exports = sequelize