const clientAuthMeta = { requiresAuth: true, role: 'cliente' };
const bussinesAuthMeta = { requiresAuth: true, role: 'empresa' };
const adminAuthMeta = { requiresAuth: true, role: 'admin' };

const routes = [
  {
    path: '/',
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('src/pages/loginPage.vue'),
      },
      {
        path: '',
        component: () => import('src/pages/loginPage.vue'),
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('src/pages/RegisterPage.vue'),
      },
      {
        name: 'forgotpassword',
        path: 'forgotpassword',
        component: () => import('src/pages/forgotpasswordPage.vue'),
      },
      {
        name: 'recoveryPassword',
        path: 'recoveryPassword',
        component: () => import('src/pages/RecoverypasswordPage.vue'),
      },
      {
        path: 'cliente',
        meta: clientAuthMeta,
        component: () => import('src/layouts/MainClientLayout.vue'),
        children: [
          {
            name: 'Offers',
            path: 'Offers/:countryName',
            component: () => import('src/pages/client/OffersPage.vue'),
          },
          {
            path: 'OffersForUniversitys/:countryName',
            component: () =>
              import('src/pages/client/SelectUniversityPage.vue'),
          },
          {
            path: 'Offers',
            component: () =>
              import('src/pages/client/SelectStateForffersPage.vue'),
            props: { typeOffers: 'Offers' },
          },
          {
            path: 'services/:countryName',
            component: () => import('src/pages/client/ServicesPage.vue'),
          },
          {
            path: 'services',
            component: () =>
              import('src/pages/client/SelectStateForffersPage.vue'),
            props: { typeOffers: 'services' },
          },
          {
            path: 'OffersForUniversitys',
            component: () =>
              import('src/pages/client/SelectStateForffersPage.vue'),
            props: { typeOffers: 'OffersForUniversitys' },
          },
          {
            path: 'pachama',
            component: () => import('pages/client/PachamaPage.vue'),
          },
          {
            path: 'gifts',
            component: () => import('pages/client/GiftsPage.vue'),
          },
          {
            path: 'gifts/:id',
            component: () => import('pages/client/GiftDetailPage.vue'),
          },
          {
            path: 'ecommerce',
            component: () => import('pages/client/EcommercePage.vue'),
          },
          {
            path: 'sos',
            component: () => import('pages/client/SosPage.vue'),
          },
          {
            path: 'contact',
            component: () => import('pages/client/ContactPage.vue'),
          },
          {
            path: 'memberships-type',
            component: () => import('pages/client/MembershipsTypePage.vue'),
          },
          {
            path: '',
            component: () => import('pages/client/HomePage.vue'),
          },
          {
            path: 'home',
            component: () => import('pages/client/HomePage.vue'),
          },
          {
            path: 'account',
            children: [
              {
                path: '',
                component: () => import('components/UserAccount.vue'),
                props: { user: 'client' },
              },
              {
                path: 'profile',
                component: () => import('components/ProfileComponent.vue'),
                props: { user: 'client' },
              },
            ],
          },
          {
            name: 'transactionsTable',
            path: 'transactionsTable',
            component: () => import('components/TransactionsTable.vue'),
          },
          {
            name: 'promotions',
            path: 'promotions',
            component: () => import('pages/client/PromotionsPage.vue'),
          },
          {
            name: 'news',
            path: 'news',
            component: () => import('pages/client/NewsPage.vue'),
          },
        ],
      },
      {
        path: 'empresa',
        meta: bussinesAuthMeta,
        component: () => import('layouts/MainBussinesLaout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/business/DashboardPage.vue'),
          },
          {
            path: 'account',
            children: [
              {
                path: '',
                component: () => import('components/UserAccount.vue'),
                props: { user: 'business' },
              },
              {
                path: 'profile',
                component: () => import('components/ProfileComponent.vue'),
                props: { user: 'business' },
              },
            ],
          },
          {
            name: 'orders',
            path: 'orders',
            component: () => import('components/TransactionsTable.vue'),
          },
          {
            name: 'create-order',
            path: 'create-order',
            component: () => import('pages/business/CreateOrderPage.vue'),
          },
        ],
      },
      {
        path: 'admin',
        meta: adminAuthMeta,
        component: () => import('layouts/MainAndminLayout.vue'),
        children: [
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
        ],
      },
      {
        path: 'memberships',
        meta: clientAuthMeta,
        children: [
          {
            path: '',
            component: () => import('pages/client/MembershipsPage.vue'),
            meta: clientAuthMeta,
          },
        ],
      },
      {
        path: 'memberships/:id',
        component: () => import('pages/client/PaymentPage.vue'),
        meta: clientAuthMeta,
        beforeEnter: (to, from, next) => {
          if (isNaN(parseInt(to.params.id))) {
            next({ name: 'error', params: { errorCode: 400 } });
          } else {
            next();
          }
        },
      },
    ],
  },
  {
    name: 'error',
    path: '/error/:errorCode',
    component: () => import('pages/ErrorNotFound.vue'),
    props: true,
  },
];

export default routes;
