// 课程相关接口
import request from '@/utils/request'
import { common } from './api'

// 上传图片
export const uploadImage = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: common.uploadImage,
    data,
    onUploadProgress
  })
}
