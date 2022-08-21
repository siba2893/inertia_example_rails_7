import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePage } from './pages'
import { h, createApp, createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import api from './api'

import PrimeVue from 'primevue/config';

const router = createRouter({
  history: createWebHistory(),
  routes: []
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

      vueApp.config.globalProperties.$api = api;
      vueApp.use(PrimeVue)
      vueApp.use(plugin)
      vueApp.use(router)
      vueApp.mount(el);
    },
    ...options
  });
}