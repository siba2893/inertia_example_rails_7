import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePage } from './pages'
import { h, createApp, createSSRApp } from 'vue'
import api from './api'

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

      vueApp.config.globalProperties.$api = api;
      vueApp.use(plugin).mount(el);
    },
    ...options
  });
}