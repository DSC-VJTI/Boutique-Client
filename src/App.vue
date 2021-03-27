<template>
  <div>
    <nav class="p-4 flex flex-wrap content-evenly text-right">
      <router-link to="/"
        ><img src="./assets/logo.png" class="w-7 h-7" alt=""
      /></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link v-show="isAdmin" to="/admin/register">Add Admin</router-link>
      <router-link v-show="isAdmin" to="/blogs/new">Create Blog</router-link>
      <router-link v-show="isAdmin" to="/logout">Logout</router-link>
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
      return JSON.parse(localStorage.getItem("isAuthenticated"));
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
