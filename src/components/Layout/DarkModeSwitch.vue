<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    class="mr-12 flex items-center gap-2 border-none bg-white transition-colors dark:bg-dark-600"
    @click="toggleDark()"
  >
    <div
      class="text-xl text-amber dark:text-blue-500"
      :class="isDark ? 'i-mdi-moon-waning-crescent' : 'i-mdi-white-balance-sunny'"
    />
  </button>
</template>
