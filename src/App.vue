<template>
  <div id="app">
    <!-- 所有路由的出口 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
