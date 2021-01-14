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

// 通过角色 id 查下角色
export const queryRoleById = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: `${role.queryRoleById}/${roleId}`
  })
}

// 保存或更新角色
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: role.saveOrUpdate,
    data
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

// 获取角色菜单
export const getRoleMenus = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: role.getRoleMenus,
    params: {
      roleId
    }
  })
}

// 给用户分配菜单
interface AllocateRoleMenusData {
  roleId: number | string
  menuIdList: number[]
}
export const allocateRoleMenus = (data: AllocateRoleMenusData) => {
  return request({
    method: 'POST',
    url: role.allocateRoleMenus,
    data
  })
}
