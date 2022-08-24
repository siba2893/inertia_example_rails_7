import { defineConfig } from 'vite'
import path from 'path'
import RubyPlugin from 'vite-plugin-ruby'
import ReactPlugin from '@vitejs/plugin-react'
import FullReload from 'vite-plugin-full-reload'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import dynamicImport from "vite-plugin-dynamic-import";


export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*']),
    RubyPlugin(),
    ReactPlugin(),
    dynamicImport(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({ autoInstall: true, compiler: 'vue3' }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, 'app/frontend') }
    ],
  },
})
