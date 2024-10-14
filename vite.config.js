import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import mqpacker from 'node-css-mqpacker'
import sortMediaQueries from 'postcss-sort-media-queries'
import postcssMqLast from 'postcss-mq-last'

export default defineConfig({
  base: "/Vue-IdOmni/",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('swiper-')
        }
      }
    }),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
 css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'last 2 version',
            '> 1%'
        ]
        }), // add options if needed
        mqpacker(),
        sortMediaQueries({
          sort: 'mobile-first' // default
        }),
        postcssMqLast(),
      ],
    },  
  } 
})
