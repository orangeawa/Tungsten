<script setup lang="ts">
const searchContent = ref('')
</script>

<template>
  <div class="h-7 w-full flex items-center justify-start rounded-lg bg-white ring ring-2 ring-purple-300 md:h-9 dark:bg-dark-3 dark:ring-dark dark:focus-within:ring-indigo-600">
    <input
      v-model="searchContent"
      type="text"
      class="h-full flex-1 border-transparent rounded-lg px-2 outline-none dark:bg-dark-3"
      placeholder="搜索你想看的内容"
    >
    <div
      v-show="searchContent"
      class="i-mdi:close-circle-outline mr-2 inline-block flex-shrink-0 text-gray-500"
      @click="searchContent = ''"
    />
    <button
      class="hidden h-full border-transparent rounded-r-lg bg-purple-200 px-3 text-purple-900 md:inline dark:bg-dark-200 dark:text-warmGray-100"
      v-text="'搜索'"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
