<template lang="html">
  <base-spinner :show="isLoading"></base-spinner>
  <toast-message
    :type="isSuccessMsg"
    :msg="toastMsg"
    :show="errorOccured"
  ></toast-message>
  <div class="w-full">
    <!-- Carousel -->
    <div class="w-full">
      <flickity ref="flickity" :options="flickityOptions">
        <carousel-cell
          @loading="setIsLoading"
          @toast="displayToast"
          v-for="(cell, i) in carouselCells"
          :id="cell.id"
          :imageURL="cell.image"
          :title="cell.title"
          :tag="cell.tag"
          :description="cell.description"
          :key="i"
        ></carousel-cell>
      </flickity>
    </div>

    <!-- Collections -->
    <section class="my-16">
      <collection
        class="m-4 md:m-10 px-8 sm:px-0 flex flex-col md:flex-row justify-evenly h-96"
        @loading="setIsLoading"
        @toast="displayToast"
        v-for="cell in collections"
        :key="cell.id"
        :id="cell.id"
        :image="cell.image"
        :title="cell.title"
        :description="cell.description"
        :reverse="ind % 2 === 0"
      >
      </collection>
    </section>

    <!-- New Arrivals -->
    <new-arrivals-grid
      :newArrivals="newArrivals"
      v-if="this.newArrivals.length > 0"
    />

    <!-- Instagram -->
    <div class="grid lg:grid-cols-3 lg:grid-rows-1">
      <div class="col-span-2 grid grid-flow-col grid-cols-3 grid-rows-2 sm:m-0">
        <insta-item
          @loading="setIsLoading"
          @toast="displayToast"
          v-for="cell in instaImages"
          :key="`${cell.id}`"
          :id="cell.id"
          :image="cell.image"
        ></insta-item>
      </div>
      <div
        class="self-center md:m-10 m-5 sm:m-10"
        v-if="this.instaImages.length > 0"
      >
        <h1 class="font-extrabold font-serif text-5xl mb-5 text-gray-800 ">
          Instagram
        </h1>
        <p class="font-sans text-base mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          scelerisque rutrum ultrices.
        </p>
        <a href="https://instagram.com/fashion.o.phile" class="font-extrabold font-mono text-4xl text-gray-400 hover:opacity-80 my-10">
          @fashion.o.phile
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from "../components/home/Flickity.vue";
import CarouselCell from "../components/home/CarouselCell.vue";
import Collection from "../components/home/Collection.vue";
import NewArrivalsGrid from "../components/home/NewArrivals/NewArrivalsGrid.vue";
import InstaItem from "../components/home/InstaItem.vue";

export default {
  name: "App",
  components: {
    Flickity,
    CarouselCell,
    Collection,
    NewArrivalsGrid,
    InstaItem
  },
  data() {
    return {
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false,
      isLoading: false,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        autoPlay: 2500
      },
      carouselCells: [],
      collections: [],
      newArrivals: [],
      instaImages: []
    };
  },
  computed: {
    isAdmin() {
      return JSON.parse(localStorage.getItem("user"))
        ? this.$store.getters["user/getRole"] ||
            JSON.parse(localStorage.getItem("user")).is_admin
        : false;
    }
  },
  methods: {
    setIsLoading(value) {
      this.isLoading = value;
    },
    displayToast({ isSuccessMsg, msg }) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
      this.$refs.flickity.destroy();
      this.$refs.flickity.init();
    }
  },
  async created() {
    this.isLoading = true;
    const slides = await this.$store.dispatch("carousel/getAllSlides");
    const collections = await this.$store.dispatch(
      "collections/getAllCollections"
    );
    const instaItems = await this.$store.dispatch("instagram/getAllItems");
    const products = await this.$store.dispatch("products/getAllProducts");
    this.newArrivals = products
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        return 0;
      })
      .slice(0, 4);
    this.carouselCells = slides;
    this.collections = collections;
    this.instaImages = instaItems
      .sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        return 0;
      })
      .slice(0, 6);
    this.$nextTick(() => {
      this.$refs.flickity.destroy();
      this.$refs.flickity.init();
      this.isLoading = false;
    });
  }
};
</script>
<style>
.carousel-cell {
  align-items: center;
  padding-right: 10px;
  display: flex;
  font-size: 32px;
  height: 520px;
  justify-content: center;
  width: 1050px;
}

.is-selected .carousel-text {
  display: block;
}
</style>
