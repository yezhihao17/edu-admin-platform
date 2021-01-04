// 用户相关接口
export const user = {
  refreshToken: '/front/user/refresh_token', // 刷新用户 token
  login: '/front/user/login', // 登录
  logout: '/front/user/logout', // 登出
  userInfo: '/front/user/getInfo' // 获取用户数据
}

// 菜单相关接口
export const menu = {
  allMenus: '/boss/menu/getAll', // 获取所有菜单列表
  saveOrUpdateMenus: '/boss/menu/saveOrUpdate', // 更新或者保存菜单数据
  editMenuInfo: '/boss/menu/getEditMenuInfo', // 获取编辑菜单信息
  deleteMenu: '/boss/menu/', // 删除菜单
  menuNodeList: '/boss/menu/getMenuNodeList' // 获取所有菜单并按层级展示
}

// 角色相关接口
export const role = {
  allRoles: '/boss/role/all' // 获取全部角色用户列表
}
