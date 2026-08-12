<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="bg-gray-200 dark:bg-gray-900 min-h-screen flex flex-col">
    <div class="p-4 flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 max-w-4xl w-full mx-auto mt-4">
        <RouterView />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped></style>
