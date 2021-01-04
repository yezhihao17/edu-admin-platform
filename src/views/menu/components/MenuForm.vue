<template>
  <div class="create-menu">
    <el-card class="box-card">
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" maxlength="140"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="menuForm.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="region">
          <el-select v-model="menuForm.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="menuForm.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="menuForm.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="menuForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" :loading="submiting">提交</el-button>
          <el-button @click="resetForm()" v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { editMenuInfo, updateMenus } from '@/services/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'MenuForm',
  props: {
    // 判断是否是编辑页面
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      baseMenuInfo: {}, // 菜单基本数据（用于重置使用）
      menuForm: {
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: false,
        orderNum: 0
      }, // 提交数据
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }, // 校验规则
      parentMenuList: [], // 父级菜单列表
      submiting: false // 提交中
    }
  },
  methods: {
    // 获取菜单选项列表
    async getEditMenuInfo () {
      const { data } = await editMenuInfo((this.$route.query.id || -1) as number | string)
      if (data.code === '000000') {
        // 判断是否有无基本信息
        if (data.data.menuInfo) {
          this.menuForm = data.data.menuInfo
        }

        // 设置上级菜单列表
        this.parentMenuList = data.data.parentMenuList
      }
    },
    // 提交菜单数据
    async submitForm () {
      this.submiting = true
      try {
        // 1.校验表单
        await (this.$refs.menuForm as Form).validate()
        // 2.发送请求
        const { data } = await updateMenus(this.menuForm)
        // 3.处理结果
        if (data.code !== '000000') {
          // 失败处理
          return this.$message.error(data.mesg)
        }
        // 成功处理
        this.$message.success('提交成功')
        this.$router.back()
      } catch (err) {
        console.log(err)
      }
      this.submiting = false
    },
    // 重置数据
    resetForm () {
      (this.$refs.menuForm as Form).resetFields()
      this.$nextTick(() => {
        this.$message.success('重置成功')
      })
    }
  },
  created () {
    this.getEditMenuInfo()
  }
})
</script>

<style lang="scss" scoped></style>
