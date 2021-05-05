<template>
  <div class="flex flex-col h-full">
    <nav class="pr-4 pl-4 pt-4 flex flex-wrap content-evenly text-right">
      <router-link to="/"
        ><img src="./assets/logo.png" class="w-7 h-7" alt=""
      /></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link to="/shop">Shop</router-link>
      <div v-if="isAdmin" class="dropdown">
        <button class="mt-3">
          <router-link to="/admin">Admin</router-link>
        </button>
        <div class="dropdown-content">
          <router-link to="/shop/new">Add Product</router-link>
          <router-link to="/measurements">Measurements</router-link>
          <router-link to="/materials">Materials</router-link>
          <router-link to="/admin/register">Add Admin</router-link>
          <router-link to="/blogs/new">Create Blog</router-link>
        </div>
      </div>
      <button
        v-if="isAdmin"
        @click="logout"
        class="focus:outline-none font-medium p-3"
      >
        Logout
      </button>
    </nav>
    <div class="p-0 m-0 flex-1">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  components: {
    Footer
  },
  computed: {
    isAdmin() {
      return (
        this.$store.getters["user/isAuthenticated"] ||
        JSON.parse(localStorage.getItem("isAuthenticated"))
      );
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/unauthorize");
    }
  }
};
</script>

<style>
nav a {
  @apply p-3;
  @apply font-medium;
}

.dropdown {
  float: left;
  overflow: hidden;
  border: none;
  outline: none;
}

.dropdown button {
  border: none;
  outline: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
