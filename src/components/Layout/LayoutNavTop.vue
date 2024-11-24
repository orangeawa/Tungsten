<script setup lang="ts">
</script>

<template>
  <div
    class="z-49 fixed flex inset-x-0 md:h-12 px-2 items-center border-b-solid border-gray-200 bg-white justify-between h-10"
  >
    <!-- Logo & Slide Button -->
    <div class="inline-flex items-center flex-nowrap space-x-2">
      <RouterLink to="/" class="text-black hidden md:inline hover:text-inherit">
        <Logo />
      </RouterLink>
    </div>

    <LayoutNavTopSearch class="max-w-2/3" />

    <LayoutNavTopUserHome />
  </div>
  <!-- Placeholder element to leave space below the navigation bar -->
  <div class="h-16" />
</template>

<style scoped>
</style>
