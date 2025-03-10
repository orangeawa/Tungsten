<script setup lang="ts">
// 获取路由参数
const route = useRoute()
const uid = computed(() => {
  const params = route.params as { uid?: string }
  return params.uid || ''
})

// 使用 GraphQL 查询
const { result, loading, error } = useQuery<Query>(gql`
    query($uid: String!){
        getUser(para:{
            uid:$uid
        }){
            id
            username
            desc
            image
            email
            bindQq
            meta {
                createdAt
            }
        }
    }
`, { uid })

// 计算属性：用户数据
const auth = computed(() => result.value?.getUser)

// 格式化日期的计算属性
const formattedDate = computed(() => {
  if (!auth.value?.meta.createdAt)
    return 'N/A'
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(auth.value.meta.createdAt))
})

// 监听加载状态并控制进度条
watchEffect(() => {
  if (loading.value) { // 如果数据正在加载
    if (!NProgress.isStarted()) // 如果进度条未启动
      NProgress.start() // 启动进度条
  }
  else { // 如果数据加载完成
    if (NProgress.isStarted()) // 如果进度条正在运行
      NProgress.done() // 完成进度条
  }
})
</script>

<template>
  <div class="max-w-5xl flex flex-col">
    <!-- 错误提示 -->
    <div v-if="error" class="relative mb-4 border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ error.message }}</span>
    </div>

    <div class="flex items-center bg-purple-300 p-6 text-white">
      <!-- 用户头像和昵称 -->
      <Avatar
        class="h-20 w-20 rounded-full transition-all duration-300"
        :image="auth?.image"
      />
      <div class="ml-6">
        <h2 class="text-2xl font-bold">
          {{ auth?.username || 'Unknown User' }}
        </h2>
        <p class="text-sm">
          注册时间: {{ formattedDate }}
        </p>
      </div>
    </div>

    <div class="bg-white p-8 shadow-md">
      <!-- about -->
      <div class="mb-8">
        <h2 class="mb-2 text-xl font-semibold">
          简介
        </h2>
        <p class="text-gray-700">
          {{ auth?.desc || 'No description available.' }}
        </p>
      </div>

      <!-- info -->
      <div>
        <h2 class="mb-2 text-xl font-semibold">
          其他信息
        </h2>
        <ul class="p-0 space-y-2">
          <li class="flex justify-between">
            <span class="text-gray-600">User ID:</span>
            <span class="text-gray-800">{{ auth?.id || 'N/A' }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-600">Email:</span>
            <span class="text-gray-800">{{ auth?.email || 'Not provided' }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-600">QQ Account:</span>
            <span class="text-gray-800">{{ auth?.bindQq || 'Not bound' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
