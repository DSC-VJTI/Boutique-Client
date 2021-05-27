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

    <section class="my-16">
      <collection
        class="m-4 md:m-10 px-8 md:px-20 flex flex-col md:flex-row w-full justify-evenly h-96"
        @loading="setIsLoading"
        @toast="displayToast"
        v-for="(cell, ind) in collections"
        :key="ind"
        :id="cell.id"
        :image="cell.image"
        :title="cell.title"
        :description="cell.description"
        :reverse="ind % 2 === 0"
      >
      </collection>
    </section>

    <new-arrivals-grid
      :newArrivals="newArrivals"
      v-if="this.newArrivals.length > 0"
    />

    <div class="grid lg:grid-cols-3 lg:grid-rows-1 sm:px-40">
      <div class="col-span-2 grid grid-flow-col grid-cols-3 grid-rows-2 sm:m-0">
        <div v-for="image in gridImages" :key="image.id">
          <img :src="image.url" />
        </div>
      </div>
      <div class="self-center md:m-10 m-5 sm:m-10">
        <h1 class="font-extrabold font-serif text-5xl mb-5">
          Instagram
        </h1>
        <p class="font-sans text-base mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          scelerisque rutrum ultrices.
        </p>
        <h1 class="font-extrabold font-mono text-4xl text-gray-500 my-10">
          #The_Boutique
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from "../components/home/Flickity.vue";
import CarouselCell from "../components/home/CarouselCell.vue";
import Collection from "../components/home/Collection.vue";
import NewArrivalsGrid from "../components/home/NewArrivals/NewArrivalsGrid.vue";

export default {
  name: "App",
  components: {
    Flickity,
    CarouselCell,
    Collection,
    NewArrivalsGrid
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
      gridImages: [
        {
          id: 1,
          url:
            "https://images.unsplash.com/photo-1601460588655-109bd38204db?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 2,
          url:
            "https://images.unsplash.com/photo-1519167130418-c3640bd21b7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 3,
          url:
            "https://images.unsplash.com/photo-1519167130418-c3640bd21b7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 4,
          url:
            "https://images.unsplash.com/photo-1601460588655-109bd38204db?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 5,
          url:
            "https://images.unsplash.com/photo-1601460588655-109bd38204db?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        },
        {
          id: 6,
          url:
            "https://images.unsplash.com/photo-1519167130418-c3640bd21b7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        }
      ]
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
