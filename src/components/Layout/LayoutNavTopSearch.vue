<script setup lang="ts"></script>

<template>
  <div class="flex items-center ring ring-purple-300 bg-white h-9 justify-start rounded-lg w-90 ring-2">
    <input
      type="text"
      class="flex-1 h-full outline-none border-transparent rounded-l-lg px-2"
      placeholder="搜索你想看的内容"
    >
    <button
      class="h-full px-3 text-purple-900 bg-purple-200 rounded-r-lg border-transparent"
      v-text="'搜索'"
    />
  </div>
</template>

<style lang="postcss" scoped></style>
