<!-- eslint-disable vue/no-v-html -->
<script lang="ts" setup>
import { render } from '@/utils/markdown/parserComment'
import { useIntersectionObserver } from '@vueuse/core'
import { nextTick, ref, shallowRef, watch } from 'vue'

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  (event: 'htmlChanged'): void
}>()

const html = ref('')
const waitingForRender = ref(true)
watch(() => props, (p, op) => {
  if (p.text !== op.text)
    waitingForRender.value = true
})
const root = shallowRef<HTMLElement | null>(null)
useIntersectionObserver(
  root,
  ([{ isIntersecting }]) => {
    if (isIntersecting && waitingForRender.value) {
      html.value = render(props.text)
      nextTick(() => emit('htmlChanged'))
      waitingForRender.value = false
    }
  },
  { rootMargin: '400px 400px 400px 400px' },
)
</script>

<template>
  <div class="overflow-hidden">
    <div class="-my-24">
      <article
        ref="root"
        class="prose dark:prose-invert my-24 break-all"
        v-html="html"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import 'highlight.js/styles/github.css';
.prose {
  max-width: inherit;
}
</style>
