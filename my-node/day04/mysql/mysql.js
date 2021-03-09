
// mysql2.js
(async ()=>{
	const mysql = require('mysql2/promise')
	// 连接配置
	const cfg = {
		host:'localhost',
		user:'root',
		password:"123456",
		database:'kaikeba'
	}
	const connection =await mysql.createConnection(cfg);
	// 建表
	let ret = await connection.execute(`CREATE TABLE IF NOT EXISTS test (
		id INT NOT NULL AUTO_INCREMENT,
		message VARCHAR(45) NULL,
		PRIMARY KEY (id))`
		)
	console.log('create',ret);

	// 所有的参数不允许放在sql语句中，所以要放一个占位符
	const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`

	const SELECT_SQL = `SELECT * FROM test`;
	
	ret = await connection.execute(INSERT_SQL,['abc'])
	console.log('insert',ret);
	const [rows,fields] = await connection.execute(SELECT_SQL)
	console.log('select',rows);
})();