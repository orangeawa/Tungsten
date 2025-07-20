<script setup lang="ts">
const route = useRoute('/Playlist/[pid]')
const pid = computed(() => route.params.pid as string)

setSiteTitle('播放列表详情')

const page = computed(() => Number(pickFirstQuery(route.query.page)) || 1)
const limit = computed(() => Number(pickFirstQuery(route.query.limit)) || 20)

const { result, fetchMore, loading, error } = useQuery<Query>(
  gql`
    query ($pid: String!, $offset: Int!, $limit: Int!) {
      getPlaylist(para: { pid: $pid }) {
        item {
          title
          cover
          count
          desc
          private
          privateEdit
        }
        rating {
          userRating
          totalUser
        }
        commentThread {
          id
        }
        videos(offset: $offset, limit: $limit) {
          id
          item {
            title
            partName
            desc
            coverImage
            url
          }
          meta {
            createdAt
          }
        }
        meta {
          createdBy {
            id
            username
            image
            gravatar
            desc
          }
          createdAt
          modifiedAt
        }
        editable
        tags{
          __typename
          id
          tagid
          category
          languages {
            lang
            value
          }
        }
      }
    }
  `,
  {
    pid: pid.value,
    offset: (page.value - 1) * limit.value,
    limit: limit.value,
  },
)
const getPlaylist = computed(() => result.value?.getPlaylist)
watch(
  getPlaylist,
  (newVal) => {
    if (newVal) {
      setSiteTitle(newVal.item.title)
    }
  },
)
</script>

<template>
  <div class="space-y-5">
    <playlist-meta
      v-if="getPlaylist"
      :pid="pid"
      :title="getPlaylist.item.title"
      :private="getPlaylist.item.private"
      :author="getPlaylist.meta.createdBy"
      :tags="getPlaylist.tags"
      :rating="getPlaylist.rating"
      :cover="getPlaylist.item.cover"
      :desc="getPlaylist.item.desc"
    />
  </div>
</template>
