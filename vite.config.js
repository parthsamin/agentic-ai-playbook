import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works under any GitHub Pages sub-path
// (e.g. https://<user>.github.io/AgenticAI-Playbook/) as well as at a root domain.
export default defineConfig({
  plugins: [react()],
  base: './',
})
