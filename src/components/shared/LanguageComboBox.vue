<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const languageOptions = [
  { value: 'en', label: 'English', flag: 'EN' },
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'fr', label: 'Français', flag: 'FR' },
]

const selectedLanguage = ref('es')
const isOpen = ref(false)

function toggleOptions() {
  isOpen.value = !isOpen.value
}

function selectLanguage(value: string) {
  selectedLanguage.value = value
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="min-w-[110px] inline-flex items-center justify-between rounded-md border border-stone-300 dark:border-gray-600 px-[8px] text-[11px] leading-none h-[28px] gap-[4px] bg-white dark:bg-gray-700 text-stone-700 dark:text-white hover:bg-stone-50 dark:hover:bg-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-500 cursor-pointer"
      @click="toggleOptions"
    >
      <span class="flex items-center gap-1.5">
        <span class="text-sm leading-none">{{
          languageOptions.find((option) => option.value === selectedLanguage)?.flag
        }}</span>
        <span class="truncate">{{
          languageOptions.find((option) => option.value === selectedLanguage)?.label ?? 'Idioma'
        }}</span>
      </span>
      <Icon icon="radix-icons:chevron-down" class="h-3 w-3 text-stone-500 dark:text-white" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 z-10 mt-2 w-[140px] rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-gray-600 dark:bg-gray-700"
    >
      <button
        v-for="option in languageOptions"
        :key="option.value"
        type="button"
        class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[11px] text-stone-700 transition hover:bg-stone-100 dark:text-white dark:hover:bg-gray-600"
        :class="selectedLanguage === option.value ? 'bg-stone-100 dark:bg-gray-600' : ''"
        @click="selectLanguage(option.value)"
      >
        <span class="text-sm leading-none">{{ option.flag }}</span>
        <span class="truncate">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
