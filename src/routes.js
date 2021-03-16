import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import AdminDash from "./pages/AdminDash.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/login", component: Login,
      beforeEnter: (to,from,next) => {
        if(localStorage.getItem('isAuthenticated') && localStorage.getItem('isAuthenticated') === true){
            next('/admin');
        }else next();
      },
    },
    { 
      path: "/admin", component: AdminDash, 
      beforeEnter: (to,from,next) => {
        if(!localStorage.getItem('isAuthenticated') || localStorage.getItem('isAuthenticated') === false){
            next('/login');
        }else{
            next();
        }
      },
      // children: [
      //   {
      //     path: "register",
      //     component: Register,
      //   },
      // ]
    },
    {
      path: "/admin/register",
      component: Register,
      beforeEnter: (to,from,next) => {
        if(!localStorage.getItem('isAuthenticated') || localStorage.getItem('isAuthenticated') === false){
            next('/login');
        }else{
            next();
        }
      },
    },
    { 
      path: '/logout', 
      beforeEnter: (to,from,next) => {
          if(localStorage.getItem('user'))
              localStorage.removeItem('user');
          if(localStorage.getItem('isAuthenticated'))
              localStorage.removeItem('isAuthenticated');
          if(localStorage.getItem('rememberMe'))
              localStorage.removeItem('rememberMe');
          next('/');
      },
    },
  ]
});

export default router;
