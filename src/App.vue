<template>
  <div class="flex flex-col h-full">
    <nav
      class="relative flex-none flex-wrap content-evenly text-right bg-gray-50"
    >
      <div
        class="container sm:px-20 mx-auto flex flex-wrap items-center justify-between"
      >
        <div
          class="w-full relative flex flex-no-shrink justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
        >
          <router-link to="/">
            <img
              src="./assets/black_bg_logo.png"
              class="w-13 h-16 py-2"
              alt=""
            />
          </router-link>
          <button
            class="text-gray-800 text-right cursor-pointer text-xl leading-none px-3 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            @click="toggleNavbar"
          >
            <svg
              viewBox="0 0 100 80"
              width="30"
              height="30"
              class="text-gray-800 hover:-translate-y-0.5 transform transition duration-300 hover:rotate-180"
            >
              <rect width="100" height="12"></rect>
              <rect y="33" width="100" height="12"></rect>
              <rect y="66" width="100" height="12"></rect>
            </svg>
          </button>
        </div>
        <div
          :class="showMenu ? 'flex' : 'hidden'"
          class="flex-col lg:flex-row list-none lg:flex-grow w-full lg:flex lg:w-4/5 lg:bg-transparent"
        >
          <router-link
            class="text-center px-3 py-4 mr-0 lg:mr-8 font-bold text-xl"
            to="/"
            @click="toggleNavbar"
            ><span class="text-gray-800">FASHION</span>
            <span class="px-0.5 text-gray-800 font-extrabold">&#183;</span>
            <span class="text-gray-800">O</span>
            <span class="px-0.5 text-gray-800 font-extrabold">&#183;</span>
            <span class="text-gray-800">PHILE</span></router-link
          >
          <router-link
            class="text-center px-3 py-4 border-b-2 border-transparent hover:border-gray-800 duration-200"
            to="/shop"
            @click="toggleNavbar"
            >Shop</router-link
          >
          <router-link
            class="text-center px-3 py-4 border-b-2 border-transparent hover:border-gray-800 duration-200"
            to="/about"
            @click="toggleNavbar"
            >About</router-link
          >
          <router-link
            class="text-center px-3 py-4 border-b-2 border-transparent hover:border-gray-800 duration-200"
            to="/blogs"
            @click="toggleNavbar"
            >Blogs</router-link
          >

          <div
            v-if="isAuthenticated"
            class="dropdown px-3 py-4 mx-auto lg:mx-0"
          >
            <router-link class="text-center" to="/">Admin</router-link>
            <div class="dropdown-content">
              <router-link
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/measurements"
                @click="toggleNavbar"
                >Measurements</router-link
              >
              <router-link
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/costlist"
                @click="toggleNavbar"
                >Cost List</router-link
              >
              <router-link
                v-if="isAdmin"
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/shop/new"
                @click="toggleNavbar"
                >Add Product</router-link
              >
              <router-link
                v-if="isAdmin"
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/admin/register"
                @click="toggleNavbar"
                >Add Admin</router-link
              >
              <router-link
                v-if="isAdmin"
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/blogs/new"
                @click="toggleNavbar"
                >Create Blog</router-link
              >
              <router-link
                v-if="isAdmin"
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/categories"
                @click="toggleNavbar"
                >Categories</router-link
              >
            </div>
          </div>

          <div
            v-if="isAuthenticated"
            class="dropdown px-3 py-4 mx-auto lg:mx-0"
          >
            <router-link class="text-center" to="/">Landing Page</router-link>
            <div class="dropdown-content">
              <router-link
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/landing/carousel/new"
                @click="toggleNavbar"
                >Add to Carousel</router-link
              >
              <router-link
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/landing/collections/new"
                @click="toggleNavbar"
                >Add to Collections</router-link
              >
              <router-link
                class="bg-white text-center px-3 py-2 border-b-2 border-transparent hover:border-gray-800 duration-200"
                to="/landing/instagram/new"
                @click="toggleNavbar"
                >Add Instagram Image</router-link
              >
            </div>
          </div>

          <div class="mx-auto lg:mr-0 py-2 text-right">
            <button
              v-if="isAuthenticated"
              @click="logout"
              class="focus:outline-none font-medium px-3 py-2 text-white bg-gray-800 hover:bg-gray-50 hover:text-gray-800 transform transition duration-200 border hover:border-gray-800 float-right w-full h-full sm:w-24 hover:bg-white hover:-translate-y-0.5 transform transition duration-200 hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="p-0 m-0 flex-1">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      showMenu: false
    };
  },
  components: {
    Footer
  },
  computed: {
    isAuthenticated() {
      return (
        this.$store.getters["user/isAuthenticated"] ||
        JSON.parse(localStorage.getItem("isAuthenticated"))
      );
    },
    isAdmin() {
      return JSON.parse(localStorage.getItem("user"))
        ? this.$store.getters["user/getRole"] ||
            JSON.parse(localStorage.getItem("user")).is_admin
        : false;
    }
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },

    logout() {
      this.$store.dispatch("user/unauthorize");
    }
  }
};
</script>

<style>
.dropdown {
  float: left;
  overflow: hidden;
  border: none;
  outline: none;
}

.dropdown button {
  border: none;
  outline: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}

body {
  height: 100vh;
  @apply overflow-x-hidden;
}
</style>
