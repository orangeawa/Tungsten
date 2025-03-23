<script setup lang="ts">
const route = useRoute('/Playlist/[pid]')
const userId = route.params.pid as string
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
