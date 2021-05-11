const {Service} = require('egg');
const nodemailer = require('nodemailer')

const userEmail = "18676724845@163.com"
const transport = nodemailer.createTestAccount({
	service:"163",
	secureConnection:true,// 安全连接
	auth:{
		user:userEmail,
		pass:"liyue0614@"
	}
})
class ToolService extends Service{
	async sendMail({email,subject,text,html}){
		const mailOptions = {
			from:userEmail,
			cc:userEmail,
			to:email,
			subject,
			text,
			html
		}

		try{
			await transport.sendMail(mailOptions)
			return true
		}catch(error){
			console.log('email error',error);
			return false
		}
	}
}

module.exports = ToolService