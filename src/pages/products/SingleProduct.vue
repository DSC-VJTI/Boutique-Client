<template>
  <!-- Address -->
  <base-spinner :show="isLoading"></base-spinner>
  <div class="grid grid-cols-1 m-0 justify-items-center bg-gray-200">
    <div class="col-span-1">
      <div class="my-7 ml-1 sm:ml-5 inline-block">
        <a
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          href="/"
          >Home</a
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
        <a
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          href="/shop"
          >Shop</a
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
        <span class="text-sm text-gray-800 mx-4 inline-block">{{ name }}</span>
      </div>
    </div>
  </div>
  <!-- Address ends -->

  <!-- Product Images -->
  <!-- @media (min-width:768px){ height:691px; }  -->
  <div class="bg-gray-200 px-2 sm:px-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-0">
      <div
        style="height:480px; @media(min-width:768px){ height:550px; };"
        class="align-middle col-span-1 md:grid md:grid-rows-3 justify-items-center md:col-span-2 overflow-y-scroll overflow-x-hidden"
      >
        <div class="m-auto">
          <thumbnail
            v-for="(item, key) in images"
            :key="key"
            :imageURL="item"
            @click="showImgChange(key)"
          ></thumbnail>
        </div>
      </div>

      <div style="height:533px;" class="col-span-1 md:col-span-10">
        <img class="mx-auto h-full w-auto" :src="imageShow" alt="" />
      </div>
    </div>
  </div>

  <!-- Main Product Content -->
  <div
    class="grid justify-items-center grid-cols-1 px-5 pb-5 pt-0 mb-5 mt-0 md:px-10 md:py-5 md:mx-10 mx-5"
  >
    <div class="col-span-1 justify-items-center text-center">
      <h4 class="font-bold text-3xl text-gray-900 p-4 pt-0">
        {{ name }}
      </h4>
      <h3 class="font-semibold text-4xl text-gray-700 p-2 pt-6">
        Rs. {{ discount_price }}
        <strike
          v-if="isDiscounted"
          class="ml-10 text-xl self-center text-gray-400"
          >Rs. {{ price }}</strike
        >
      </h3>
      <p class="text-base font-normal text-gray-500 p-6 mx-6 md:mx-16 lg:mx-48">
        {{ description }}
      </p>

      <div class="my-4">
        <!-- Whatsapp icon with link to msg for buying -->
        <a
          style="width:350px;"
          class="px-2 mx-auto mb-5 relative block justify-self-center text-2xl text-white transform transition-all duration-300 py-2 uppercase font-semibold hover:text-green-700 bg-gray-800 hover:scale-103 hover:border-green-800 hover:bg-green-100 border rounded border-transparent"
          target="_blank"
          href="http://wa.me/91xxxxxxxxxx"
        >
          <img
            class="inline-block mr-2"
            src="https://img.icons8.com/color/36/000000/whatsapp.png"
          />
          <p class="align-middle inline-block">Contact us to Order</p>
        </a>
        <ul>
          <li class="p-2 text-black text-xl font-semibold">
            <span class="text-gray-400 uppercase font-normal text-base"
              >Product ID:</span
            >
            {{ productId }}
          </li>
          <li class="p-2 text-black text-xl font-semibold">
            <span class="text-gray-400 uppercase font-normal text-base"
              >Category:</span
            >
            {{ category_name }}
          </li>
          <li class="p-2 text-black text-xl font-semibold">
            <span
              v-if="hasSubcategories"
              class="text-gray-400 uppercase font-normal text-base"
            >
              Sub Category:
            </span>
            <span
              class="mx-1"
              v-for="(item, index) in sub_categories"
              :key="index"
            >
              {{ item }}
              <span v-if="index + 1 !== sub_categories.length">
                ,
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-span-1 mt-6 justify-items-center">
      <p
        class="font-normal justify-self-center text-center w-40 text-gray-400 border-red-500 border-b-2 text-3xl py-3"
      >
        Description
      </p>
      <hr />
      <div class="">
        <p class="font-bold text-gray-800 text-lg py-4">
          {{ info }}
        </p>
      </div>
    </div>
    <div v-if="isAdmin">
      <button @click="updateProduct" class="mt-10 update">Update</button>
      <button @click="deleteProduct" class="mt-10 delete ml-5">Delete</button>
    </div>
  </div>

  <!-- Main Product Content ends -->
</template>

<script>
import Thumbnail from "../../components/shop/Thumbnail.vue";
export default {
  props: ["productId"],
  components: {
    Thumbnail
  },
  computed: {
    isAdmin() {
      return (
        this.$store.getters["user/getRole"] ||
        JSON.parse(localStorage.getItem("user")).is_admin
      );
    },
    isDiscounted() {
      return this.price !== this.discount_price;
    },
    hasSubcategories() {
      if (this.sub_categories[0]) return true;
      else return false;
    }
  },
  data() {
    return {
      name: "",
      description: "",
      info: "",
      price: 0,
      discount_price: 0,
      category_name: "",
      sub_categories: [],
      images: [],
      imageShow: null,
      isLoading: false
    };
  },
  methods: {
    showImgChange(key) {
      this.imageShow = this.images[key];
    },
    updateProduct() {
      this.$router.push({ path: `update/${this.productId}` });
    },
    async deleteProduct() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "products/deleteCurrentProduct",
        {
          token: JSON.parse(localStorage.getItem("user")).access_token,
          product_id: this.productId
        }
      );

      if (status === 204) {
        this.isLoading = false;
        this.$router.push({
          name: "viewProducts"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        console.log("Something went wrong. Please try again!");
      }
      this.isLoading = false;
    }
  },
  async created() {
    this.isLoading = true;
    const product = await this.$store.dispatch("products/getAProduct", {
      product_id: this.productId
    });
    this.name = product.name;
    this.description = product.description;
    this.info = product.info;
    this.category_name = product.category_name;
    this.sub_categories = product.sub_categories;
    this.price = product.price;
    this.discount_price = product.discount_price;
    this.isLoading = false;
    this.images = product.images;
    this.imageShow = this.images[0];
  }
};
</script>
