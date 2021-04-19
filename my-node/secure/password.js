const crypto = require('crypto');
// hex是把二进制转换为十六进制的字符串
const hash = (type,str)=>crypto.createHash(type).update(str).digest('hex');
const md5 = str => hash('md5',str);
const sha1 = str => hash('sha1',str)
const encrptPassword = (salt,password)=>md5(salt+'abcd!#$%'+password);
const psw = '123456'
console.log('md5',md5(psw));
console.log('sha1',sha1(psw));
console.log('encrptPassword',encrptPassword(psw));

module.exports = encrptPassword