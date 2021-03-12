import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { 
      path: "/admin", component: Home, 
      // this is not working idk why
      // children: [
      //   {
      //     path: "login",
      //     component: Login
      //   },
      //   {
      //     path: "register",
      //     component: Register,
      //   }
      // ]
    },
    { path: "/admin/login", component: Login },
    { path: "/admin/register", component: Register },
  ]
});

export default router;
