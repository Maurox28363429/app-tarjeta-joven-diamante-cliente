const CUSTOMER = [
  {
    path: 'Offers/:countryName',
    params: { countryName: 'Panamá' },
    component: () => import('src/pages/client/OffersPage.vue'),
  },
  {
    name: 'ofertas',
    path: 'Offers/:countryName/:id',
    params: { countryName: 'Panamá' },
    component: () => import('src/pages/client/OffersPage.vue'),
  },
  {
    path: 'OffersForUniversitys/:countryName',
    params: { countryName: 'Panamá' },
    component: () => import('src/pages/client/SelectUniversityPage.vue'),
  },
  {
    name: 'universidad',
    path: 'OffersForUniversitys/:countryName/:id',
    params: { countryName: 'Panamá' },
    component: () => import('src/pages/client/SelectUniversityPage.vue'),
  },
  {
    path: 'Offers',
    component: () => import('src/pages/client/SelectStateForffersPage.vue'),
    props: { typeOffers: 'Offers' },
  },
  {
    path: 'services/:countryName',
    component: () => import('src/pages/client/ServicesPage.vue'),
  },
  {
    path: 'services',
    component: () => import('src/pages/client/SelectStateForffersPage.vue'),
    props: { typeOffers: 'services' },
  },
  {
    path: 'OffersForUniversitys',
    component: () => import('src/pages/client/SelectStateForffersPage.vue'),
    props: { typeOffers: 'OffersForUniversitys' },
  },
  {
    path: 'OffersForUniversitys',
    component: () => import('src/pages/client/SelectStateForffersPage.vue'),
    props: { typeOffers: 'OffersForUniversitys' },
  },
  {
    path: 'pachama',
    component: () => import('pages/client/PachamaPage.vue'),
  },
  {
    name: 'pachama',
    path: 'pachama/:id',
    component: () => import('pages/client/PachamaPage.vue'),
  },
  {
    path: 'gifts',
    component: () => import('pages/client/GiftsPage.vue'),
  },
  {
    name: 'premios',
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
    path: 'promotions',
    component: () => import('pages/client/PromotionsPage.vue'),
  },
  {
    name: 'promociones',
    path: 'promotions/:id',
    component: () => import('pages/client/PromotionsPage.vue'),
  },
  {
    path: 'news',
    component: () => import('pages/client/NewsPage.vue'),
  },
  {
    name: 'noticias',
    path: 'news/:id',
    component: () => import('pages/client/NewsPage.vue'),
  },
  {
    name: 'producto',
    path: 'ecommerce/:id',
    component: () => import('pages/client/productDetail.vue'),
  },
  {
    path: 'cart',
    component: () => import('pages/client/CartPage.vue'),
  },
];

export default CUSTOMER;
