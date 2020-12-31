<template>
  <div class="app-footer">
    页脚内容
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppFooter'
})
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: $info-color;
}
</style>
