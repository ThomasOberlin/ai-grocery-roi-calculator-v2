import { defineConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-grocery-roi-calculator-v2/',
  build: {
    outDir: 'dist',
  },
})
