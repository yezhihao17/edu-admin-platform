// 角色相关接口
import request from '@/utils/request'
import { role } from './api'

// 全部角色列表
export const allRoles = () => {
  return request({
    method: 'GET',
    url: role.allRoles
  })
}
