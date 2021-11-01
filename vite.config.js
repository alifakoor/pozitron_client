import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
            additionalData: `@import "@/assets/styles/app.scss";`
        }
      }
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            }
        ]
    },
    server: {
        port: 8080
    }
  })