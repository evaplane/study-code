const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
	secret:'jwt_secret',
	key:'user'
}
const user = {
	username:'abc',
	password:'111111'
}

const token = jsonwebtoken.sign({
	data:user,
	exp:Math.floor(Date.now()/1000)+60*60
},secret)
console.log('生成token',token)

// 验签
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNjEzMzA3NTE0LCJpYXQiOjE2MTMzMDM5MTR9.UHfNt0N6w8Kov4krOCY7CBvNGle7JNn6K76VBbs-Vm1'
// 如果改了token2就验签不通过
console.log('解码：',jsonwebtoken.verify(token,secret,opt));