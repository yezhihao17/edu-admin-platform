<template>
  <div class="login">
    <div class="content">
      <h3 class="title">Edu admin platform</h3>

      <el-form
        label-position="top"
        :model="form"
        :rules="rules"
        ref="form"
        label-width="auto"
        class="login-form">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" maxLength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" maxLength="18">
          <el-input type="password" show-password v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="logining"
            @click="onSubmit"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      logining: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    async onSubmit () {
      this.logining = true
      try {
        // 1 校验
        await (this.$refs.form as Form).validate()
        // 2 发送请求
        const { data } = await login(this.form)
        // 3 处理结果
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message.success('登录成功')
          // 设置用户登录信息
          this.$store.commit('setUser', data.content)
          // 成功后跳转到首页
          const path = (this.$route.query.redirect || '/') as string
          this.$router.push(path)
        }
      } catch (err) {
        console.log(err)
      }

      this.logining = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  .content {
    min-width: 600px;
    .title {
      text-align: center;
      font-size: 42px;
      font-weight: 500;
    }
    .login-form {
      width: 300px;
      padding: 30px;
      background-color: #fff;
      border-radius: 6px;
      margin: 0 auto;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
