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
