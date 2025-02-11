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
  <div v-else>
    <RouterLink :to="`/user/${uid}`" class="text-base no-underline">
      <Avatar :image="auth.profile.image" class="h-9 w-9 rounded-full ring ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700" />
    </RouterLink>
  </div>
</template>

<style lang="postcss" scoped></style>
