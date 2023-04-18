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
            name: "products",
            path: "products",
            component: () => import("pages/client/ProductsPage.vue"),
          },
          {
            path: "",
            component: () => import("pages/client/ProductsPage.vue"),
          },
          {
            path: "account",
            children: [
              {
                path: "",
                component: () => import("pages/client/AccountPage.vue"),
              },
              {
                path: "profile",
                component: () => import("pages/client/ProfilePage.vue"),
              },
            ],
          },
          {
            name: "shopping",
            path: "shopping",
            component: () => import("pages/ShoppingPage.vue"),
          },
          {
            name: "store",
            path: "store",
            component: () => import("pages/client/StorePage.vue"),
          },
          {
            name: "news",
            path: "news",
            component: () => import("pages/client/PromotionsPage.vue"),
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
            component: () => import("pages/ShoppingPage.vue"),
          },
          {
            path: "account",
            children: [
              {
                path: "",
                component: () => import("pages/business/AccountPage.vue"),
              },
              {
                name: "profile",
                path: "profile",
                component: () => import("pages/business/ProfilePage.vue"),
              },
            ],
          },
          {
            name: "orders",
            path: "orders",
            component: () => import("pages/ShoppingPage.vue"),
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
      {
        path: "memberships/:id/payment",
        component: () => import("pages/client/PaymentFormPage.vue"),
        meta: clientAuthMeta,
      },
    ],
  },
  {
    name: "error",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
