<template>
  <div class="not-founc">
    <div>
      <h2>404 Not Found.</h2>
      <h3>很抱歉你访问的页面不存在</h3>
      <el-button plain @click="toHome">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NotFound',
  methods: {
    toHome (): void {
      this.$router.push({ name: 'home' })
    }
  }
})
</script>

<style lang="scss" scoped>
.not-founc {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 60px 0;
  box-sizing: border-box;
}
</style>
