import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Home"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/components/Signup"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/NotFound"),
  },
  {
    path: "/add-resturant",
    name: "AddResturant",
    component: () => import("@/views/Add.vue"),
  },
  {
    path: "/update-resturant",
    name: "UpdateResturant",
    component: () => import("@/views/Add.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
