<script lang="ts" setup>
const props = defineProps<{
  dateRangeNumber: number
}>()

const { result, fetchMore, loading, error } = useQuery<Query>(
  gql`
    query ($dateRangeNumber: Int!) {
      getLeaderboard(hrs: $dateRangeNumber, k: 30) {
        items {
          count
          user {
            id
            username
            desc
            image
          }
        }
      }
    }
  `,
  {
    dateRangeNumber: props.dateRangeNumber,
  },
  {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
)
const getLeaderboard = computed(() => result.value?.getLeaderboard.items || [])

function fetchLeaderboard(dateRangeNumber: number) {
  fetchMore({
    variables: {
      dateRangeNumber,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult)
        return prev
      return fetchMoreResult
    },
  })
}
watch(() => props.dateRangeNumber, (newv) => {
  fetchLeaderboard(newv)
})

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
  <div class="mx-auto max-w-300">
    <div v-if="loading">
      加载中
    </div>
    <div v-else-if="error">
      加载错误，原因：{{ error.message }}
    </div>
    <div v-else-if="!getLeaderboard.length">
      暂无数据
    </div>
    <ContributorGrid v-for="(item, index) in getLeaderboard" v-else :key="item.user.id" :item="item" :index="index + 1" />
  </div>
</template>
