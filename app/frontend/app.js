import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePage } from './pages'
import { h, createApp, createSSRApp } from 'vue'
import api from './api'
import {
  // create naive ui
  create,
  // component
  NGrid,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NLayoutHeader,
  NCard,
  NForm,
  NFormItemGi,
  NInput,
  NButton,
  NSpace,
  NMenu,
  NIcon
} from 'naive-ui'

const naive = create({
  components: [
    NGrid,
    NLayout,
    NLayoutContent,
    NLayoutSider,
    NLayoutHeader,
    NCard,
    NForm,
    NFormItemGi,
    NInput,
    NButton,
    NSpace,
    NMenu,
    NIcon
  ]
})

export function buildApp (options = {}) {
  return createInertiaApp({
    resolve: resolvePage,
    title: (title) => (title ? `${ title } - Inertia app` : 'Inertia App'),
    setup ({ el, App, props, plugin }) {
      let vueApp = null

      if (import.meta.env.SSR) {
        vueApp = createSSRApp({
          render: () => h(App, props),
        })
      } else {
        vueApp = createApp({
          render: () => h(App, props),
        });
      }

      vueApp.config.globalProperties.$route = api;
      vueApp.use(naive)
      vueApp.use(plugin)
      vueApp.mount(el)
    },
    ...options
  });
}