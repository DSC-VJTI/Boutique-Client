<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div class="flex flex-col justify-center items-center">
        <img src="../assets/images/online-shopping.jpg" alt="">
      </div>
      <div class="flex flex-col justify-center pb-10 px-10">
        <!-- <h1 class="font-extrabold text-gray-800 text-15xl">404</h1> -->
        <h2 class="text-yellow-400 text-6xl lg:text-8xl pb-5">We Looked Everywhere.</h2>
        <p class="lg:text-2xl font-light text-gray-800">
          It looks like one of the developers went shopping.<br />
          How you got here is a mystery. <br />
          But you can go back
          <router-link
            to="/"
            class="text-yellow-400 hover:text-yellow-300 font-semibold"
            >home</router-link
          >
          .
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import Astronaut from "../components/Astronaut.vue";
export default {
  // components: { Astronaut }
};
</script>

<style scoped>
.text-15xl {
  font-size: 12rem;
}
</style>
