<script lang="ts" setup>
/**
 * Video pagination component
 * @param offset Current offset
 * @param limit Items per page
 * @param total Total number of items
 */
const props = defineProps({
  offset: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:offset'])

// Calculate current page number
const currentPage = computed(() => {
  return Math.floor(props.offset / props.limit) + 1
})

// Calculate total pages
const pageCount = computed(() => {
  return Math.ceil(props.total / props.limit)
})

// Calculate page numbers to display
const paginationList = computed(() => {
  const count = pageCount.value
  const curr = currentPage.value

  // Show all page numbers when total pages <= 7
  if (count <= 7) {
    return Array.from({ length: count }, (_, i) => i + 1)
  }

  // Array of page numbers to display
  const result: (number | string)[] = []

  // Current page near the start
  if (curr < 4) {
    result.push(1, 2, 3, 4, 5, '...', count)
  }
  // Current page near the end
  else if (curr > count - 3) {
    result.push(1, '...', count - 4, count - 3, count - 2, count - 1, count)
  }
  // Current page in the middle
  else {
    result.push(1, '...', curr - 1, curr, curr + 1, '...', count)
  }

  return result
})

// Handle page change
function handlePageChange(page: number) {
  if (page < 1 || page > pageCount.value)
    return
  emit('update:offset', (page - 1) * props.limit)
}

// Go to previous page
function handlePrevPage() {
  handlePageChange(currentPage.value - 1)
}

// Go to next page
function handleNextPage() {
  handlePageChange(currentPage.value + 1)
}
</script>

<template>
  <div class="flex items-center gap-1">
    <div class="video-pagination__item">
      <button
        class="h-8 min-w-8 inline-flex cursor-pointer items-center justify-center border border-gray-100 rounded bg-white px-1 transition-all duration-300 disabled:cursor-not-allowed hover:border-purple-500 disabled:bg-gray-50 disabled:text-gray-400 hover:text-purple-500"
        :disabled="currentPage === 1"
        @click="handlePrevPage"
      >
        上一页
      </button>
    </div>

    <div
      v-for="(page, index) in paginationList"
      :key="index"
      class="video-pagination__item"
    >
      <template v-if="page === '...'">
        <span class="h-8 min-w-8 inline-flex items-center justify-center text-gray-500">...</span>
      </template>
      <template v-else>
        <button
          class="h-8 min-w-8 inline-flex cursor-pointer items-center justify-center border border-gray-300 rounded px-1 transition-all duration-300 hover:border-purple-500 hover:bg-purple-100"
          :class="{ 'text-white bg-purple-500 border-purple-500': page === currentPage, 'bg-white border-gray-300': page !== currentPage }"
          @click="handlePageChange(page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <div class="video-pagination__item">
      <button
        class="h-8 min-w-8 inline-flex cursor-pointer items-center justify-center border border-gray-300 rounded bg-white px-1 transition-all duration-300 disabled:cursor-not-allowed hover:border-purple-500 disabled:bg-gray-50 disabled:text-gray-400 hover:text-purple-500"
        :disabled="currentPage === pageCount"
        @click="handleNextPage"
      >
        下一页
      </button>
    </div>
  </div>
</template>
