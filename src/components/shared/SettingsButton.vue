<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'reka-ui'
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <button type="button" aria-label="Abrir información" class="settings-button">
        <Icon icon="mdi:information-outline" class="size-6 dark:text-white" />
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />

      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl outline-none dark:border-gray-700 dark:bg-gray-800"
      >
        <DialogTitle class="text-lg font-bold text-gray-900 dark:text-white">
          Acerca de
        </DialogTitle>

        <TabsRoot default-value="about" class="mt-6">
          <TabsList
            class="flex gap-2 border-b border-gray-200 dark:border-gray-700"
            aria-label="Información del proyecto"
          >
            <TabsTrigger
              value="about"
              class="border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 data-[state=active]:border-gray-900 data-[state=active]:font-semibold dark:text-gray-300 dark:data-[state=active]:border-white"
            >
              Acerca de
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" class="mt-4">
            <div class="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Nonogram Solver</h3>
                <p>
                  Reimplementación del proyecto original para aprender tecnologías web modernas.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Desarrollado por</h3>
                <a
                  href="https://github.com/HF1NaCl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  HF1NaCl
                </a>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Inspiración</h3>
                <p>
                  Basado en la idea de
                  <a
                    href="https://nonogramsolver.com/"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Nonogram Solver
                  </a>
                </p>
                <p>
                  Con el algoritmo de
                  <a
                    href="https://fedimser.github.io/nonogram.html"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Dima Fedoriaka
                  </a>
                </p>
                <p>
                  Con la representación visual de
                  <a
                    href="https://lihautan.com/nonogram/"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Tan Li Hau
                  </a>
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Tecnologías</h3>
                <p>Vue.js, TypeScript, Tailwind CSS, Reka UI y Web Workers.</p>
              </div>
            </div>
          </TabsContent>
        </TabsRoot>

        <DialogClose
          class="mt-6 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
        >
          Cerrar
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.settings-button {
  @apply bg-gray-300 dark:bg-gray-700 rounded-full p-2 border dark:border-gray-50 cursor-pointer hover:shadow-lg transition-shadow duration-200 active:scale-95;
}
</style>
