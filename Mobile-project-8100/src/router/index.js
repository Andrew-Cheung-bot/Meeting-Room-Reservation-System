import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: "/",
    redirect: "/library/main",
  },
  {
    path: "/library/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/library/main",
      },
      {
        path: "main",
        component: () => import("@/views/StatusPage.vue"),
      },
      {
        path: "booking",
        component: () => import("@/views/BookingPage.vue"),
      },
      {
        path: "home",
        component: () => import("@/views/HomePage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
