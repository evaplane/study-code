const { createReadStream, createWriteStream } = require("fs");

// 完成复制过程，read & write
const rs = createReadStream('./1.jpg')
const ws = createWriteStream('./2.jpg')

rs.pipe(ws)