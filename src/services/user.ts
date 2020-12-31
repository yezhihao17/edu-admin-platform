// 用户相关接口
import qs from 'qs'
import request from '@/utils/request'
import apiUrl from '@/utils/apiUrl'

// 登录
interface User {
  phone: string
  password: string
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: apiUrl.login,
    data: qs.stringify(data)
  })
}
