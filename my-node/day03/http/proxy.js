const express = require('express')
const app = express()
// 代理转发
const { createProxyMiddleware } = require('http-proxy-middleware');

// 提供静态服务，3000没有提供正确的服务
app.use(express.static(__dirname+'/'))

app.use('/api',createProxyMiddleware({target:'http://localhost:4000'}))

app.listen(3000)