const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

// 设置静态资源
app.use(express.static(path.join(__dirname, '../dist')))

// 接口跨域代理
app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))
app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen('3000', () => {
  console.log('服务器启动成功')
})
