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

// 获取用户基本信息
export const userInfo = () => {
  return request({
    method: 'GET',
    url: user.userInfo
  })
}

// 获取用户列表信息
interface UserListData {
  currentPage?: number
  pageSize?: number
  phone?: string
  userId?: number | string
  startCreateTime?: string
  endCreateTime?: string
}
export const userList = (data: UserListData) => {
  return request({
    method: 'POST',
    url: user.userList,
    data
  })
}

// 启用用户
export const enableUser = (userId: number) => {
  return request({
    method: 'GET',
    url: user.enableUser,
    params: {
      userId
    }
  })
}

// 禁用用户
interface ForbidUserData {
  userId: number
}
export const forbidUser = (data: ForbidUserData) => {
  return request({
    method: 'POST',
    url: user.forbidUser,
    data
  })
}
