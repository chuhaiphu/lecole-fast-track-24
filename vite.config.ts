import path from "path";
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/api': 'http://0.0.0.0:3000'
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  plugins: [
    reactRouter(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  }
}));
