<!-- Card which shows cover of playlist and number of video contented, alse as a link -->
<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  titleLinksTo: RouteLocationRaw
  count: number
  cover: string
}>()
</script>

<template>
  <!-- RouterLink has no non-absolute element, using "aspect-ratio-16/10" to fill it -->
  <RouterLink :to="titleLinksTo" class="relative inline-block aspect-ratio-16/10 min-w-48 w-full">
    <!-- Every absolute element use "aspect-ratio-16/10" to fill themselves -->
    <div class="absolute left-0 top-5 aspect-ratio-16/10 w-9/10 rounded bg-gray-300" />
    <div class="absolute right-0 top-0 aspect-ratio-16/10 w-9/10 border-b-4 border-l-4 border-white rounded-md bg-gray-300 object-cover dark:bg-gray-600">
      <img
        class="h-full w-full rounded-md bg-gray-300 object-cover dark:bg-gray-600"
        :src="`https://patchyvideo.com/images/covers/${cover}`"
      >
      <div class="absolute inset-0 grid place-items-center bg-black bg-opacity-50 text-6xl text-white font-bold">
        {{ count }}
      </div>
    </div>
  </RouterLink>
</template>
