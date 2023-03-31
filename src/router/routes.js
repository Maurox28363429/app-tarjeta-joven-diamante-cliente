const routes = [
  {
    path: '/',
    children: [
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      {
        path: 'memberships',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: () => import('pages/MembershipsPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'free',
            component: () => import('pages/PaymentPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'pro',
            component: () => import('pages/PaymentPage.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: '',
        component: () => import('src/pages/HomePage.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: 'products',
            component: () => import('pages/ProductsPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'membershipsHome',
            component: () => import('pages/MembershipsPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'account',
            component: () => import('pages/AccountPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'shopping',
            component: () => import('pages/ShoppingPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'store',
            component: () => import('pages/StorePage.vue'),
            meta: { requiresAuth: true }
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
