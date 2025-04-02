<script setup lang="ts">
interface Option {
  name: string
  value: string
}
const props = defineProps<{
  selectedOp: Option
  ops: Option[]
  ring?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:selectedOp', value: Option): void
}>()
const selectedOp = useVModel(props, 'selectedOp', emit)

const rootEl = shallowRef<HTMLDivElement | null>()
const optionsEl = shallowRef<HTMLDivElement | null>()

const rootPos = useElementBounding(rootEl, { immediate: true })
const optionsTop = computed(() => rootPos.top.value + rootPos.height.value)
const optionsLeft = computed(() => rootPos.left.value)
</script>

<template>
  <div ref="rootEl" class="inline-block">
    <HListbox v-slot="{ open }" v-model="selectedOp">
      <HListboxButton class="w-full flex items-center justify-between whitespace-nowrap rounded-md border-none bg-white px-2 py-0.5 space-x-4 dark:bg-gray-600 dark:text-gray-200" :class="{ 'ring ring-purple-100': ring }">
        <div>
          {{ selectedOp.name }}
        </div>
        <div
          class="i-mdi-triangle-down h-3 w-3 transition-transform" :class="{ 'rotate-180': open }"
          aria-hidden="true"
        />
      </HListboxButton>
      <Teleport to="body">
        <div
          ref="optionsEl"
          class="absolute z-51 overflow-hidden px-1 pb-2 pt-1 -mx-1"
          :style="{
            top: `${optionsTop}px`,
            left: `${optionsLeft}px`,
            width: `calc(${rootPos.width.value}px + 0.5rem)`,
          }"
        >
          <Transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-from-class="-translate-y-2/3 opacity-40"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition ease-out duration-100 transform"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-2/3 opacity-0"
          >
            <HListboxOptions class="rounded-md bg-white py-1 shadow dark:bg-gray-600">
              <HListboxOption
                v-for="op in ops"
                v-slot="{ active, selected }"
                :key="op.value"
                :value="op"
                as="template"
              >
                <span
                  class="block cursor-pointer select-none whitespace-nowrap rounded-md px-4 py-1 transition transition-colors"
                  :class="[selected ? 'font-medium' : 'font-normal', active && 'bg-purple-100 dark:bg-gray-700']"
                >
                  {{ op.name }}
                </span>
              </HListboxOption>
            </HListboxOptions>
          </Transition>
        </div>
      </Teleport>
    </HListbox>
  </div>
</template>

<style scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
