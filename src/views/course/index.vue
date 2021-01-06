<template>
  <div class="course">
    <el-form :inline="true" :model="courseCondition" class="demo-form-inline">
      <el-form-item label="课程名">
        <el-input v-model="courseCondition.courseName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="courseCondition.status">
          <el-option label="全部" value=""></el-option>
          <el-option label="上架" :value="1"></el-option>
          <el-option label="下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getCourses">查询</el-button>
      </el-form-item>
      <el-form-item class="btn-add">
        <el-button @click="$router.push({ name: 'create-course' })" type="primary" icon="el-icon-plus">添加课程</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <el-table
        :data="courses"
        style="width: 100%">
        <el-table-column
          label="ID"
          prop="id"
          width="80">
        </el-table-column>
        <el-table-column
          label="课程名称"
          prop="courseName">
        </el-table-column>
        <el-table-column
          label="价格"
          align="center"
          prop="price">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column
          label="排序"
          align="center"
          prop="sortNum">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          prop="status">
          <template slot-scope="scope">
            <i class="status-badge" :class="{
              'success': scope.row.status === 1,
              'error': scope.row.status === 0
              }"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status"
              @click="handleSellStatus(scope.row)">下架</el-button>
            <el-button
              size="mini"
              type="success"
              v-else
              @click="handleSellStatus(scope.row)">上架</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { courseList } from '@/services/course'

export default Vue.extend({
  name: 'CourseIndex',
  data () {
    return {
      courseCondition: {
        courseName: '',
        status: ''
      },
      courses: [], // 课程列表
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页总数量
      total: 0 // 总数量
    }
  },
  methods: {
    // 获取课程列表
    async getCourses () {
      const { data } = await courseList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        courseName: this.courseCondition.courseName,
        status: this.courseCondition.status
      })
      if (data.code !== '000000') {
        return this.$message.error(data.mesg)
      }
      // 判断是否加载完成
      this.total = data.data.total
      this.courses = data.data.records
    },
    // 改变当前页码
    handleCurrentChange (pageNo: number) {
      this.currentPage = pageNo
      this.getCourses()
    },
    // 上下架操作
    handleSellStatus (course: any) {
      console.log(course)
    },
    // 编辑课程
    handleEdit (course: any) {
      this.$router.push({
        name: 'edit-course',
        params: {
          id: course.id
        }
      })
    },
    // 内容管理
    handleManage (course: any) {
      console.log(course)
    }
  },
  created () {
    this.getCourses()
  }
})
</script>

<style lang="scss" scoped>
.el-form {
  .btn-add {
    float: right;
  }
}
.status-badge {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
.success {
  background-color: $success-color;
}
.error {
  background-color: $danger-color;
}
.pagination-wrapper {
  overflow: hidden;
}
.el-pagination {
  float: right;
  padding: 20px 0;
}
</style>
