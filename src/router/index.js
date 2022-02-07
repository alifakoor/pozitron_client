import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "SignUp",
    component: () => import("../views/TheSignUp.vue"),
  },
  {
    path: "/panel/:userId",
    name: "panel",
    component: () => import("../views/ThePanel.vue"),
    children: [
      {
        path: "Dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/products/TheCreateFactor.vue"),
      },
      {
        path: "About",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import("../views/TheAbout.vue"),
      },
      {
        path: "Factors",
        name: "factors",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/products/TheFactorList.vue"),
      },
      {
        path: "Setting",
        name: "setting",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import("../views/TheHome.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("../views/products/TheProductTable.vue"),
      },
      {
        path: "create",
        name: "createProduct",
        component: () => import("../views/products/TheCreateProduct.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
