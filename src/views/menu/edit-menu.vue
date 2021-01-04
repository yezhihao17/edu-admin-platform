<template>
  <div class="edit-menu">
    <menu-form :isEdit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuForm from './components/MenuForm.vue'

export default Vue.extend({
  name: 'EditMenu',
  components: {
    MenuForm
  }
})
</script>

<style lang="scss" scoped></style>
