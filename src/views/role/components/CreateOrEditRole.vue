<template>
  <div class="create-or-edit-role">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel" :disabled="isLoading">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate" :disabled="isLoading">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { queryRoleById, saveOrUpdate } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        code: '',
        name: '',
        description: ''
      },
      isLoading: false
    }
  },
  methods: {
    // 获取用户角色
    async queryRoleById () {
      const { data } = await queryRoleById(this.roleId)
      this.form = data.data
    },
    // 保存角色
    async saveOrUpdate () {
      this.isLoading = true
      const { data } = await saveOrUpdate(this.form)
      console.log(data)
      if (data.code === '000000') {
        this.$emit('success')
        this.$message.success('操作成功！')
      } else {
        this.$message.error(data.mesg)
      }
      this.isLoading = false
    },
    // 取消
    onCancel () {
      this.$emit('cancel')
    }
  },
  created () {
    if (this.isEdit) {
      this.queryRoleById()
    }
  }
})
</script>

<style lang="scss" scoped></style>
