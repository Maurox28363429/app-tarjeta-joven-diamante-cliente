const clientAuthMeta = { requiresAuth: true, role: "cliente" };
const bussinesAuthMeta = { requiresAuth: true, role: "empresa" };

const routes = [
  {
    path: "/",
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        name: "forgotpassword",
        path: "forgotpassword",
        component: () => import("pages/ForgotpasswordPage.vue"),
      },
      {
        name: "register",
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        name: "recoveryPassword",
        path: "recoveryPassword",
        component: () => import("pages/RecoverypasswordPage.vue"),
      },
      {
        path: "cliente",
        meta: clientAuthMeta,
        component: () => import("layouts/MainClientLayout.vue"),
        children: [
          {
            name: "Offers",
            path: "Offers/:countryName",
            component: () => import("src/pages/client/OffersPage.vue"),
          },
          {
            path: "OffersForUniversitys/:countryName",
            component: () => import("src/pages/client/OffersForUniversity.vue"),
          },
          {
            path: "Offers",
            component: () =>
              import("src/pages/client/SelectStateForffersPage.vue"),
            props: { typeOffers: "Offers" },
          },
          {
            path: "services/:countryName",
            component: () => import("src/pages/client/ServicesPage.vue"),
          },
          {
            path: "services",
            component: () =>
              import("src/pages/client/SelectStateForffersPage.vue"),
            props: { typeOffers: "services" },
          },
          {
            path: "OffersForUniversitys",
            component: () =>
              import("src/pages/client/SelectStateForffersPage.vue"),
            props: { typeOffers: "OffersForUniversitys" },
          },
          {
            path: "pachama",
            component: () => import("pages/client/PachamaPage.vue"),
          },
          {
            path: "contact",
            component: () => import("pages/client/ContactPage.vue"),
          },
          {
            path: "memberships-type",
            component: () => import("pages/client/MembershipsTypePage.vue"),
          },
          {
            path: "",
            component: () => import("pages/client/HomePage.vue"),
          },
          {
            path: "home",
            component: () => import("pages/client/HomePage.vue"),
          },
          {
            path: "account",
            children: [
              {
                path: "",
                component: () => import("components/UserAccount.vue"),
                props: { user: "client" },
              },
              {
                path: "profile",
                component: () => import("components/ProfileComponent.vue"),
                props: { user: "client" },
              },
            ],
          },
          {
            name: "transactionsTable",
            path: "transactionsTable",
            component: () => import("components/TransactionsTable.vue"),
          },
          {
            name: "promotions",
            path: "promotions",
            component: () => import("pages/client/PromotionsPage.vue"),
          },
          {
            name: "news",
            path: "news",
            component: () => import("pages/client/NewsPage.vue"),
          },
        ],
      },
      {
        path: "empresa",
        meta: bussinesAuthMeta,
        component: () => import("layouts/MainBussinesLaout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/components/TransactionsTable.vue"),
          },
          {
            path: "account",
            children: [
              {
                path: "",
                component: () => import("components/UserAccount.vue"),
                props: { user: "business" },
              },
              {
                path: "profile",
                component: () => import("components/ProfileComponent.vue"),
                props: { user: "business" },
              },
            ],
          },
          {
            name: "orders",
            path: "orders",
            component: () => import("components/TransactionsTable.vue"),
          },
          {
            name: "create-order",
            path: "create-order",
            component: () => import("pages/business/CreateOrderPage.vue"),
          },
        ],
      },
      {
        path: "memberships",
        meta: clientAuthMeta,
        children: [
          {
            path: "",
            component: () => import("pages/client/MembershipsPage.vue"),
            meta: clientAuthMeta,
          },
        ],
      },
      {
        path: "memberships/:id",
        component: () => import("pages/client/PaymentPage.vue"),
        meta: clientAuthMeta,
        beforeEnter: (to, from, next) => {
          if (isNaN(parseInt(to.params.id))) {
            next({ name: "error", params: { errorCode: 400 } });
          } else {
            next();
          }
        },
      },
    ],
  },
  {
    name: "error",
    path: "/error/:errorCode",
    component: () => import("pages/ErrorNotFound.vue"),
    props: true,
  },
];

export default routes;
