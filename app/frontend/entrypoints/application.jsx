// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

import '../styles/application.scss'

import React from 'react'
import axios from 'axios'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePage } from '../pages'
import { createRoot } from 'react-dom/client'

document.addEventListener('DOMContentLoaded', async () => {
  const csrfToken = document.querySelector('meta[name=csrf-token]').content;
  axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

  InertiaProgress.init();

  await createInertiaApp({
    resolve: resolvePage,
    setup({ el, App, props }) {
      createRoot(el).render(
        <App {...props} />
      )
    },
  })
})