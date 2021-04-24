<template>
  <div class="col-span-1 w-64">
    <div class="pt-2 relative h-64 w-64">
      <router-link :to="`/shop/${id}`">
        <div
          class="productImage"
          style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-2.jpg')"
        ></div>
      </router-link>
    </div>
    <div class="pt-2 relative mb-10">
      <router-link
        title="Product 1"
        :to="`/shop/${id}`"
        class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
        >{{ name }}</router-link
      >
      <h5 class="text-gray-800 text-xl font-bold">
        Rs. {{ discount_price
        }}<strike
          v-if="isDiscounted"
          class="text-gray-400 text-lg ml-5 font-light"
          >Rs. {{ price }}</strike
        >
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "price", "discount_price"],
  computed: {
    isDiscounted() {
      return this.price !== this.discount_price;
    }
  }
};
</script>
