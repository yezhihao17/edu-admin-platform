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

// // 保存或更新资源
// export const saveOrUpdate = () => {
//   return request({
//     method: 'POST',
//     url: resource.saveOrUpdate
//   })
// }

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
