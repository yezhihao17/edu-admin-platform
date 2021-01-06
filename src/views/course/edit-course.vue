<template>
  <div class="edit-course">
    <edit-course />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import editCourse from './components/CreateCourse.vue'

export default Vue.extend({
  name: 'EditCourse',
  components: {
    editCourse
  }
})
</script>

<style lang="scss" scoped></style>
