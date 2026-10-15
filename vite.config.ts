import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import RekaResolver from 'reka-ui/resolver'

// https://vite.dev/config/
export default defineConfig({
  base: '/nonogram-solver/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Components({
      dts: true,
      resolvers: [RekaResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
