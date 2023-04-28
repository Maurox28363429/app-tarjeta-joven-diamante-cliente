import { VueQueryPlugin } from '@tanstack/vue-query'

export default async ({ app }) => {
  // Configura e inicializa el plugin VueQueryPlugin
  app.use(VueQueryPlugin)
}
