import { setupLayout } from './layout'

// NOTE: Optimize the SSR bundle by not splitting by page.
const pages = import.meta.env.SSR
  ? import.meta.globEagerDefault('./pages/**/*.vue')
  : import.meta.glob('./pages/**/*.vue')

export async function resolvePage (name) {
  let page = pages[`./pages/${ name }.vue`]

  if (!page)
    throw new Error(`Unknown page ${ name }. Is it located under Pages with a .vue extension?`)

  page = import.meta.env.SSR ? page : (await page()).default

  page = setupLayout(page, name)

  return page
}