<script lang="ts" setup>
const props = defineProps<{
  dateRangeNumber: number
}>()

const { result, loading, error } = useQuery<Query>(
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
)
const getLeaderboard = computed(() => result.value?.getLeaderboard.items || [])
</script>

<template>
  <div class="mx-auto max-w-300">
    <div v-if="loading">
      加载中
    </div>
    <div v-else-if="error">
      加载错误，原因：{{ error.message }}
    </div>
    <ContributorGrid v-for="(item, index) in getLeaderboard" :key="item.user.id" :item="item" :index="index + 1" />
  </div>
</template>
