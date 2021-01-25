<template>
  <div class="upload-image">
    <el-progress
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
      :width="178"
      v-if="isUploading">
    </el-progress>
    <el-upload
      class="avatar-uploader"
      action="/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
      v-else>
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadImage } from '@/services/common'

export default Vue.extend({
  name: 'UploadImage',
  props: {
    value: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    // 上传图片
    async upload (options: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadImage(fd, e => {
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      try {
        if (data.code === '000000') {
          this.$emit('input', data.data.name)
        } else {
          this.$message.error(data.mesg)
        }
      } catch (e) {
        console.log(e)
      }
      this.percentage = 0
      this.isUploading = false
    },

    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt = file.size / 1024 / 1024 < this.size

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt) {
        this.$message.error(`上传头像图片大小不能超过 ${this.size}MB!`)
      }
      return isJPG && isLt
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
