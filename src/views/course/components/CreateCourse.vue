<template>
  <div class="create-course-form">
    <el-form :model="course" :rules="rules" ref="course" label-width="140px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">基本信息</div>
        <el-form-item label="名称" prop="courseName">
          <el-input v-model="course.courseName" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input v-model="course.brief" maxlength="100"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师名称" prop="name">
          <el-input v-model="course.name" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="teacherDTO.position">
          <el-input v-model="course.teacherDTO.position" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="teacherDTO.description">
          <el-input v-model="course.teacherDTO.description" maxlength="100"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="课程概述" prop="courseDescriptionMarkDown">
          <el-input v-model="course.courseDescriptionMarkDown" maxlength="20"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="课程封面" prop="name">
          <div class="img">
            <el-upload
              :action="uploadUrl"
              :limit="1"
              :on-exceed="overLimit"
              list-type="picture-card"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <el-tag type="info">建议尺寸：230*300px，JPG、PNG格式，图片小于150K</el-tag>
        </el-form-item>
        <el-form-item label="解锁封面" prop="name">
          <div class="img">
            <el-upload
              :action="uploadUrl"
              :limit="1"
              list-type="picture-card"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <el-tag type="info">建议尺寸：230*300px，JPG、PNG格式，图片小于150K</el-tag>
        </el-form-item>
        <el-form-item label="课程排序" prop="sortNum">
          <el-input v-model="course.sortNum"></el-input>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">销售信息</div>
        <el-form-item label="售卖价格" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="销量" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="活动标签" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">秒杀活动</div>
        <el-form-item label="显示秒杀开关" prop="delivery">
          <el-switch v-model="course.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="秒杀开始时间" prop="date2">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀结束时间" prop="date2">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀价" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="秒杀库存" prop="courseName">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
      </el-card>

      <el-card>
        <div slot="header" class="clearfix">课程详情</div>
        <div>这是课程内容</div>
      </el-card>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { common } from '@/services/api'
import { courseDetail } from '@/services/course'

export default Vue.extend({
  name: 'CreateCourseForm',
  data () {
    return {
      uploadUrl: common.uploadImage, // 上传地址
      course: {
        courseName: '', // 课程名称
        brief: '', // 简介
        teacherDTO: {
          teacherName: '', // 讲师名称
          description: '', // 讲师描述
          position: '' // 职位
        }, // 讲师信息
        courseDescriptionMarkDown: '', // 课程概述
        courseListImg: '', // 课程封面图
        courseImgUrl: '', // 解锁封面图
        sortNum: '', // 课程排序
        test: ''
      },
      rules: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created () {
    this.getCourseDetail()
  },
  methods: {
    // 获取课程详情
    async getCourseDetail () {
      const { data } = await courseDetail(this.$route.params.id || '')
      if (data.code === '000000') {
        this.course = data.data
      }
    },
    submitForm () {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm () {
      // this.$refs[formName].resetFields();
    },
    // 移除图片成功
    handleRemove (file: any, fileList: any) {
      console.log(file, fileList)
    },
    // 上传图片成功
    handleUploadSuccess (file: any) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 超出限制数量
    overLimit () {
      this.$message.error('只能上传一张封面图')
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
