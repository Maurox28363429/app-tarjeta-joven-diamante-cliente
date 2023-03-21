const routes = [
  {
    path: '/',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/loginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') }
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
