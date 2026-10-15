<script setup lang="ts">
import SettingsButton from './shared/SettingsButton.vue'
import TooltipTheme from './shared/TooltipTheme.vue'
</script>

<template>
  <footer
    class="flex h-25 w-full items-center justify-between border-t bg-white p-8 dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex items-center gap-2">
      <AppLogo footer />
    </div>

    <div class="flex items-center gap-2">
      <SettingsButton />
      <TooltipTheme />
      <span class="text-sm text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} HF1NaCl
      </span>
    </div>
  </footer>
</template>
