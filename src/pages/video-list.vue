<script lang="ts" setup>
// tools
function backTop(): void {
  const top: number = document.body.scrollTop || document.documentElement.scrollTop
  if (top > 0) {
    window.requestAnimationFrame(backTop)
    window.scrollTo(0, top - top / 5)
  }
}

// Defining request parameters
const limit = ref(20)
const offset = ref(0)
const order = ref<'latest' | 'oldest' | 'video_latest' | 'video_oldest' | 'last_modified'>('latest')

// Defining Requests
const { result, fetchMore, loading } = useQuery<Query>(gql`
  query ($offset: Int!, $limit: Int!, $query: String!, $qtype: String, $order: String!) {
    listVideo(para: {
      offset: $offset
      limit: $limit
      query: $query
      qtype: $qtype
      order: $order
    }) {
      count
      pageCount
      videos {
        id
        item {
          title
          coverImage
          partName
          url
        }
        clearence
        meta {
          createdAt
        }
      }
    }
  }
`, {
  offset: offset.value,
  limit: limit.value,
  query: '',
  qtype: '',
  order: order.value,
}, {
  notifyOnNetworkStatusChange: true,
})
// Encapsulate request method
function fetchMoreVideos() {
  fetchMore({
    variables: {
      offset: offset.value,
      limit: limit.value,
      query: '',
      qtype: '',
      order: order.value,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult)
        return prev
      return fetchMoreResult
    },
  })
}
// Calculate video list
const videos = computed(() => result.value?.listVideo.videos || Array.from({ length: limit.value }).fill(false))

// Handle events
watch(loading, () => {
  if (loading.value) {
    if (!NProgress.isStarted())
      NProgress.start()
  }
  else {
    if (NProgress.isStarted())
      NProgress.done()
  }
})
watch(offset, () => {
  backTop()
  fetchMoreVideos()
})
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <h1>视频列表</h1>
    <div class="text-sm text-gray-500">
      共 {{ result?.listVideo.count }} 个视频
    </div>
    <div class="flex flex-wrap justify-center -mx-2 md:justify-start">
      <VideoCard
        v-for="video in videos"
        :key="video"
        :video="video"
      />
    </div>

    <VideoPagination
      v-model:offset="offset"
      class="mt-4 justify-around md:justify-center"
      :limit="limit"
      :total="result?.listVideo.count || 0"
    />
  </div>
</template>
