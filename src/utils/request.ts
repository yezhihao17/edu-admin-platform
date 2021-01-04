import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { user } from '@/services/api'
import { Message } from 'element-ui'

const request = axios.create({
  // 设置基本信息
})

// 过期后请求封装
function refreshToken () {
  return axios({
    method: 'POST',
    url: user.refreshToken,
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 重新登录
function redirectLogin () {
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置 Authorization
  config.headers.Authorization = store.state.user?.access_token

  return config
}, function (error) {
  // 处理错误
  return Promise.reject(error)
})

let isRequesting = false // 判断是否是在请求中
let requestQueue: Function[] = [] // 等待请求的队列
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功处理
  return response
}, function (error) {
  // 超出 2xx 部分的处理
  if (error.response) {
    // 请求有返回，但是出错了
    // 400、401、403、404、5xx
    const status = error.response.status
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // access_token 无效
      // 判断是否有 user
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 判断是否正在登录
      if (!isRequesting) {
        // 设置正在登录中的状态
        isRequesting = true

        // 有 refresh_token
        // refresh_token 只能使用一次
        return refreshToken().then(res => {
          // 判断是否请求成功
          if (!res.data.success) {
            // 如果请求失败，抛出异常，会自动进入到 catch 中
            throw new Error('刷新失败！')
          }
          // 重新设置 user 数据
          store.commit('setUser', res.data.content)
          // 处理失败时的其他请求
          requestQueue.forEach(cb => cb())
          // 重置被挂起的请求列表
          requestQueue = []
          // 登录成功后重新请求出错接口
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', 'null')
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          // 重置请求中的状态
          isRequesting = false
        })
      }

      // 记录 access_token 失效时，其他没有正常返回的请求，将其挂起等待重新登录成功后继续执行
      return new Promise(resolve => {
        requestQueue.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('请求无权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('请求服务器出错了')
    }
  } else if (error.request) {
    // 请求没有返回，即请求超时
    Message.error('请求超时了，请稍后重试')
  } else {
    // 其他错误处理
    Message.error(`请求出错了，${error.message}`)
  }
  return Promise.reject(error)
})

export default request
