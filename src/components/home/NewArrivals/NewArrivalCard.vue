<template>
  <div class="mb-10 shadow-xl">
    <router-link :to="`/shop/${id}`">
      <img :src="image" class="h-72 mx-auto" />
    </router-link>
    <div class="my-4 px-5">
      <div class="flex justify-between">
        <p class="font-medium text-2xl text-black">
          {{ name }}
        </p>
        <div class="mx-2">
          <strike
            v-if="isDiscounted"
            class="text-gray-400 text-3xl mr-3 font-light"
          >
            ₹ {{ price }}
          </strike>
          <span class="text-3xl font-light">₹ {{ discountPrice }}</span>
        </div>
      </div>
      <!-- <div class="flex justify-between mt-5 mb-3 align-middle">
        <router-link
          class="mx-0 bg-gray-900 w-full text-center text-xl text-white py-2 px-4 hover:bg-gray-50 hover:text-gray-900 
        border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          :to="`/shop/${id}`"
          >View More</router-link
        >
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    image: String,
    name: String,
    price: Number,
    discountPrice: Number,
    description: String
  },
  computed: {
    isDiscounted() {
      return this.price !== this.discountPrice;
    }
  }
};
</script>
