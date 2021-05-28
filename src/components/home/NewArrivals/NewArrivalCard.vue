<template>
  <div class="col-span-1 w-11/12 my-4 productCard shadow-lg hover:opacity-90">
    <router-link :to="`/shop/${id}`">
      <div class="pt-2 relative h-64 w-full">
        <div
          class="productImage"
          :style="{ backgroundImage: `url(${image})` }"
        ></div>
      </div>
      <div class="p-4 relative">
        <router-link
          title="Product 1"
          :to="`/shop/${id}`"
          class="text-gray-900 text-2xl font-medium mb-1 transition-all duration-300"
          >{{ name }}</router-link
        >
        <div class="text-lg font-bold text-right">
          <div>
            <strike
              v-if="isDiscounted"
              class="text-gray-400 text-md font-light"
            >
              ₹ {{ price }} </strike
            >&nbsp;&nbsp;
            <span class="text-3xl font-light">₹ {{ discountPrice }}</span>
          </div>
        </div>
      </div>
    </router-link>
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
