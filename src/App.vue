<template>
  <div>
    <nav class="pr-4 pl-4 pt-4 flex flex-wrap content-evenly text-right">
      <router-link to="/"
        ><img src="./assets/logo.png" class="w-7 h-7" alt=""
      /></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link v-if="isAdmin" to="/admin/register">Add Admin</router-link>
      <router-link v-if="isAdmin" to="/blogs/new">Create Blog</router-link>
      <button
        v-if="isAdmin"
        @click="logout"
        class="focus:outline-none font-medium text-green-900 p-3"
      >
        Logout
      </button>
    </nav>
    <div class="p-0 m-0">
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
  @apply text-green-900;
}
</style>
