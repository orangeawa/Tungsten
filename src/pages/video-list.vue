<script lang="ts" setup>
// ================ router ================
const route = useRoute()
const router = useRouter()

// ================ reactive parameters ================
const limit = ref(Number(route.query.limit) || 20)
const offset = ref(Number(route.query.offset) || 0)
const order = ref<'latest' | 'oldest' | 'video_latest' | 'video_oldest' | 'last_modified'>(
  (route.query.order as any) || 'latest',
)
const qtype = ref<'tag' | 'text'>((route.query.qtype as any) || 'tag')
const q = ref<string>((route.query.q as any) || '')

// Watch for changes in the limit and update the URL
watch(offset, () => {
  router.replace({
    query: {
      ...route.query,
      offset: offset.value,
    },
  })
})
watch(
  () => route.query,
  (query) => {
    limit.value = Number(query.limit) || 20
    offset.value = Number(query.offset) || 0
    order.value = (query.order as any) || 'latest'
    qtype.value = (query.qtype as any) || 'tag'
    q.value = (query.q as any) || ''

    fetchMoreVideos()
  },
)

// ================ video request ================
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
  query: q.value,
  qtype: qtype.value,
  order: order.value,
}, {
  notifyOnNetworkStatusChange: true,
})
function fetchMoreVideos() {
  fetchMore({
    variables: {
      offset: offset.value,
      limit: limit.value,
      query: q.value,
      qtype: qtype.value,
      order: order.value,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult)
        return prev
      return fetchMoreResult
    },
  })
}
/** videolist */
const videos = computed(() => result.value?.listVideo.videos || Array.from({ length: limit.value }).fill(false))

// ================ loading event ================
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
watch([offset, order], () => {
  backTop()
  fetchMoreVideos()
})
</script>

<template>
  <div class="mx-auto max-w-7xl dark:text-gray-400">
    <h1>视频列表</h1>
    <AdvancedSearch />
    <div class="text-sm text-gray-500">
      共 {{ result?.listVideo.count }} 个视频
    </div>
    <div class="flex flex-wrap justify-center -mx-2 md:justify-start">
      <VideoCard
        v-for="video in videos"
        :key="video"
        :min-width="0"
        class="m-2 w-[calc(50%-1rem)] md:w-[calc(20%-1rem)]"
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
