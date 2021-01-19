<template>
  <div class="create-or-edit-resource">
    <el-form ref="form" :model="resourceForm" label-width="80px">
      <el-form-item label="资源名称">
        <el-input v-model="resourceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径">
        <el-input v-model="resourceForm.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类">
      <el-select v-model="resourceForm.categoryId" placeholder="请选择资源分类">
        <el-option
          v-for="category in categorys"
          :key="category.id"
          :label="category.name"
          :value="category.id">
        </el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="resourceForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="isLoading"
          type="primary"
          @click="saveOrUpdate">
          保存
        </el-button>
        <el-button :disabled="isLoading" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceDetail, saveOrUpdate } from '@/services/resource'

export default Vue.extend({
  name: 'CreateOrEditResourceIndex',
  props: {
    categoryId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    categorys: {
      type: Array
    }
  },
  data () {
    return {
      isLoading: false,
      resourceForm: {
        name: '',
        url: '',
        categoryId: 0,
        description: ''
      }
    }
  },
  methods: {
    // 获取资源数据
    async getResource () {
      const { data } = await getResourceDetail(this.categoryId)
      console.log(data)
      if (data.code === '000000') {
        this.resourceForm = data.data
      }
    },

    // 保存或者更新资源数据
    async saveOrUpdate () {
      this.isLoading = true
      const { data } = await saveOrUpdate(this.resourceForm)
      console.log(data)
      if (data.code === '000000') {
        this.$message.success('操作成功')
        this.$emit('success')
      } else {
        this.$message.error(data.mesg)
      }
      this.isLoading = false
    },

    // 获取当前选中的资源类目
    getCategory () {
      const [category]: any[] = this.categorys.filter((c: any) => c.id === this.resourceForm.categoryId)
      if (category) {
        this.resourceForm.categoryId = category.id
      } else {
        this.resourceForm.categoryId = (this.categorys[0] as any).id
      }
    },

    // 取消
    onCancel () {
      this.$emit('cancel')
    }
  },
  created () {
    if (this.isEdit) {
      this.getResource()
    }
    this.getCategory()
  }
})
</script>

<style lang="scss" scoped>
.el-form {
  max-width: 400px;
}
</style>
