<template>
  <div class="app-header">
    <el-button
      icon="el-icon-s-fold"
      type="text"
      class="taggle"
      @click="taggle">
    </el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="large" :src="userInfo.portrait"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="postLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userInfo, logout } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      loading: false,
      userInfo: {} // 用户基本信息
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户基本信息
    async getUserInfo () {
      const { data } = await userInfo()
      if (data.success) {
        this.userInfo = data.content
      }
    },

    // 退出登录
    async postLogout () {
      if (this.loading) return
      this.loading = true
      const { data } = await logout()
      if (data.success) {
        // 将本地用户信息置空
        this.$store.commit('setUser', 'null')
        // 成功提示
        this.$message.success('退出成功')
        // 跳转到登录页面
        this.$router.push({
          name: 'login'
        })
      }

      // 重置正在退出状态
      this.loading = false
    },

    // 显示/隐藏侧边栏
    taggle () {
      this.$emit('taggle')
    }
  }
})
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
  .taggle {
    font-size: 20px;
    border: 0;
    box-sizing: border-box;
    padding: 15px;
    margin-right: 10px;
  }
  .el-dropdown {
    margin-left: auto;
  }
}
</style>
