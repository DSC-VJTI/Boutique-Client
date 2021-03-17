<template>
  <div>
    <nav class="p-4 flex flex-wrap content-evenly">
      <router-link to="/"
        ><img src="./assets/logo.png" class="w-7 h-7" alt=""
      /></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <div class="p-5 m-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
nav a {
  @apply p-3;
  @apply font-medium;
  @apply text-blue-900;
}
</style>
