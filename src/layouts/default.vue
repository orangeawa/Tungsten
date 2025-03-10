<!-- https://github.com/JohnCampionJr/vite-plugin-vue-layouts?tab=readme-ov-file#set-static-data-at-the-page -->
<script setup lang="ts">
</script>

<template>
  <div class="dark:bg-dark">
    <LayoutNavTop />
    <RouterView class="mx-auto max-w-500 px-4" />
    <LayoutFooter />
  </div>
</template>

<style scoped>
</style>
