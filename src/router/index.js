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
        // component: () => import("../views/TheAbout.vue"),
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
        path: "Home",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import("../views/TheHome.vue"),
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
        children: [
          {
            path: "create",
            name: "product.create",
            component: () => {},
          },
          // {
          //   path: ":id/update",
          //   name: "product.update",
          //   component: () => {},
          // },
          // {
          //   path: ":id/delete",
          //   name: "product.delete",
          // },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
