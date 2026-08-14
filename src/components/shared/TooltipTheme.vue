<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import {
  SwitchRoot,
  SwitchThumb,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'

const isDark = useDark()
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <SwitchRoot
          v-model="isDark"
          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-gray-300 p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-600 data-[state=checked]:bg-gray-900 dark:data-[state=checked]:bg-blue-500"
          :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
        >
          <SwitchThumb
            class="flex size-5 translate-x-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=checked]:bg-white"
          >
            <Icon :icon="isDark ? 'iconoir:half-moon' : 'iconoir:sun-light'" class="size-3.5" />
          </SwitchThumb>
        </SwitchRoot>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          side="top"
          :side-offset="8"
          class="z-50 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-md dark:bg-gray-100 dark:text-gray-900"
        >
          {{ isDark ? 'Activar modo claro' : 'Activar modo oscuro' }}
          <TooltipArrow class="fill-gray-900 dark:fill-gray-100" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
