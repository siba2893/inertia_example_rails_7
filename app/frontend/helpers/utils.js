import { Inertia } from '@inertiajs/inertia'

export const iVisitPrevent = (url, event) => {
  if (event) event.preventDefault()
  Inertia.visit(url)
}