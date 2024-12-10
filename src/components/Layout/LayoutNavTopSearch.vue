<script setup lang="ts"></script>

<template>
  <div class="h-7 w-90 flex items-center justify-start rounded-lg bg-white ring ring-2 ring-purple-300 md:h-9">
    <input
      type="text"
      class="h-full flex-1 border-transparent rounded-lg px-2 outline-none"
      placeholder="搜索你想看的内容"
    >
    <button
      class="hidden h-full border-transparent rounded-r-lg bg-purple-200 px-3 text-purple-900 md:inline"
      v-text="'搜索'"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
