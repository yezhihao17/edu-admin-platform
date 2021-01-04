// 用户相关接口
import qs from 'qs'
import request from '@/utils/request'
import { user } from './api'

// 登录
interface User {
  phone: string
  password: string
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: user.login,
    data: qs.stringify(data)
  })
}

// 退出登录
export const logout = () => {
  return request({
    method: 'POST',
    url: user.logout
  })
}

// 获取用户信息
export const userInfo = () => {
  return request({
    method: 'GET',
    url: user.userInfo
  })
}
