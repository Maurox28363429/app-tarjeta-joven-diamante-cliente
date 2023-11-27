const ADMIN = [
  {
    path: '',
    component: () => import('pages/admin/AdminHomePage.vue'),
  },
  {
    path: 'universities',
    component: () => import('pages/admin/UniversitiesPage.vue'),
  },
  {
    path: 'noticias',
    component: () => import('pages/admin/NewsPage.vue'),
  },
  {
    path: 'noticias_pachama',
    component: () => import('pages/admin/NewsPachamaPage.vue'),
  },
  {
    path: 'offers',
    component: () => import('pages/admin/OffersPage.vue'),
  },
  {
    path: 'membresias',
    component: () => import('pages/admin/MembresiasPage.vue'),
  },
  {
    path: 'premios',
    component: () => import('pages/admin/premiosPage.vue'),
  },
  {
    path: 'users',
    component: () => import('pages/admin/AdminUsers.vue'),
  },
  {
    path: 'create_user',
    component: () => import('pages/admin/CreateUserPage.vue'),
  },
  {
    path: 'sos',
    component: () => import('pages/admin/AdminSos.vue'),
  },
  {
    path: 'promotions',
    component: () => import('pages/admin/PromotionsPage.vue'),
  },
  {
    path: 'ecommerce',
    component: () => import('pages/admin/EcommercePage.vue'),
  },
  {
    path: 'directivos',
    component: () => import('pages/admin/DirectivosPage.vue'),
  },
  {
    path: 'ecommerceCategory',
    component: () => import('pages/admin/EcommerceCategory.vue'),
  },
  {
    path: 'ecommerceOrders',
    component: () => import('pages/admin/EcommerceOrden.vue'),
  },
  {
    path: 'settings',
    component: () => import('pages/admin/SettingsPage.vue'),
  },
];

export default ADMIN;
