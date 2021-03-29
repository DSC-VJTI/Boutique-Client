import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";

import Login from "./pages/admin/Login.vue";
import Register from "./pages/admin/Register.vue";
import AdminDash from "./pages/admin/AdminDash.vue";

import createBlog from "./pages/blogs/CreateBlog.vue";
import blogsList from "./pages/blogs/BlogsList.vue";
import viewBlog from "./pages/blogs/ViewBlog.vue";
import updateBlog from "./pages/blogs/UpdateBlog.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    // admin login
    { path: "/admin/login", component: Login },
    // admin dashboard
    { path: "/admin", component: AdminDash },
    // creating new admin
    { path: "/admin/register", component: Register },
    // viewing blogs
    {
      name: "seeBlogs",
      path: "/blogs",
      component: blogsList
    },
    // creating a blog
    {
      path: "/blogs/new",
      component: createBlog
    },
    // viewing single blog
    {
      name: "seeBlog",
      path: "/blogs/:blogId",
      component: viewBlog,
      props: true
    },
    // updating a blog
    {
      path: "/blogs/update/:blogId",
      component: updateBlog,
      props: true
    }
  ]
});

export default router;
