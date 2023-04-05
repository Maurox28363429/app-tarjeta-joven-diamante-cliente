import { route } from 'quasar/wrappers'
import localStorageAuth from 'src/utils/localStorageAuth'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  const roles = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 3,
      name: 'cliente'
    },
    {
      id: 2,
      name: 'empresa'
    }
  ]

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Verificar si el usuario está autenticado
      const user = localStorageAuth.getUser()

      if (user === null) {
        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        next({ path: '/login' })
      } else {
        // Verificar si la ruta tiene un rol asignado
        const routeRoleName = to.matched.find((record) => record.meta.role)
          ?.meta.role
        const routeRole = roles.find((role) => role.name === routeRoleName)

        if (routeRole && user.role_id !== routeRole.id) {
          // Si el rol del usuario no coincide con el rol de la ruta, redirigir a una página de error o de acceso denegado
          next({ name: 'error', params: { errorCode: 403 } })
        } else {
          // Si el usuario está autenticado y su rol coincide con el rol de la ruta, permitir el acceso a la ruta
          next()
        }
      }
    } else {
      // Si la ruta no requiere autenticación, permitir el acceso
      next()
    }
  })

  return Router
})
