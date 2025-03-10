<script setup lang="ts">
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { auth } = storeToRefs(userStore)

const uid = computed(() => auth.value?.profile.uid)
</script>

<template>
  <div v-if="!auth">
    <RouterLink to="/login" class="text-base no-underline">
      登录
    </RouterLink>
  </div>
  <div v-else class="flex items-center space-x-4">
    <!-- Massage -->
    <Popover trigger="click" class="hidden sm:block">
      <div class="i-mdi:email-outline text-3xl text-coolgray" />
      <template #dropdown>
        <div class="w-auto whitespace-nowrap">
          消息和通知
        </div>
      </template>
    </Popover>
    <!-- Home -->
    <Popover trigger="click">
      <Avatar :image="auth.profile.image" class="h-9 w-9 rounded-full ring ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700" />
      <template #dropdown>
        <div class="flex items-center space-x-4">
          <Avatar :image="auth.profile.image" class="h-16 w-16 rounded-full ring ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700" />
          <div class="w-auto whitespace-nowrap">
            <div class="dark:text-gray-200">
              {{ auth.profile.username }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ auth.profile.email }}
            </div>
          </div>
        </div>
        <RouterLink :to="`/user/${uid}`" class="text-base no-underline">
          <div class="w-auto whitespace-nowrap border-b b-b-blue border-solid border-l-none border-r-none border-t-none p-2">
            个人中心
          </div>
        </RouterLink>
        <RouterLink :to="`/user/${uid}`" class="text-base no-underline">
          <div class="w-auto whitespace-nowrap border-b b-b-blue border-solid border-l-none border-r-none border-t-none p-2">
            个人中心
          </div>
        </RouterLink>
      </template>
    </Popover>
  </div>
</template>

<style lang="postcss" scoped></style>
