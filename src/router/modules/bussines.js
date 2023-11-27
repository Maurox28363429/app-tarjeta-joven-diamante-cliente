const BUSSINES = [
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
];

export default BUSSINES;
