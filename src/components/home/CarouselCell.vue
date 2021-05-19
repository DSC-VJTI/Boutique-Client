<template>
  <div class="carousel-cell">
    <img :src="imageURL" />
    <div class="carousel-text hidden absolute sm:inset-y-1/3 left-50 md:left-10 w-1/3 sm:w-6/12">
      <p class="text-red-300 text-base font-mono p-2 tracking-widest">
        CLOTHING COLLECTION
      </p>
      <h1 class="font-extrabold font-serif text-5xl text-white mb-5">
        Spring - Summer Collection 2021
      </h1>
      <p class="font-sans text-base text-white mb-5">
        A specialist label creating luxury essentials. Ethically crafted with an
        unwavering commitment to exceptional quality.
      </p>
      <button class="bg-black text-white text-sm font-mono p-3 hover:shadow-xl">
        SHOP NOW ->
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["imageURL"]
};
</script>
