<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

const languageOptions = [
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
]

const selectedLanguage = ref('es')

const selectedOption = computed(
  () =>
    languageOptions.find((option) => option.value === selectedLanguage.value) ??
    languageOptions[0]!,
)
</script>

<template>
  <SelectRoot v-model="selectedLanguage">
    <SelectTrigger
      class="inline-flex h-7 min-w-[110px] items-center justify-between gap-1 rounded-md border border-stone-300 bg-white px-2 text-[11px] text-stone-700 shadow-sm outline-none hover:bg-stone-50 focus:ring-1 focus:ring-stone-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-stone-500"
      aria-label="Seleccionar idioma"
    >
      <SelectValue :aria-label="`Idioma: ${selectedOption.label}`">
        <span class="flex items-center gap-1.5">
          <span aria-hidden="true" class="text-sm leading-none">
            {{ selectedOption.flag }}
          </span>
          <span>{{ selectedOption.label }}</span>
        </span>
      </SelectValue>

      <SelectIcon>
        <Icon icon="radix-icons:chevron-down" class="size-3" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="6"
        class="z-50 w-[var(--reka-select-trigger-width)] rounded-md border border-stone-200 bg-white p-1 shadow-lg outline-none dark:border-gray-600 dark:bg-gray-700"
      >
        <SelectViewport>
          <SelectItem
            v-for="option in languageOptions"
            :key="option.value"
            :value="option.value"
            class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 pr-8 text-[11px] text-stone-700 outline-none data-[highlighted]:bg-stone-100 dark:text-white dark:data-[highlighted]:bg-gray-600"
          >
            <SelectItemText>
              <span class="flex items-center gap-2">
                <span aria-hidden="true" class="text-sm leading-none">{{ option.flag }}</span>
                <span>{{ option.label }}</span>
              </span>
            </SelectItemText>

            <SelectItemIndicator class="absolute right-2 inline-flex items-center">
              <Icon icon="mdi:check" class="size-3.5" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
