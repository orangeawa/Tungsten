<script setup lang="ts">
import { storeToRefs } from 'pinia'
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

// 获取用户数据，用于判断是否为当前用户
const userStore = useUserStore()
const { auth: myAuth } = storeToRefs(userStore)

const myUid = computed(() => myAuth.value?.profile.uid)

const isMe = computed(() => myUid.value === uid.value)

// 更新用户名
function updateUsername(e: FocusEvent) {
  const target = e.target as HTMLElement
  const username = target.textContent?.trim() || ''

  if (username === auth.value?.username)
    return
  if (!username) {
    target.textContent = auth.value?.username || 'Unknown User'
    return
  }
  changeUsername(username)
}

function updateDesc(e: FocusEvent) {
  const target = e.target as HTMLElement
  const desc = target.textContent?.trim() || ''

  if (desc === auth.value?.desc)
    return
  changeDesc(desc)
}

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
  <div class="m-t-16 max-w-5xl flex flex-col">
    <!-- 错误提示 -->
    <div v-if="error" class="relative mb-4 border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">{{ error.message }}</span>
    </div>

    <div class="flex items-center bg-purple-300 p-6 text-white dark:bg-purple-900">
      <!-- 用户头像和昵称 -->
      <Avatar
        class="h-20 w-20 rounded-full transition-all duration-300"
        :image="auth?.image"
      />
      <div class="ml-6">
        <h2 class="text-2xl font-bold" :contenteditable="isMe" @blur="updateUsername">
          {{ auth?.username || 'Unknown User' }}
        </h2>
        <p class="text-sm">
          注册时间: {{ formattedDate }}
        </p>
      </div>
    </div>

    <div class="bg-white p-8 shadow-md dark:bg-dark-700 dark:text-gray-200">
      <!-- about -->
      <div class="mb-8">
        <h2 class="mb-2 text-xl font-semibold">
          简介
        </h2>
        <p
          class="text-gray-700 dark:text-gray-300"
          :contenteditable="isMe"
          @blur="updateDesc"
        >
          {{ auth?.desc || 'No description available.' }}
        </p>
      </div>

      <!-- info -->
      <div v-if="isMe" class="mb-8">
        <h2 class="mb-2 text-xl font-semibold">
          其他信息
        </h2>
        <ul class="p-0 space-y-2">
          <li class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">User ID:</span>
            <span class="text-gray-800 dark:text-gray">{{ auth?.id || 'N/A' }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">Email:</span>
            <span class="text-gray-800 dark:text-gray">{{ auth?.email || 'Not provided' }}</span>
          </li>
          <li class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">QQ Account:</span>
            <span class="text-gray-800 dark:text-gray">{{ auth?.bindQq || 'Not bound' }}</span>
          </li>
        </ul>
      </div>

      <!-- edit password -->
      <div v-if="false" class="mt-8">
        <h2 class="mb-2 text-xl font-semibold">
          修改密码
        </h2>
        <div class="flex items-center space-x-2">
          <input
            type="password"
            class="w-1/2 border border-gray-300 rounded p-2 dark:border-gray-700"
            placeholder="New Password"
          >
          <input
            type="password"
            class="w-1/2 border border-gray-300 rounded p-2 dark:border-gray-700"
            placeholder="Confirm Password"
          >
          <button class="rounded bg-purple-500 p-2 text-white hover:bg-purple-600">
            修改密码
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
