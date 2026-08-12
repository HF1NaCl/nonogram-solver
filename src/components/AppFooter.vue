<script setup lang="ts">
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const handleToggleDark = () => toggleDark()

const buttonClasses = computed(() => [
  'flex items-center justify-center w-10 h-10 rounded-md',
  isDark.value ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black',
])
const buttonIcon = computed(() => (isDark.value ? 'iconoir:half-moon' : 'iconoir:sun-light'))
</script>

<template>
  <footer
    class="flex justify-between items-center bg-white dark:bg-gray-800 h-25 w-full mx-auto border-t dark:border-gray-700 p-8"
  >
    <div class="flex items-center gap-2"><AppLogo /></div>
    <div class="flex items-center gap-2">
      <button :class="buttonClasses" @click="handleToggleDark">
        <Icon :icon="buttonIcon" class="Icon" />
      </button>
      <span class="text-sm text-gray-500 dark:text-gray-400"
        >© {{ new Date().getFullYear() }} HF1NaCl</span
      >
    </div>
  </footer>
</template>

<style scoped>
.Icon {
  @apply cursor-pointer transition opacity-40 hover:opacity-60;
  font-size: 24px;
}
</style>
