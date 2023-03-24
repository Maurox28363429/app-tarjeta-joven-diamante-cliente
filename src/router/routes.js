const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/loginPage.vue') },
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      {
        path: 'memberships',
        component: () => import('pages/MembershipsPage.vue')
      },
      {
        path: 'payment',
        component: () => import('pages/PaymentPage.vue')
      },
      {
        path: 'home',
        component: () => import('src/pages/HomePage.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/DashboardPage.vue')
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
