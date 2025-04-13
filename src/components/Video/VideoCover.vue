<script lang="ts" setup>
defineProps<{
  video: schema.Video
}>()

const filter = useThemeDarkCoverFilter()
</script>

<template>
  <div class="relative aspect-ratio-16/10 overflow-hidden">
    <img
      class="h-full w-full bg-gray-300 object-cover dark:bg-gray-600"
      :class="{ 'dark:filter dark:brightness-75': filter }"
      :alt="video.item.title.slice(0, 40)"
      :src="`https://patchyvideo.com/images/covers/${video.item.coverImage}`"
    >

    <div
      v-if="video.clearence === 0"
      class="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-60 transition-all hover:bg-opacity-10 hover:opacity-10"
    >
      <div class="i-fluent:eye-off-20-regular text-6xl" />
      <div class="text-2xl">
        {{ '已隐藏' }}
      </div>
    </div>
  </div>
</template>
