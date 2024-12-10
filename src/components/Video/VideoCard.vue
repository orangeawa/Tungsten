<script setup lang="ts">
const props = defineProps<{
  video: schema.Video | boolean
}>()

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

function formatTime(time: string) {
  const date = new Date(time)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>

<template>
  <div class="m-2 w-[calc(50%-1rem)] md:w-70">
    <!-- UI Loading -->
    <div v-if="typeof props.video === 'boolean'" class="space-y-1">
      <div class="aspect-ratio-16/10 w-full rounded bg-gray-200" />
      <div class="h-9 w-full rounded bg-gray-200 md:h-12" />
      <div class="h-4 w-full rounded bg-gray-200" />
    </div>
    <!-- UI Display video message -->
    <RouterLink v-else :to="`/video/${props.video.id}`" class="no-underline space-y-1">
      <div class="aspect-ratio-16/10 w-full overflow-hidden rounded">
        <img
          :src="`https://patchyvideo.com/images/covers/${props.video.item.coverImage}`"
          class="h-full w-full object-cover"
        >
      </div>
      <div class="space-y-1">
        <div class="overflow-ellipsis text-gray-600 transition transition-colors hover:text-purple-600" :class="biliVideoPart && biliVideoPartNeeded ? 'h-4.5 md:h-6 line-clamp-1' : 'h-9 md:h-12 line-clamp-2'">
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
          <VideoCardSiteIcon class="m-px h-4 w-4" :url="props.video.item.url" />
          <div>{{ formatTime(props.video.meta.createdAt) }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped></style>
