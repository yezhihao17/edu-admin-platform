<template>
  <div class="create-course-form">
    <el-form :model="course" :rules="rules" ref="course" label-width="140px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">基本信息</div>
        <el-form-item label="名称">
          <el-input v-model="course.courseName" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="course.brief" maxlength="100"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师名称">
          <el-input v-model="course.teacherDTO.teacherName" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="course.teacherDTO.position" maxlength="50"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description" maxlength="100"
  show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input
            style="margin-bottom: 10px"
            v-model="course.previewFirstField"
            type="textarea"
            placeholder="概述1"
          ></el-input>
          <el-input
            v-model="course.previewSecondField"
            type="textarea"
            placeholder="概述2"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程封面">
          <upload-image v-model="course.courseImgUrl"></upload-image>
        </el-form-item>
        <el-form-item label="解锁封面">
          <upload-image v-model="course.courseListImg"></upload-image>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number v-model="course.sortNum" :min="0"></el-input-number>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">销售信息</div>
        <el-form-item label="售卖价格">
          <el-input v-model="course.discounts" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model="course.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="销量" type="number">
          <el-input v-model="course.sales"></el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="course.discountsTag"></el-input>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">秒杀活动</div>
        <el-form-item label="显示秒杀开关" prop="activityCourse">
          <el-switch v-model="course.activityCourse"></el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="秒杀开始时间">
            <el-date-picker
              v-model="course.activityCourseDTO.beginTime"
              type="date"
              placeholder="选择开始日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀结束时间">
            <el-date-picker
              v-model="course.activityCourseDTO.endTime"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价">
            <el-input v-model="course.activityCourseDTO.amount" type="number"></el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input v-model="course.activityCourseDTO.stock" type="number"></el-input>
          </el-form-item>
        </template>
      </el-card>

      <el-card>
        <div slot="header" class="clearfix">课程详情</div>
        <el-form-item>
          <rich-text-editor v-model="course.courseDescriptionMarkDown"></rich-text-editor>
        </el-form-item>

        <el-form-item class="buttons">
          <el-button type="primary" @click="saveOrUpdateCourse" :disabled="isLoading">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { common } from '@/services/api'
import { courseDetail, saveOrUpdateCourse } from '@/services/course'
import { uploadImage } from '@/services/common'
import RichTextEditor from '@/components/RichTextEditor/index.vue'
import UploadImage from './UploadImage.vue'
// import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateCourseForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UploadImage,
    RichTextEditor
  },
  data () {
    return {
      uploadUrl: common.uploadImage, // 上传地址
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '<h1>Hello</h1>',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          id: 0,
          courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      rules: {},
      dialogImageUrl: '',
      dialogVisible: false,
      isLoading: false
    }
  },
  created () {
    if (this.isEdit) {
      this.getCourseDetail()
    }
  },
  methods: {
    // 获取课程详情
    async getCourseDetail () {
      const { data } = await courseDetail(this.$route.params.id || '')
      if (data.code === '000000') {
        this.course = data.data
      }
    },

    // 上传图片
    async uploadImage () {
      const { data } = await uploadImage({})
      console.log(data)
    },

    // 更新或者保存课程
    async saveOrUpdateCourse () {
      this.isLoading = true
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
      this.isLoading = false
    },

    resetForm () {
      // (this.$refs.course as Form).resetFields()
      console.log('重置')
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
.buttons {
  text-align: center;
}
</style>
