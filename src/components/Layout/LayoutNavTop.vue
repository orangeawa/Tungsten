<script setup lang="ts">
import type { NavGroup } from '@/components/Layout/types.ts'
import DarkModeSwitch from './DarkModeSwitch.vue'

const navContainer = shallowRef<HTMLElement | null>(null)

const drawerOpen = ref(false)

useEventListener(
  document,
  'click',
  (e: MouseEvent) => {
    if (!navContainer.value)
      return

    const target = e.target as HTMLElement

    if (!navContainer.value.contains(target) && drawerOpen.value) {
      e.stopPropagation()
      e.preventDefault()
      drawerOpen.value = false
    }
  },
  { passive: true },
)

// ====== About navigation links ======

const linkList = computed(() => {
  const links: NavGroup[] = [
    {
      groupName: '主要',
      links: [
        {
          name: '主页',
          icon: 'i-mdi-home',
          type: 'router',
          to: '/',
        },
        {
          name: '视频',
          icon: 'i-mdi-video',
          type: 'router',
          to: '/video-list',
        },
        {
          name: '播放列表',
          icon: 'i-mdi-format-list-text',
          type: 'router',
          to: '/playlist-list',
        },
        {
          name: '讨论板',
          icon: 'i-mdi:message-minus-outline',
          type: 'router',
          to: '/video',
        },
        {
          name: '用户排行榜',
          icon: 'i-mdi:format-list-numbered',
          type: 'router',
          to: '/leaderboard',
        },
        {
          name: '网站维基',
          icon: 'i-mdi:wikipedia',
          type: 'a',
          url: 'https://patchyvideo.wiki/',
        },
      ],
    },
  ]
  // todo: add more links，

  links.push(
    {
      groupName: 'Settings',
      links: [
        {
          type: 'components',
          name: '暗夜模式',
          icon: 'i-mdi-theme-light-dark',
          component: DarkModeSwitch,
        },
      ],
    },
  )
  return links
})
</script>

<template>
  <div ref="navContainer">
    <div
      class="fixed inset-x-0 z-49 h-12 flex items-center justify-between bg-white p-2 shadow shadow-purple-100 md:h-12 dark:bg-dark-600 dark:shadow-gray-600"
    >
      <!-- Logo & Slide Button -->
      <div class="inline-flex flex-nowrap items-center space-x-2">
        <div
          class="h-8 w-8 cursor-pointer rounded-full transition transition-colors hover:bg-purple-200"
          :class="drawerOpen ? 'i-mdi-close' : 'i-mdi-menu'" @click="drawerOpen = !drawerOpen"
        />
        <RouterLink to="/" class="hidden text-black xl:inline dark:text-white hover:text-inherit">
          <Logo />
        </RouterLink>
      </div>

      <LayoutNavTopSearch class="absolute left-1/2 max-w-2/3 lg:max-w-150 -translate-x-1/2" />

      <LayoutNavTopUserHome />
    </div>
    <!-- Placeholder element to leave space below the navigation bar -->
    <div class="h-16" />

    <!-- Drawer -->
    <div
      class="fixed bottom-0 top-16 flex transform transition-transform ease-in-out"
      :class="{ '-translate-x-full': !drawerOpen }"
    >
      <!-- Menu -->
      <div class="flex flex-col gap-1 overflow-y-auto bg-white px-2 pt-2 shadow-lg dark:bg-dark-600">
        <!-- LinkGroup -->
        <div v-for="({ groupName, links }) in linkList" :key="groupName" class="space-y-1">
          <!-- Group name -->
          <div class="text-sm c-gray">
            {{ groupName }}
          </div>
          <!-- Links -->
          <div class="flex flex-col gap-1">
            <!-- Link -->
            <LayoutNavTopLink
              v-for="(link, i) in links" :key="link.name" :index="i" :drawer-open="drawerOpen"
              :data="link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
