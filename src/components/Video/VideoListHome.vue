<script setup lang="ts">
const config = computed(() => ({
  rows: 1,
  query: '',
  order: 'latest',
  additionalConstraint: '',
}))
const { result, loading } = useQuery<Query>(gql`
    query ($limit: Int!, $query: String!, $order: String!, $additionalConstraint: String) {
      listVideo(
        para: {
          offset: 0
          limit: $limit
          humanReadableTag: true
          query: $query
          order: $order
          additionalConstraint: $additionalConstraint
        }
      ) {
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
  query: config.value.query,
  order: config.value.order,
  additionalConstraint: config.value.additionalConstraint,
  limit: config.value.rows * 10,
})

const videoResult = computed(() => result.value?.listVideo.videos || new Array<schema.Video | boolean>().fill(false))
watchEffect(() => {
  if (loading.value) {
    if (!NProgress.isStarted())
      NProgress.start()
  }
  else {
    if (NProgress.isStarted())
      NProgress.done()
  }
})
</script>

<template>
  <h2 class="mb-0 border-b-solid border-purple-100">
    最新上传
  </h2>
  <div class="flex flex-wrap justify-center md:justify-start -mx-2">
    <VideoCard v-for="item in videoResult" :key="item" :video="item" />
  </div>
</template>

<style lang="scss" scoped></style>
