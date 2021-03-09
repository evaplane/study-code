const http = require('http')
const session = {}
http.createServer((req,res)=>{
	console.log('cookie',req.headers.cookie);
	// 我需要一个key-value对存sid,session对应的标号
	const sessionKey = 'sid'
	const cookie = req.headers.cookie

	if(cookie && cookie.indexOf(sessionKey)>-1){
		// 已登录状态
		// cookie里面取出sid
		res.end('come back')

		// cookie格式 xxx=123;sid=123r3423;ccd=12344; 需要用正则表达式取出sid的这一段
		const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
		const sid = pattern.exec(cookie)[1]
		console.log('session',sid,session,session[sid]);
	}else{
		// 新用户
		// 新开一个sid账号 1.顺序数字 2.随机数 3.UUID
		const sid = (Math.random() * 9999999).toFixed()
		res.setHeader('Set-Cookie',`${sessionKey}=${sid}`)

		session[sid] = {
			name:'tom'
		}
		res.end('Hello cookie')
	}
	// res.setHeader('Set-Cookie','sid=123;xx=123;yy=123;')
	// res.end('hello cookie')
}).listen(3000,()=>{
	console.log('listen 3000');
})