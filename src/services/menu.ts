// 角色相关接口
import request from '@/utils/request'
import { menu } from './api'

// 获取所有菜单列表
export const allMenus = () => {
  return request({
    method: 'GET',
    url: menu.allMenus
  })
}

// 更新或保存菜单数据
export const updateMenus = (data: any) => {
  return request({
    method: 'POST',
    url: menu.saveOrUpdateMenus,
    data
  })
}

// 获取编辑菜单信息
export const editMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: menu.editMenuInfo,
    params: {
      id
    }
  })
}

// 删除菜单
export const deleteMenu = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `${menu.deleteMenu}${id}`
  })
}

// 获取所有菜单并按层级展示
export const menuNodeList = () => {
  return request({
    method: 'GET',
    url: menu.menuNodeList
  })
}
