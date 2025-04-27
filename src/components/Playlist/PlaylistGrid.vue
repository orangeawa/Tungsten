<!-- Single playlist display in playlist-list page -->
<script lang="ts" setup>
const props = defineProps<{
  playlistData: schema.Playlist | boolean
}>()
const name = computed(() => typeof props.playlistData === 'boolean' ? '' : props.playlistData.item.title)
const titleLinksTo = computed(() => typeof props.playlistData === 'boolean' ? '' : `/playlist/${props.playlistData.id}`)
const isPrivate = computed(() => typeof props.playlistData === 'boolean' ? false : props.playlistData.item.private)
const author = computed(() => typeof props.playlistData === 'boolean' ? undefined : props.playlistData.meta.createdBy)
const videos = computed(() => typeof props.playlistData === 'boolean' ? Array.from({ length: 6 }).fill(false) : props.playlistData.videos)
const cover = computed(() => typeof props.playlistData === 'boolean' ? '' : props.playlistData.item.cover)
const count = computed(() => typeof props.playlistData === 'boolean' ? 0 : props.playlistData.item.count)
</script>

<template>
  <div>
    <PlaylistGridTitle
      :name="name"
      :title-links-to="titleLinksTo"
      :private="isPrivate"
      :author="author"
    />

    <!-- This div makes mask⬇️ do not move -->
    <div class="relative">
      <div class="flex overflow-auto space-x-2 md:pb-2">
        <!-- This div is used to set the width of VideoCard -->
        <div v-for="(video, index) in videos" :key="index" class="flex-shrink-0 flex-grow-0 md:w-64">
          <VideoCard
            class="m-2 w-[calc(50%-1rem)] md:w-[calc(20%-1rem)]"
            :min-width="0"
            :video="video"
          />
        </div>

        <div v-if="count" class="w-48 flex-shrink-0 flex-grow-0 md:w-64">
          <PlaylistCoverLink :title-links-to="titleLinksTo" :count="count" :cover="cover" />
        </div>
      </div>

      <!-- Mask⬆️ for more video, "-1" position is adjusted for screen larger than 1920px, for mysterious no covering the video -->
      <div class="pointer-events-none absolute w-30 from-light-100 to-transparent bg-gradient-to-l -bottom-1 -right-1 -top-1 md:w-50" />
    </div>
  </div>
</template>
