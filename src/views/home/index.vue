<template>
  <div class="home">
    <!-- <h1>首页</h1> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeIndex',
  created () {
    this.$router.push('/course')
  }
})
</script>

<style lang="scss" scoped></style>
