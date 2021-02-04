const express = require('express') // eslint-disable-line
const path = require('path') // eslint-disable-line
const { createProxyMiddleware } = require('http-proxy-middleware') // eslint-disable-line
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

app.listen('3017', () => {
  console.log('服务器启动成功')
})
