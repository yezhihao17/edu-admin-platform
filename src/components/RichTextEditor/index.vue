<template>
  <div class="rich-text-editor">
    <div ref="editor"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImage } from '@/services/common'

export default Vue.extend({
  name: 'RichTextEditor',
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value () {
      (this.editor as any).txt.html(this.value)
    }
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const editor = new E(this.$refs.editor as any)
      this.editor = editor as any
      editor.config.onchange = (text: string) => {
        this.$emit('input', text)
      }
      editor.config.customUploadImg = (resultFiles: any, insertImgFn: any) => {
        resultFiles.forEach((resultFile: any) => {
          this.uploadImage(resultFile, insertImgFn)
        })
      }
      editor.create()
    },

    // 上传图片
    async uploadImage (resultFile: any, insertImgFn: any) {
      const fd = new FormData()
      fd.append('file', resultFile)
      const { data } = await uploadImage(fd)
      if (data.code === '000000') {
        insertImgFn(data.data.name)
      } else {
        this.$message.error('上传失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
