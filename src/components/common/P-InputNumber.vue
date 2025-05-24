<script setup lang="ts">
const props = defineProps({
  step: { type: Number, default: 1 },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
})

const modelValue = defineModel<number>({ default: 0 })

const inputRef = ref<HTMLInputElement>()

function onKeydown(e: KeyboardEvent) {
  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
    '-',
    '.', // 支持负号和小数点
  ]
  if (
    allowedKeys.includes(e.key)
    || (e.key >= '0' && e.key <= '9')
  ) {
    return
  }

  e.preventDefault()
}

function checkRange() {
  const el = inputRef.value
  if (!el)
    return

  const raw = el.value.trim()
  let value = Number(raw)

  if (Number.isNaN(value)) {
    value = props.min
  }
  else {
    if (value < props.min)
      value = props.min
    if (value > props.max)
      value = props.max
  }

  modelValue.value = value
  el.value = String(value)
}
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      class="h-6 w-6 border-none bg-transparent p-0 dark:text-author disabled:opacity-30"
      :disabled="modelValue <= min"
      @click="modelValue = modelValue - step"
    >
      −
    </button>

    <input
      ref="inputRef"
      :value="modelValue"
      class="w-16 border-none bg-transparent text-center outline-none dark:text-gray-200"
      @input="checkRange"
      @blur="checkRange"
      @keydown="onKeydown"
      @keydown.enter="checkRange"
    >

    <button
      class="h-6 w-6 border-none bg-transparent p-0 dark:text-author disabled:opacity-30"
      :disabled="modelValue >= max"
      @click="modelValue = modelValue + step"
    >
      +
    </button>
  </div>
</template>
