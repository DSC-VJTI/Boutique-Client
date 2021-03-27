<template>
  <div>
    <nav class="p-4 flex flex-wrap content-evenly text-right">
      <router-link to="/"
        ><img src="./assets/logo.png" class="w-7 h-7" alt=""
      /></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link v-if="isAdmin" to="/admin/register">Add Admin</router-link>
      <router-link v-if="isAdmin" to="/blogs/new">Create Blog</router-link>
      <button
        v-if="isAdmin"
        @click="logout"
        class="focus:outline-none text-lg text-green-900 p-3 mb-1"
      >
        Logout
      </button>
    </nav>
    <div class="p-5 m-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      console.log(this.$store.getters["user/isAuthenticated"]);
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
