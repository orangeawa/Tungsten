<script setup lang="ts">
import type { NavLinkItem } from '@/components/Layout/types.ts'
import { useMotion } from '@vueuse/motion'

const {
  data,
  index,
  drawerOpen,
} = defineProps<{ data: NavLinkItem, index: number, drawerOpen: boolean }>()
const el = ref<HTMLElement>()

// ======= animation =======

const motion = useMotion(el, {
  enter: {
    opacity: 0,
    x: -60,
  },
})
watch(() => drawerOpen, (n) => {
  // if drawerOpen is true, apply the animation
  if (n) {
    motion.apply({
      opacity: 1,
      x: 0,
      transition: {
        // set delay to 40ms * index to ensure animation order
        delay: 40 * index,
        repeatType: 'mirror',
      },
    })
  }
  // else, reset the animation
  else {
    motion.apply('enter')
  }
})
</script>

<template>
  <div ref="el">
    <!-- pages router -->
    <RouterLink v-if="data.type === 'router'" :to="data.to" class="flex items-center gap-2 c-black no-underline">
      <div class="text-xl" :class="data.icon" />
      <div class="text-xl">
        {{ data.name }}
      </div>
    </RouterLink>

    <!-- external link -->
    <a v-else-if="data.type === 'a'" :href="data.url" class="flex items-center gap-2 c-black no-underline">
      <div class="text-xl" :class="data.icon" />
      <div class="text-xl">
        {{ data.name }}
      </div>
    </a>

    <!-- components -->
    <div v-else-if="data.type === 'components'" class="w-full flex items-center gap-2 c-black">
      <div class="text-xl" :class="data.icon" />
      <div class="text-xl">
        {{ data.name }}
      </div>
      <component :is="data.component" />
    </div>
  </div>
</template>

<style scoped>
.animate-once {
  animation-iteration-count: 1
}
</style>
