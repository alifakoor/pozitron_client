import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [vue()],
    css: {
      loaderOptions: {
        sass: {
            additionalData: `@import "@/assets/styles/_variables.scss";`
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