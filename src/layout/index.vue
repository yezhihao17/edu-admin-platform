<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <app-footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader,
    AppFooter
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  .el-header {
    background-color: #fff;
  }

  .el-footer {
    background-color: #fff;
  }
}
</style>
