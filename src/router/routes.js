import CUSTOMER from 'src/router/modules/customer';
import BUSSINES from 'src/router/modules/bussines';
import ADMIN from 'src/router/modules/admin';

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
        children: CUSTOMER,
      },
      {
        path: 'empresa',
        meta: bussinesAuthMeta,
        component: () => import('layouts/MainBussinesLaout.vue'),
        children: BUSSINES,
      },
      {
        path: 'admin',
        meta: adminAuthMeta,
        component: () => import('layouts/MainAndminLayout.vue'),
        children: ADMIN,
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
