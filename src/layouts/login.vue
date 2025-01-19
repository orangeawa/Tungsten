<!-- https://github.com/JohnCampionJr/vite-plugin-vue-layouts?tab=readme-ov-file#set-static-data-at-the-page -->
<script setup lang="ts">
</script>

<template>
  <div class="login h-screen w-full bg-cover bg-bottom bg-no-repeat">
    <div class="h-full flex items-center rounded-lg bg-white bg-opacity-30 shadow-2xl shadow-lg">
      <div class="ml-60 w-96 flex flex-col items-center gap-4 border border-purple rounded-lg border-style-solid bg-white bg-opacity-70 p-8 shadow-2xl shadow-lg space-y-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url('@/assets/login.jpg');
}
</style>
