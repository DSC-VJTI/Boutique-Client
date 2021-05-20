<template lang="html">
  <div class="w-full">
    <!-- Carousel -->
    <div class="w-full">
      <flickity ref="flickity" :options="flickityOptions">
        <carousel-cell
          v-for="cell in carouselCells"
          :imageURL="cell.url"
          :key="cell.id"
        ></carousel-cell>
      </flickity>
    </div>

    <div class="grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 gap-4 my-10 mx-6">
      <div class="justify-self-center">
        <img
          class="h-screen w-auto"
          src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        />
      </div>
      <div class="absolute sm:relative sm:pt-52 sm:pl-20 mt-10 ml-6">
        <h1 class="font-extrabold font-serif text-5xl text-white sm:text-black mb-5 w-full p-4">
          Spring - Summer Collection 2021
        </h1>
        <button
          class="blackButton" style="width:160px;"
        >
          SHOP NOW
        </button>
      </div>
      <div>
        <div class="absolute sm:relative sm:pt-52 sm:pl-20 mt-10 ml-6">
          <h1 class="font-extrabold font-serif text-5xl text-white sm:text-black mb-5 w-full p-4">
            Spring - Summer Collection 2021
          </h1>
          <button
            class="blackButton" style="width:160px;"
          >
            SHOP NOW
          </button>
        </div>
      </div>
      <div class="justify-self-center">
        <img
          class="h-screen"
          src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
        />
      </div>
    </div>

    <section class="bg-gray-200 p-5 sm:px-40">
      <h1
        class="font-extrabold font-serif text-4xl text-center text-black my-5"
      >
        New Arrivals
      </h1>
      <div
        class="grid grid-flow-row grid-rows-1 lg:grid-cols-4 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-4 grid-rows-8 gap-4"
      >
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
        <grid-item></grid-item>
      </div>
    </section>

    <div class="grid lg:grid-cols-3 lg:grid-rows-1 sm:px-40">
      <div class="col-span-2 grid grid-flow-col grid-cols-3 grid-rows-2 m-5 sm:m-0">
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
          #Boutique_Name
        </h1>
      </div>
    </div>

    <!-- <div></div> -->
  </div>
</template>

<script>
import Flickity from "../components/home/Flickity.vue";
import CarouselCell from "../components/home/CarouselCell.vue";
import GridItem from "../components/home/GridItem.vue";

export default {
  name: "App",
  components: {
    Flickity,
    CarouselCell,
    GridItem
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 2,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        autoPlay: 2500
      },
      carouselCells: [
        {
          id: 1,
          url:
            "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 2,
          url:
            "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 3,
          url:
            "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 4,
          url:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
        },
        {
          id: 5,
          url:
            "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
      ],
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
