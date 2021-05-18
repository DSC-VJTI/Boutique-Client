<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div class="flex flex-col justify-center items-center">
        <astronaut></astronaut>
      </div>
      <div class="flex flex-col justify-center pb-16 px-10">
        <h1 class="font-extrabold text-gray-800 text-15xl">404</h1>
        <h2 class="text-green-500 text-6xl lg:text-7xl pb-5">Hmm..</h2>
        <p class="lg:text-2xl font-light text-gray-800">
          It looks like one of the developers fell asleep.<br />
          How you got here is a mystery. <br />
          But you can go back
          <router-link
            to="/"
            class="text-green-500 hover:text-green-400 font-semibold"
            >home</router-link
          >
          .
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Astronaut from "../components/Astronaut.vue";
export default {
  components: { Astronaut }
};
</script>

<style scoped>
.text-15xl {
  font-size: 12rem;
}
</style>
