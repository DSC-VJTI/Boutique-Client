<template>
  <div class="col-span-1 w-11/12 my-4 productCard shadow-lg">
    <div class="pt-2 relative h-64 w-full">
      <router-link :to="`/shop/${id}`">
        <div
          class="productImage"
          :style="{ backgroundImage: `url(${images[0]})` }"
        ></div>
      </router-link>
    </div>
    <div class="p-4 relative">
      <router-link
        title="Product 1"
        :to="`/shop/${id}`"
        class="text-gray-900 text-2xl font-medium mb-1 transition-all duration-300"
        >{{ name }}</router-link
      >
      <div class="mt-2 text-lg font-bold">
        <div class="text-base text-gray-600 font-normal mb-3">
          {{ description.substring(0, 30) + "..." }}
        </div>
        <div>
          <span class="text-3xl font-light">₹ {{ discount_price }}</span> &nbsp;&nbsp;
          <strike v-if="isDiscounted" class="text-gray-400 text-md font-light">
            ₹ {{ price }}
          </strike>
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
