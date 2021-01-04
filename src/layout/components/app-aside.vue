<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    router
    active-text-color="#ffd04b">
    <el-submenu index="1" :route="{ name: 'home' }">
      <template slot="title">
        <i class="el-icon-lock"></i>
        <span>授权管理</span>
      </template>
      <el-menu-item index="/role">
        <i class="el-icon-user"></i>
        <span slot="title">角色列表</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <i class="el-icon-menu"></i>
        <span slot="title">菜单列表</span>
      </el-menu-item>
      <el-menu-item index="/resource">
        <i class="el-icon-s-claim"></i>
        <span slot="title">资源列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-s-management"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item index="/advert">
        <i class="el-icon-data-board"></i>
        <span slot="title">广告列表</span>
      </el-menu-item>
      <el-menu-item index="/advert-space">
        <i class="el-icon-monitor"></i>
        <span slot="title">广告位列表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppAside',
  methods: {
    // handleOpen (key: string, keyPath: string): void {
    //   console.log(key, keyPath)
    // },
    // handleClose (key: string, keyPath: string): void {
    //   console.log(key, keyPath)
    // }
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  min-height: 100vh;
}
</style>
