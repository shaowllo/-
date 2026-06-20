import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'gsap/ScrollTrigger', 'lucide-react'],
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-globe'],
          'ui-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
