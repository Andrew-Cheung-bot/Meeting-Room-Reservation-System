// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        redirect: "status",
      },
      {
        path: "status",
        name: "status",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/StatusPage.vue"),
      },
      {
        path: "booking",
        name: "booking",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/BookingPage.vue"),
      },
      {
        path: "home",
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/HomePage.vue"),
      },
      {
        path:"/login",
        name:"login",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/LoginPage.vue"),
        
      },
      {
        path:"/signup",
        name:"signup",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/SignupPage.vue"),
        
      },
    ],
  },   
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
