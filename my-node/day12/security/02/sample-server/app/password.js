const crypto = require('crypto')
const hash = (type,str) => crypto.createHash(type).update(str).digest('hex')
const md5 = str => hash('md5',str)
const sha1 = str => hash('sha1',str)
const encryptPassword = (salt,password) => md5(salt + 'asdbe!@#@432' + password)
const psw = '111111'
// console.log('md5',md5(psw))
// console.log('sha1',sha1(psw))
// console.log('encryptPssword',encryptPassword(psw))
module.exports = encryptPassword