<template>
  <!-- Address -->
  <base-spinner :show="isLoading"></base-spinner>
  <div class="grid grid-cols-1 m-0 justify-items-center bg-gray-200">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <div class="col-span-1">
      <div class="my-7 ml-1 sm:ml-5 inline-block">
        <router-link
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          to="/"
          >Home</router-link
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
        <router-link
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          to="/shop"
          >Shop</router-link
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
        class="align-middle col-span-1 md:col-span-2 overflow-y-scroll overflow-x-scroll"
      >
        <div class="m-auto flex thumbnail md:block">
          <thumbnail
            v-for="(item, key) in images"
            :key="key"
            :imageURL="item"
            @click="showImgChange(key)"
          ></thumbnail>
        </div>
      </div>

      <div style="height:576px;" class="col-span-1 md:col-span-10">
        <img class="mx-auto object-cover h-full" :src="imageShow" alt="" />
      </div>
    </div>
  </div>

  <!-- Main Product Content -->
  <div
    class="grid justify-items-center grid-cols-1 px-5 pb-5 pt-0 mb-5 mt-0 md:px-10 md:py-5 md:mx-10 mx-5"
  >
    <div class="col-span-1 justify-items-center text-center">
      <h4 class="font-bold text-3xl text-gray-900 p-4 pt-3 md:pt-0">
        {{ name }}
      </h4>
      <p class="text-lg font-normal text-gray-500 mx-6 md:mx-16 lg:mx-48">
        {{ description }}
      </p>
      <h3
        class="font-semibold text-xl text-center text-gray-700 p-2 md:text-3xl"
      >
        <strike
          v-if="isDiscounted"
          class="self-center text-xl text-left text-gray-400"
          >M.R.P: ₹ {{ price }}</strike
        >
        <div class="self-center">
          {{ isDiscounted ? "Discount Price" : "M.R.P" }}: ₹
          {{ discount_price }}
        </div>
      </h3>

      <div class="my-4">
        <!-- Whatsapp icon with link to msg for buying -->
        <a
          style="width:350px;"
          class="px-2 mx-auto mb-5 relative block justify-self-center text-2xl text-white transform transition-all duration-300 py-2 uppercase font-semibold hover:text-green-700 bg-gray-800 hover:scale-103 hover:border-green-800 hover:bg-green-100 border rounded border-transparent"
          target="_blank"
          :href="
            `http://wa.me/${whatsappNumber}/?text=Message%20Sent%20Via%20Website`
          "
        >
          <img
            class="inline-block mr-2"
            src="https://img.icons8.com/color/36/000000/whatsapp.png"
          />
          <p class="align-middle inline-block">Contact us to Order</p>
        </a>
        <ul>
          <li class="p-2 text-black text-xl font-semibold">
            <span class="text-gray-400 font-normal text-base">Category:</span>
            {{ category_name }}
          </li>
          <li class="p-2 text-black text-xl font-semibold">
            <span
              v-if="hasSubcategories"
              class="text-gray-400 font-normal text-base"
            >
              Sub-Category:
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

    <div class="col-span-1 w-full mt-4 justify-items-center">
      <p
        class="font-normal justify-self-center text-center w-40 text-gray-600 border-red-500 border-b-2 text-3xl py-3"
      >
        Description
      </p>
      <hr />
      <div class="">
        <p class="font-normal text-gray-900 text-lg py-4">
          {{ info }}
        </p>
      </div>
    </div>
    <div v-if="isAdmin">
      <div class="p-2 inline-block w-11/12 md:w-3/4 mx-0" style="width:150px;">
        <button
          @click="updateProduct"
          class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
        >
          Update
        </button>
      </div>
      <div class="p-2 inline-block w-11/12 md:w-3/4 mx-0" style="width:150px;">
        <button
          @click="deleteProduct"
          class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
        >
          Delete
        </button>
      </div>
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
      return JSON.parse(localStorage.getItem("user"))
        ? this.$store.getters["user/getRole"] ||
            JSON.parse(localStorage.getItem("user")).is_admin
        : false;
    },
    isDiscounted() {
      return this.price !== this.discount_price;
    },
    hasSubcategories() {
      if (this.sub_categories[0]) return true;
      else return false;
    },
    whatsappNumber() {
      return process.env.VUE_APP_WHATSAPP_NUMBER;
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
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
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
        this.isSuccessMsg = true;
        this.toastMsg = "Deletion successful.";
        this.errorOccured = true;
        setTimeout(() => {
          this.errorOccured = false;
          this.$router.push({
            name: "viewProducts"
          });
        }, 2000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        this.isSuccessMsg = false;
        this.toastMsg = "Something went wrong.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
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
    this.discount_price =
      product.discount_price !== 0 ? product.discount_price : product.price;
    this.isLoading = false;
    this.images = product.images;
    this.imageShow = this.images[0];
  }
};
</script>
