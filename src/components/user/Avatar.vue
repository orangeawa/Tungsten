<script setup lang="ts">
import DefaultAvatar from '@/assets/DefaultAvatar.jpg'

const props = defineProps<{
  image: string
}>()

const imgUrl = computed(() => {
  if (!props.image || props.image === 'default') {
    return DefaultAvatar
  }
  return `https://patchyvideo.com/be/images/userphotos/${props.image}`
})
</script>

<template>
  <img :src="imgUrl" class="bg-gray-300 dark:bg-gray-600 dark:brightness-90 dark:filter">
</template>

<style lang="postcss" scoped></style>
