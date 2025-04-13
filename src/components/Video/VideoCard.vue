<script setup lang="ts">
const props = withDefaults(defineProps<{
  video: schema.Video | boolean
  // Minimum width, note the unit is rem, range 1~100, see in uno.config.ts
  minWidth?: number
}>(), {
  minWidth: 48,
})

const biliVideoPart = computed(() => {
  if (typeof props.video === 'boolean')
    return 0
  const url = new URL(props.video.item.url)
  const searchParams = new URLSearchParams(url.search)
  return Number(searchParams.get('p')) || 0
})

// If part needed to show (when partname is same as title, partname has no meaning, etc.)
const biliVideoPartNeeded = computed(() => {
  if (typeof props.video === 'boolean')
    return 0
  return props.video.item.partName && props.video.item.partName !== props.video.item.title && !props.video.item.partName?.match(/.mp4/)
})
</script>

<template>
  <div :class="props.minWidth && `w-${props.minWidth}`">
    <!-- UI Loading -->
    <div v-if="typeof props.video === 'boolean'" class="space-y-1">
      <div class="aspect-ratio-16/10 w-full rounded bg-gray-200 dark:bg-dark-200" />
      <div class="h-9 w-full rounded bg-gray-200 md:h-12 dark:bg-dark-200" />
      <div class="h-4 w-full rounded bg-gray-200 dark:bg-dark-200" />
    </div>
    <!-- UI Display video message -->
    <RouterLink v-else :to="`/video/${props.video.id}`" class="no-underline space-y-1">
      <VideoCover :video="props.video" class="rounded" />
      <div class="space-y-1">
        <div class="overflow-ellipsis text-gray-600 transition transition-colors dark:text-gray-400 hover:text-purple-600" :class="biliVideoPart && biliVideoPartNeeded ? 'h-4.5 md:h-6 line-clamp-1' : 'h-9 md:h-12 line-clamp-2'">
          {{ props.video.item.title }}
        </div>
        <div
          v-if="biliVideoPart && biliVideoPartNeeded"
          class="overflow-ellipsis line-clamp-1 h-6 text-xs text-gray-500 leading-6"
          :title="props.video.item.partName || props.video.item.title"
        >
          {{ `P${biliVideoPart}: ${props.video.item.partName}` }}
        </div>
        <div class="flex items-center text-xs text-gray-500 space-x-2">
          <VideoSiteIcon class="m-px h-4 w-4" :url="props.video.item.url" />
          <div>{{ formatTime(props.video.meta.createdAt) }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped></style>
