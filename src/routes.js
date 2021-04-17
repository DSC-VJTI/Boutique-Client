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

import Products from "./pages/products/Products.vue";
import SingleProduct from "./pages/products/SingleProduct.vue";

import Measurements from "./pages/measurements/Measurements.vue";
import CreateMeasurement from "./pages/measurements/CreateMeasurement.vue";
import UpdateMeasurement from "./pages/measurements/UpdateMeasurement.vue";
import ViewMeasurement from "./pages/measurements/ViewMeasurement.vue";

import Materials from "./pages/materials/Materials.vue";
import CreateMaterial from "./pages/materials/CreateMaterials.vue";
import ViewMaterial from "./pages/materials/ViewMaterial.vue";
import UpdateMaterial from "./pages/materials/UpdateMaterial.vue";

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
    },
    // Products Page
    { path: "/shop", component: Products },
    // Single Product Page
    { path: "/shop/singleproduct", component: SingleProduct },

    // Measurements
    { path: "/measurements", component: Measurements},
    // Create Measurements
    { path: "/measurements/new", component: CreateMeasurement},
    // Update a Measurement
    { path: "/measurements/update/1", component: UpdateMeasurement, props: true},
    // View a single Measurement
    { path: "/measurements/1", component: ViewMeasurement, props: true},
    
    // Materials
    { path: "/materials", component: Materials},
    // Create Material
    { path: "/materials/new", component: CreateMaterial},
    // Update a Material
    { path: "/materials/update/1", component: UpdateMaterial, props: true},
    // View a single Material
    { path: "/materials/1", component: ViewMaterial, props: true},
  ]
});

export default router;
