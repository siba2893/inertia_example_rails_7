import '../styles/application.css';

import { createApp, h } from 'vue';

import { Inertia } from '@inertiajs/inertia';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init();

const pages = import.meta.globEagerDefault('../Pages/**/*.vue');

createInertiaApp({
  resolve: (name) => {
    const component = pages[`../Pages/${ name }.vue`];
    if (!component)
      throw new Error(
        `Unknown page ${ name }. Is it located under Pages with a .vue extension?`,
      );

    return component;
  },

  title: (title) => (title ? `${ title } - Inertia app` : 'Inertia App'),

  setup ({ el, App, props, plugin }) {
    const vueApp = createApp({
      render: () => h(App, props),
    });
    // vueApp.config.globalProperties.$api = api;
    vueApp.use(plugin).mount(el);
  },
});