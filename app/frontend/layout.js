import AuthLayout from '~/layouts/AuthLayout.vue'
import MainLayout from '~/layouts/MainLayout.vue'

export const setupLayout = (page, name) => {
  if (page.layout === undefined) {
    if (name.startsWith('auth/')) {
      page.layout = AuthLayout
    } else {
      page.layout = MainLayout
    }
  }

  return page
}