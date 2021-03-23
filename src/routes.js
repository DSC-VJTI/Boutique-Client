import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";

import Login from "./pages/admin/Login.vue";
import Register from "./pages/admin/Register.vue";
import AdminDash from "./pages/admin/AdminDash.vue";

import createBlog from "./pages/blogs/createBlog.vue";
import blogsList from "./pages/blogs/blogsList.vue";
import viewBlog from "./pages/blogs/viewBlog.vue";
import updateBlog from "./pages/blogs/updateBlog.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },

    // admin login
    {
      path: "/admin/login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (
          localStorage.getItem("isAuthenticated") &&
          localStorage.getItem("isAuthenticated") === true
        ) {
          next("/admin");
        } else next();
      }
    },

    // admin dashboard
    {
      path: "/admin",
      component: AdminDash,
      beforeEnter: (to, from, next) => {
        if (
          !localStorage.getItem("isAuthenticated") ||
          localStorage.getItem("isAuthenticated") === false
        ) {
          next("/admin/login");
        } else {
          next();
        }
      }
    },

    // creating new admin
    {
      path: "/admin/register",
      component: Register,
      beforeEnter: (to, from, next) => {
        if (
          !localStorage.getItem("isAuthenticated") ||
          localStorage.getItem("isAuthenticated") === false
        ) {
          next("/admin/login");
        } else {
          next();
        }
      }
    },

    // logout
    {
      path: "/logout",
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("user")) localStorage.removeItem("user");
        if (localStorage.getItem("isAuthenticated"))
          localStorage.removeItem("isAuthenticated");
        if (localStorage.getItem("rememberMe"))
          localStorage.removeItem("rememberMe");
        next("/");
      }
    },

    // viewing blogs
    {
      name: "seeBlogs",
      path: "/blogs",
      component: blogsList
    },

    // creating a blog
    {
      path: "/blogs/new",
      component: createBlog,
      beforeEnter: (to, from, next) => {
        if (
          !localStorage.getItem("isAuthenticated") ||
          localStorage.getItem("isAuthenticated") === false
        ) {
          next("/admin/login");
        } else {
          next();
        }
      }
    },

    // viewing single blog
    {
      name: "seeBlog",
      path: "/blogs/:blogId",
      component: viewBlog
    },

    // updating a blog
    {
      path: "/blogs/update/:blogId",
      component: updateBlog
    }
  ]
});

export default router;
