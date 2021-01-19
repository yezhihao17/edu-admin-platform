// 资源相关接口
import request from '@/utils/request'
import { resource } from './api'

// 获取所有资源
export const getAll = () => {
  return request({
    method: 'GET',
    url: resource.getAll
  })
}

// 查询资源分类列表
export const getAllCategory = (resourceId: string | number) => {
  return request({
    method: 'GET',
    url: resource.getAllCategory,
    params: {
      resourceId
    }
  })
}

// 保存或更新资源
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: resource.saveOrUpdate,
    data
  })
}

// 给角色分配资源
interface AllocateRoleResources {
  roleId: number | string
  resourceIdList: any[]
}
export const allocateRoleResources = (data: AllocateRoleResources) => {
  return request({
    method: 'POST',
    url: resource.allocateRoleResources,
    data
  })
}

// 分页查询资源
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: resource.getResourcePages,
    data
  })
}

// 获取资源详情
export const getResourceDetail = (id: number | string) => {
  return request({
    method: 'GET',
    url: `${resource.resource}/${id}`
  })
}

// 删除资源
export const deleteResource = (id: number | string) => {
  return request({
    method: 'DELETE',
    url: `${resource.resource}/${id}`
  })
}

// 保存或更新分类
export const saveOrderUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: resource.saveOrderUpdate,
    data
  })
}

// 删除分类
export const deleteCategory = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `${resource.category}/${id}`
  })
}
