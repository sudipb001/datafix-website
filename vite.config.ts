import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ base: '/datafix-website/', plugins: [vue(), tailwindcss()], test: { environment: 'happy-dom', include: ['tests/**/*.test.ts'] } })
