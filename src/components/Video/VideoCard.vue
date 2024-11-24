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
  <div class="w-[calc(50%-1rem)] m-2 md:w-70">
    <!-- UI Loading -->
    <div v-if="typeof props.video === 'boolean'" />
    <!-- UI Display video message -->
    <RouterLink v-else :to="`/video/${props.video.id}`" class="no-underline">
      <div class="w-full aspect-ratio-16/10 rounded overflow-hidden">
        <img
          :src="`https://patchyvideo.com/images/covers/${props.video.item.coverImage}`"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="space-y-1 mt-1">
        <div class="overflow-ellipsis text-gray-600 transition transition-colors hover:text-purple-600" :class="biliVideoPart && biliVideoPartNeeded ? 'h-4.5 md:h-6 line-clamp-1' : 'h-9 md:h-12 line-clamp-2'">
          {{ props.video.item.title }}
        </div>
        <div
          v-if="biliVideoPart && biliVideoPartNeeded"
          class="h-6 leading-6 line-clamp-1 overflow-ellipsis text-xs text-gray-500"
          :title="props.video.item.partName || props.video.item.title"
        >
          {{ `P${biliVideoPart}: ${props.video.item.partName}` }}
        </div>
        <div class="flex items-center space-x-2 text-xs text-gray-500">
          <VideoCardSiteIcon class="m-px w-4 h-4" :url="props.video.item.url" />
          <div>{{ formatTime(props.video.meta.createdAt) }}</div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped></style>
