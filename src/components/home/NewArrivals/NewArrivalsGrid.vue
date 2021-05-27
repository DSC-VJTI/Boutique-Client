<template>
  <section class="bg-gray-100 py-5 px-10">
    <h1
      class="font-extrabold font-serif text-2xl sm:text-3xl md:text-5xl text-center text-black my-10"
    >
      New Arrivals
    </h1>
    <div
      class="grid grid-flow-row grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-8 gap-8"
    >
      <new-arrival-card
        v-for="p in newArrivals"
        :key="p.id"
        :id="p.id"
        :name="p.name"
        :price="p.price"
        :discountPrice="p.discount_price !== 0 ? p.discount_price : p.price"
        :image="p.images[0]"
        :description="p.description"
      />
    </div>
  </section>
</template>

<script>
import NewArrivalCard from "./NewArrivalCard.vue";
export default {
  components: {
    NewArrivalCard
  },
  props: {
    newArrivals: Array
  },
  created() {
    console.log(this.newArrivals);
  }
};
</script>
