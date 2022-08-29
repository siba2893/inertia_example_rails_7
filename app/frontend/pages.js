const pages = import.meta.glob('./pages/**/*.jsx')

export async function resolvePage (name) {
  let page = await pages[`./pages/${ name }.jsx`]()

  if (!page)
    throw new Error(`Unknown page ${ name }. Is it located under Pages with a .jsx extension?`)

  return page
}