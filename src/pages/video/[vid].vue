<script setup lang="ts">
const route = useRoute('/video/[vid]')
const userId = route.params.vid as string
</script>

<template>
  <div>
    <h1>User Page</h1>
    <p>User ID: {{ userId }}</p>
  </div>
</template>

<style scoped>
/* 样式代码 */
</style>
