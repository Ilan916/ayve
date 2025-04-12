// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({}), // <-- ici on passe un objet vide
  vite: {
    plugins: [tailwindcss()],
  },
});
