<template>
  <div class="create-or-edit-resource-category">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="form.sort" min="0"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="isLoading"
          @click="saveOrderUpdate">
          保存
        </el-button>
        <el-button :disabled="isLoading" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrderUpdate } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditResourceCategory',
  props: {
    category: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        sort: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    // 更新数据
    async saveOrderUpdate () {
      this.isLoading = true
      try {
        await (this.$refs.ruleForm as Form).validate()
        const { data } = await saveOrderUpdate(this.form)
        if (data.code === '000000') {
          this.$message.success('操作成功')
          this.$emit('success')
        } else {
          this.$message.error(data.mesg)
        }
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false
    },

    // 重置
    resetForm () {
      (this.$refs.ruleForm as Form).resetFields()
    }
  },
  created () {
    if (this.isEdit) {
      this.form = this.category
    }
  }
})
</script>

<style lang="scss" scoped></style>
