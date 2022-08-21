import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import FullReload from 'vite-plugin-full-reload'
import VuePlugin from '@vitejs/plugin-vue'
// import WindiCSS from 'vite-plugin-windicss'
// import Unocss from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*']),
    RubyPlugin(),
    VuePlugin(),
    // Unocss(),
    // WindiCSS({ root: process.cwd() }),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({ autoInstall: true, compiler: 'vue3' }),
  ]
})
