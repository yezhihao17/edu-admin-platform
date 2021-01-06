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

// 查询用户角色
export const queryRoleByUser = (userId: number) => {
  return request({
    method: 'GET',
    url: `${role.queryUserByUser}/${userId}`
  })
}

// 给用户分配角色
interface AllocateUserRolesData {
  userId: number
  roleIdList: number[]
}
export const allocateUserRoles = (data: AllocateUserRolesData) => {
  return request({
    method: 'POST',
    url: role.allocateUserRoles,
    data
  })
}
