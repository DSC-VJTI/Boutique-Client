<template>
  <div class="col-span-1 w-64 my-4 productCard shadow-lg">
    <div class="pt-2 relative h-64 w-64">
      <router-link :to="`/shop/${id}`">
        <div
          class="productImage"
          :style="{ backgroundImage: `url(${images[0]})` }"
        ></div>
      </router-link>
    </div>
    <div class="p-3 relative">
      <router-link
        title="Product 1"
        :to="`/shop/${id}`"
        class="text-gray-900 text-2xl font-medium mb-1 transition-all duration-300"
        >{{ name }}</router-link
      >
      <div class="mt-3 text-lg font-bold h-40">
        <div class="text-base text-gray-600 font-normal mb-3">
          {{ description.substring(0, 50) + "..." }}
        </div>
        <div>
          <strike v-if="isDiscounted" class="text-gray-400 text-lg font-light"
            >M.R.P.: ₹ {{ price }}</strike
          >
        </div>
        <div>
          {{ isDiscounted ? "Discount Price" : "M.R.P" }}: ₹
          {{ discount_price }}
          <!-- <div>
            <strike4 v-if="!isDiscounted" class="text-white text-lg font-light"
              >Hidden</strike4
            >
          </div> -->
        </div>
        <div class="absolute bottom-0 py-2 left-0 w-full px-2 mx-auto">
          <button
            class="bg-gray-800 text-yellow-200 w-full py-2 rounded focus:outline-none outline-none hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "price", "discount_price", "images", "description"],
  computed: {
    isDiscounted() {
      return this.price !== this.discount_price;
    }
  }
};
</script>
