<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const showMore = ref(false)
// ================ video sort ================
type OrderType = 'latest' | 'oldest' | 'video_latest' | 'video_oldest' | 'last_modified'
const order = ref<OrderType>('latest')
const orderList: { label: string, value: OrderType }[] = [
  { label: '索引时间正序', value: 'latest' },
  { label: '索引时间倒序', value: 'oldest' },
  { label: '原视频发布正序', value: 'video_latest' },
  { label: '原视频发布倒序', value: 'video_oldest' },
  { label: '最后修改时间顺序', value: 'last_modified' },
]
function changeOrder(value: OrderType) {
  order.value = value
  router.replace({
    query: {
      ...route.query,
      order: value,
    },
  })
}

// ================ website ================
type SiteType = '' | 'bili' | 'nico' | 'ytb' | 'twitter' | 'acfun' | 'zcool' | 'ipfs' | 'weibo-mobile'
const site = ref<SiteType[]>([''])
const siteList: { name: string, value: SiteType }[] = [
  { name: '全部', value: '' },
  { name: 'Bilibili', value: 'bili' },
  { name: 'Nicovideo', value: 'nico' },
  { name: 'YouTube', value: 'ytb' },
  { name: 'Twitter', value: 'twitter' },
  { name: 'Acfun', value: 'acfun' },
  { name: '微博', value: 'weibo-mobile' },
  { name: '站酷', value: 'zcool' },
  { name: 'IPFS', value: 'ipfs' },
]
function siteSelected(value: SiteType) {
  // reset
  if (!value)
    return site.value = ['']
  site.value = site.value.filter(item => item !== '')

  // select
  if (site.value.length === 1 && site.value[0] === value)
    return site.value = ['']
  if (site.value.includes(value))
    return site.value = site.value.filter(item => item !== value)

  site.value.push(value)
}

// ================ search type ================
const qtype = ref('tag')
const qtypeList = [
  { name: '标签/文本模式', value: 'tag' },
  { name: '仅文本模式', value: 'text' },
]

// ================ search ================
const includeKeywords = ref([])
const excludeKeywords = ref([])

// ================ apply filter ================
function applyFilters() {
  const ikey = includeKeywords.value.length ? ` ${includeKeywords.value.join(' ')}` : ''
  const ekey = excludeKeywords.value.length ? ` NOT ${excludeKeywords.value.join(' NOT ')}` : ''
  const siteStr = !site.value.includes('') ? ` ANY(site:${site.value.join(' site:')})` : ''
  const q = ikey + ekey + siteStr

  router.replace({
    query: {
      ...route.query,
      qtype: qtype.value,
      site: site.value,
      includeKeywords: includeKeywords.value,
      excludeKeywords: excludeKeywords.value,
      q,
    },
  })
}
// ================ init ================
function init() {
  // set default values
  order.value = (route.query.order as any) || 'latest'
  qtype.value = (route.query.qtype as any) || 'tag'
  includeKeywords.value = (route.query.includeKeywords as any)?.split(' ') || []
  excludeKeywords.value = (route.query.excludeKeywords as any)?.split(' ') || []
  site.value = (route.query.site as any)?.split(' ') || ['']
}

init()
</script>

<template>
  <div class="p-b-4">
    <!-- External Display -->
    <div class="m-y-2 flex items-start justify-between">
      <!-- Sort Order -->
      <div class="flex flex-1 flex-wrap items-center gap-2">
        <div
          v-for="item in orderList" :key="item.value"
          :class="[order === item.value ? 'bg-purple-400:70 dark:bg-purple-700:60 text-purple-8 dark:text-purple ' : '']"
          class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition duration-300 ease-in-out"
          @click="changeOrder(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <!-- More Filters -->
      <div
        class="use-select-none cursor-pointer select-none border border-gray-300:30 rounded-lg border-solid px-2 py-1"
        @click="showMore = !showMore"
      >
        {{ showMore ? '收起筛选' : '更多筛选' }}
      </div>
    </div>

    <!-- Collapsible Content -->
    <div class="grid transition-all duration-300 ease-in-out" :style="{ gridTemplateRows: showMore ? '1fr' : '0fr' }">
      <div class="flex flex-col gap-2 overflow-hidden">
        <!-- Source Websites -->
        <div class="flex flex-wrap items-center gap-2">
          <div
            v-for="item in siteList" :key="item.value"
            :class="[site.includes(item.value) ? 'bg-purple-400:70 dark:bg-purple-700:60 text-purple-8 dark:text-purple ' : '']"
            class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition duration-300 ease-in-out"
            @click="siteSelected(item.value)"
          >
            {{ item.name }}
          </div>
        </div>

        <!-- Search Type -->
        <div class="flex items-center gap-2">
          <div
            v-for="item in qtypeList" :key="item.value"
            :class="[qtype === item.value ? 'bg-purple-400:70 dark:bg-purple-700:60 text-purple-8 dark:text-purple ' : '']"
            class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition duration-300 ease-in-out"
            @click="qtype = item.value"
          >
            {{ item.name }}
          </div>
        </div>

        <!-- Include Keywords -->
        <div>
          <div class="m-b-1 text-gray-500">
            包含关键词：
          </div>
          <P-InputTag v-model="includeKeywords" :disabled="false" />
        </div>
        <!-- Exclude Keywords -->
        <div>
          <div class="m-b-1 text-gray-500">
            排除的标签：
          </div>
          <P-InputTag v-model="excludeKeywords" :disabled="false" />
        </div>
        <!-- TODO: Add date range selection -->
        <div>
          <!-- <input id="" type="date" name=""> -->
        </div>
        <!-- TODO: Add tag count filter -->
        <!-- TODO: Add option to show only videos pending manual tag review -->

        <div class="p-x-1 p-y-2">
          <button
            class="border border-gray:20 rounded border-solid bg-transparent px-4 py-2 outline-amber transition duration-150 ease-in-out active:border-purple-400 hover:bg-purple-500:20 dark:text-gray"
            @click="applyFilters"
          >
            确认筛选
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
