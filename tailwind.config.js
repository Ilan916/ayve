import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'chillax': ['Chillax', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
        'general-sans': ['General Sans', 'sans-serif'],
      }
    }
  },
})