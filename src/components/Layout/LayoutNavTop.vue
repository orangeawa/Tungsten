<script setup lang="ts">
</script>

<template>
  <div
    class="z-49 fixed flex inset-x-0 h-12 p-1 items-center border-b-solid border-gray-200 bg-white justify-between"
  >
    <!-- Logo & Slide Button -->
    <div class="inline-flex items-center flex-nowrap space-x-2">
      <RouterLink to="/" class="text-inherit hover:text-inherit">
        <Logo />
      </RouterLink>
    </div>

    <LayoutNavTopSearch />

    <LayoutNavTopUserHome />
  </div>
  <!-- Placeholder element to leave space below the navigation bar -->
  <div class="h-16" />
</template>

<style scoped>
</style>
