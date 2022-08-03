import { renderToString } from '@vue/server-renderer'
import createServer from '@inertiajs/server'
import { buildApp } from '../app'

createServer((page) => buildApp({
  page,
  render: renderToString
}))