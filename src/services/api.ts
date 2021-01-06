// 用户相关接口
export const user = {
  refreshToken: '/front/user/refresh_token', // 刷新用户 token
  login: '/front/user/login', // 登录
  logout: '/front/user/logout', // 登出
  userInfo: '/front/user/getInfo', // 获取用户数据
  userList: '/boss/user/getUserPages', // 获取所有用户列表
  enableUser: '/boss/user/enableUser', // 启用用户
  forbidUser: '/boss/user/forbidUser' // 禁用用户
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
  allRoles: '/boss/role/all', // 获取全部角色用户列表
  queryUserByUser: '/boss/role/user', // 查询用户角色
  allocateUserRoles: '/boss/role/allocateUserRoles' // 给用户分配角色
}

// 课程相关接口
export const course = {
  courseList: '/boss/course/getQueryCourses', // 获取课程列表信息
  courseDetail: '/boss/course/getCourseById', // 通过 id 获取课程详情
  test: ''
}

// 通用接口
export const common = {
  uploadImage: '/boss/course/upload' // 上传图片
}
