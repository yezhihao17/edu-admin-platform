<template>
  <div class="create-menu">
    <menu-form></menu-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuForm from './components/MenuForm.vue'

export default Vue.extend({
  name: 'CreateMenu',
  components: {
    MenuForm
  }
})
</script>

<style lang="scss" scoped></style>
