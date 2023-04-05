const clientAuthMeta = { requiresAuth: true, role: 'client' }

const routes = [
  {
    path: '/',
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('pages/loginPage.vue')
      },
      {
        name: 'forgotpassword',
        path: 'forgotpassword',
        component: () => import('pages/forgotpasswordPage.vue')
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('pages/RegisterPage.vue')
      },
      {
        name: 'recoveryPassword',
        path: 'recoveryPassword',
        component: () => import('pages/RecoverypasswordPage.vue')
      },
      {
        path: 'memberships',
        meta: clientAuthMeta,
        children: [
          {
            path: '',
            component: () => import('pages/MembershipsPage.vue'),
            meta: clientAuthMeta
          }
        ]
      },
      {
        path: 'memberships/:id',
        component: () => import('pages/PaymentPage.vue'),
        meta: clientAuthMeta,
        beforeEnter: (to, from, next) => {
          if (isNaN(parseInt(to.params.id))) {
            next({ name: 'error', params: { errorCode: 400 } })
          } else {
            next()
          }
        }
      },
      {
        path: '/',
        component: () => import('src/pages/HomePage.vue'),
        meta: clientAuthMeta,
        children: [
          {
            name: 'products',
            path: 'products',
            component: () => import('pages/ProductsPage.vue'),
            meta: clientAuthMeta
          },
          {
            path: '',
            component: () => import('pages/ProductsPage.vue'),
            meta: clientAuthMeta
          },
          {
            name: 'membershipsHome',
            path: 'membershipsHome',
            component: () => import('pages/MembershipsPage.vue'),
            meta: clientAuthMeta
          },
          {
            path: 'account',
            meta: clientAuthMeta,
            children: [
              {
                name: 'account',
                path: '',
                component: () => import('src/pages/AccountPage.vue')
              },
              {
                name: 'profile',
                path: 'profile',
                component: () => import('src/pages/ProfilePage.vue')
              }
            ]
          },
          {
            name: 'shopping',
            path: 'shopping',
            component: () => import('pages/ShoppingPage.vue'),
            meta: clientAuthMeta
          },
          {
            name: 'store',
            path: 'store',
            component: () => import('pages/StorePage.vue'),
            meta: clientAuthMeta
          },
          {
            name: 'news',
            path: 'news',
            component: () => import('pages/NewsPage.vue'),
            meta: clientAuthMeta
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'error',
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
