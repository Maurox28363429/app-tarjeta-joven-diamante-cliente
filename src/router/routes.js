const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/loginPage.vue') },
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      {
        path: 'memberships',
        component: () => import('pages/MembershipsPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'payment',
        component: () => import('pages/PaymentPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'home',
        component: () => import('src/pages/HomePage.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            component: () => import('pages/DashboardPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'news',
            component: () => import('pages/NewsPage.vue'),
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
