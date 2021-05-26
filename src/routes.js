import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Credits from "@/pages/Credits.vue";
import NotFound from "@/pages/Error404.vue";

import Login from "./pages/admin/Login.vue";
import Register from "./pages/admin/Register.vue";

import CreateBlog from "./pages/blogs/CreateBlog.vue";
import BlogsList from "./pages/blogs/BlogsList.vue";
import ViewBlog from "./pages/blogs/ViewBlog.vue";
import UpdateBlog from "./pages/blogs/UpdateBlog.vue";

import Products from "./pages/products/Products.vue";
import SingleProduct from "./pages/products/SingleProduct.vue";
import CreateProduct from "./pages/products/CreateProduct.vue";
import UpdateProduct from "./pages/products/UpdateProduct.vue";

import CreateCategory from "./pages/categories/CreateCategory.vue";
import CreateSubcategory from "./pages/categories/CreateSubCategory.vue";
import ViewCatSubcat from "./pages/categories/ViewCatSubcat.vue";
import UpdateCategory from "./pages/categories/UpdateCategory.vue";
import UpdateSubcategory from "./pages/categories/UpdateSubcategory.vue";

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
    { path: "/credits", component: Credits },

    // admin login
    { path: "/admin/login", component: Login },
    // creating new admin
    { path: "/admin/register", component: Register },
    // viewing blogs
    {
      name: "seeBlogs",
      path: "/blogs",
      component: BlogsList
    },
    // creating a blog
    {
      path: "/blogs/new",
      component: CreateBlog
    },
    // viewing single blog
    {
      name: "seeBlog",
      path: "/blogs/:blogId",
      component: ViewBlog,
      props: true
    },
    // updating a blog
    {
      path: "/blogs/update/:blogId",
      component: UpdateBlog,
      props: true
    },

    // Measurements
    { path: "/measurements", component: Measurements, name: "seeMeasurements" },
    { path: "/measurements/new", component: CreateMeasurement },
    {
      path: "/measurements/:mId/update",
      component: UpdateMeasurement,
      props: true
    },
    { path: "/measurements/:mId", component: ViewMeasurement, props: true },

    // Materials
    { path: "/costlist", component: Materials, name: "seeMaterials" },
    { path: "/costlist/new", component: CreateMaterial },
    {
      path: "/costlist/:materialId/update",
      component: UpdateMaterial,
      props: true
    },
    { path: "/costlist/:materialId", component: ViewMaterial, props: true },

    // Products Page
    {
      name: "viewProducts",
      path: "/shop",
      component: Products
    },
    // Single Product Page
    {
      name: "viewProduct",
      path: "/shop/:productId",
      component: SingleProduct,
      props: true
    },
    // Add Product Page
    {
      path: "/shop/new",
      component: CreateProduct
    },
    // updating product info
    {
      path: "/shop/update/:productId",
      component: UpdateProduct,
      props: true
    },
    {
      path: "/categories",
      component: ViewCatSubcat
    },
    {
      path: "/category/new",
      component: CreateCategory
    },
    {
      path: "/subcategory/new",
      component: CreateSubcategory
    },
    {
      name: "ModifyCat",
      path: "/category/update/:cat_id",
      component: UpdateCategory,
      props: true
    },
    {
      name: "ModifySubcat",
      path: "/subcategory/update/:subcat_id",
      component: UpdateSubcategory,
      props: true
    },

    // 404
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
});

export default router;
