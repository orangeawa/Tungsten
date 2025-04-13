<script setup lang="ts">
defineProps<{
  item: schema.RawTagHistoryItem
}>()

const addedTagsOpen = ref(false)
const removedTagsOpen = ref(false)
function openTagList(type: 'add' | 'remove') {
  if (type === 'add') {
    removedTagsOpen.value = false
    addedTagsOpen.value = !addedTagsOpen.value
  }
  if (type === 'remove') {
    addedTagsOpen.value = false
    removedTagsOpen.value = !removedTagsOpen.value
  }
}
</script>

<template>
  <div class="flex items-center border-purple-200 pb-4 md:mb-4 space-x-2 md:border-b-1 md:px-5">
    <VideoCover :video="item.video" class="h-full w-1/3 rounded-md md:w-1/8" />

    <div class="w-2/3 flex flex-col md:w-7/8 space-y-1">
      <div class="flex items-center space-x-2">
        <VideoSiteIcon :url="item.video.item.url" class="h-5 w-5 flex-shrink-0" />
        <RouterLink :to="`/video/${item.video.id}`" class="truncate font-bold">
          {{ item.video.item.title }}
        </RouterLink>
      </div>

      <div class="flex flex-wrap items-center text-xs text-gray-300 space-x-2 md:text-sm">
        <div class="flex items-center space-x-1">
          <div>编辑者:</div>
          <Avatar :gravatar="item.user.gravatar" :image="item.user.image" class="hidden h-6 w-6 rounded-full md:inline-block" />
          <RouterLink v-if="item.user.id" :to="`/user/${item.user.id}`" class="md:ml-1">
            {{ item.user.username }}
          </RouterLink>
        </div>
        <div>{{ formatTime(item.time) }}</div>
      </div>

      <div class="flex flex-wrap md:hidden space-x-2">
        <div
          v-if="item.addedTags.length"
          class="flex items-center rounded-md bg-purple-100 px-1 py-0.5 text-xs text-purple-600 space-x-0.5"
          @click="openTagList('add')"
        >
          <div>{{ `添加${item.addedTags.length}个标签` }}</div>
          <div
            class="i-uil:angle-down h-5 w-5 transition-transform" :class="{ 'rotate-180': addedTagsOpen }"
          />
        </div>
        <div
          v-if="item.removedTags.length"
          class="flex items-center rounded-md bg-purple-100 px-1 py-0.5 text-xs text-purple-600 space-x-0.5"
          @click="openTagList('remove')"
        >
          <div>{{ `删除${item.removedTags.length}个标签` }}</div>
          <div
            class="i-uil:angle-down h-5 w-5 transition-transform" :class="{ 'rotate-180': removedTagsOpen }"
          />
        </div>
      </div>

      <div class="relative md:space-y-1">
        <div
          v-if="item.addedTags.length"
          class="absolute top-0 z-51 rounded-md bg-white p-1 text-xs text-gray-300 shadow md:static md:flex md:flex-wrap md:items-center md:bg-opacity-0 md:p-0 md:text-sm md:shadow-none md:space-x-2"
          :class="{ hidden: !addedTagsOpen }"
        >
          <div>添加标签:</div>
          <Tag v-for="addedTag in item.addedTags" :key="addedTag.id" :tag="addedTag" class="mr-1 mt-1 md:m-0" />
        </div>
        <div
          v-if="item.removedTags.length"
          class="absolute top-0 z-51 rounded-md bg-white p-1 text-xs text-gray-300 shadow md:static md:flex md:flex-wrap md:items-center md:bg-opacity-0 md:p-0 md:text-sm md:shadow-none md:space-x-2"
          :class="{ hidden: !removedTagsOpen }"
        >
          <div>删除标签:</div>
          <Tag v-for="removedTag in item.removedTags" :key="removedTag.id" :tag="removedTag" class="mr-1 mt-1 md:m-0" />
        </div>
      </div>
    </div>
  </div>
</template>
