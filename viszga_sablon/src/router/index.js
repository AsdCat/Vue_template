import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import Register from "../components/register.vue";
import ajanlatok from "../components/ajanlatok.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
    path: "/ajanlatok",
    name: "Ajanlatok",
    component: ajanlatok,
    },
    
  ],
});

export default router;
