<script lang="ts" setup>
defineProps<{
  note: globalThis.schema.SystemNotificationObject
}>()
</script>

<template>
  <div class="border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-dark-100">
    <div class="font-bold">
      系统消息
    </div>
    <div class="text-sm text-gray-600 dark:text-gray-200">
      {{ note.content }}
    </div>
    <div class="text-xs text-gray-400">
      {{ note.time }}
    </div>
  </div>
</template>
