const conf = require('./conf')
const {EventEmitter} = require('events')
const { MongoClient } = require('mongodb')

// 1.conf存储
// 2.建立eventEmitter实例
// 3.连接
class Mongodb{
	constructor(conf){
		this.conf = conf
		this.emitter = new EventEmitter()
		// 避免“当前URL字符串解析器已被弃用”警告
		this.client = new MongoClient(conf.url, {
            useNewUrlParser: true
        })
		this.client.connect(err=>{
			if(err) throw err
			console.log('连接成功')
			this.emitter.emit('connect')
		})
	}

	// 返回connect
	// 连接到数据库的某个表，dbName数据库名，colName表名
	col(colName,dbName = conf.dbName){
		return this.client.db(dbName).collection(colName)
	}

	// 提供一个外部接口，用于订阅连接事件
	// event：事件名称 
	once(event,cb){
		this.emitter.once(event,cb)
	}
}

module.exports = new Mongodb(conf)