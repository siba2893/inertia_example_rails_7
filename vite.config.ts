import { defineConfig } from 'vite'
import path from 'path'
import RubyPlugin from 'vite-plugin-ruby'
import ReactPlugin from '@vitejs/plugin-react'
import FullReload from 'vite-plugin-full-reload'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*']),
    RubyPlugin(),
    ReactPlugin(),
    dynamicImport(),
    WindiCSS({ root: process.cwd() }),
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react'
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, 'app/frontend') },
      { find: '@components', replacement: path.join(__dirname, 'app/frontend/components') },
      { find: '@pages', replacement: path.join(__dirname, 'app/frontend/pages') },
      { find: '@layouts', replacement: path.join(__dirname, 'app/frontend/layouts') },
      { find: '@helpers', replacement: path.join(__dirname, 'app/frontend/helpers') },
      { find: '@api', replacement: path.join(__dirname, 'app/frontend/api') },
      { find: '@styles', replacement: path.join(__dirname, 'app/frontend/styles') },
    ],
  },
})
