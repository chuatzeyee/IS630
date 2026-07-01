import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// OFFLINE=1 builds with a relative base ('./') so the site runs from any folder
// or port (exam-day offline). Default is the '/IS630/' GitHub Pages base.
const offline = process.env.OFFLINE === '1'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: offline ? './' : '/IS630/',
})
