// 课程相关接口
import request from '@/utils/request'
import { course } from './api'

interface CourseData {
  currentPage?: number
  pageSize?: number
  courseName?: string
  status?: number | string
}
// 获取课程列表信息
export const courseList = (data: CourseData) => {
  return request({
    method: 'POST',
    url: course.courseList,
    data
  })
}

// 获取课程详情
export const courseDetail = (id: number | string) => {
  return request({
    method: 'GET',
    url: course.courseDetail,
    params: {
      courseId: id
    }
  })
}

// 更新或者保存课程
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: course.saveOrUpdateCourse,
    data
  })
}
