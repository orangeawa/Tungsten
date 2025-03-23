<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  name: string
  titleLinksTo: RouteLocationRaw
}>()
</script>

<template>
  <div>
    <RouterLink :to="titleLinksTo" target="_blank">
      <div class="title inline-block text-xl transition transition-colors hover:text-purple-600">
        <span class="title-text w-90vw truncate md:w-auto">{{ name }}</span>
        <div class="title-arrow i-mdi-arrow-up-right hidden h-6 w-6 transform text-purple-600 opacity-25 transition-all duration-200 md:inline-block dark:bg-purple-300" />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="postcss" scoped>
.title {
  .title-text {
    display: inline-block;
    padding-bottom: 1px;
    background-image: linear-gradient(theme('colors.purple.300'), theme('colors.purple.300'));
    background-position: bottom left;
    background-size: 0% 1px;
    background-repeat: no-repeat;
    transition: background-size 140ms, background-position 0s 140ms;
  }
}

.title:hover {
  .title-text {
    background-position: bottom right;
    background-size: 100% 1px;
  }
  .title-arrow {
    /* TODO find a better way to do this */
    --un-translate-x: 0.25rem;
    --un-translate-y: -0.25rem;
    opacity: 40%;
  }
}
</style>
