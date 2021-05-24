<template lang="html">
  <!-- Address -->
  <base-spinner :show="isLoading"></base-spinner>
  <div class="flex-1 grid grid-cols-1 bg-gray-200">
    <div class="col-span-1 my-5">
      <div class="px-5 mx-5 md:px-10 md:mx-10 sm:ml-5 inline-block">
        <router-link
          class="text-sm text-gray-500 mx-4 inline-block relative hover:text-gray-800"
          to="/"
          >Home</router-link
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
        <router-link
          class="text-sm text-gray-800 mx-4 inline-block relative"
          to="/shop"
          >Shop</router-link
        >
      </div>
    </div>
  </div>
  <!-- Address ends -->

  <div class="p-5 m-5 md:p-6 md:m-6">
    <div class="grid grid-cols-1 gap-0 md:grid-cols-12">
      <!-- SIDEBAR -->
      <div class="col-span-1 md:col-span-3 p-5">
        <!-- search bar -->
        <div class="mb-8 p-0 8text-sm text-gray-700">
          <form
            @submit.prevent="null"
            class="px-4 py-2 relative border border-gray-400 rounded-md"
          >
            <input
              type="text"
              class="h-full w-11/12 text-lg outline-none"
              placeholder="Search..."
              v-model="searchQuery"
            />
            <div class="absolute float-right inline">
              <img src="https://img.icons8.com/android/24/000000/search.png" />
            </div>
          </form>
        </div>

        <!-- Filtering -->
        <div class="">
          <form @submit.prevent="filter">
            <!-- By Category -->
            <div class="rounded-none mb-6">
              <div class="mb-3">
                <a
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  class="text-black text-xl font-bold uppercase block"
                  >Categories</a
                >
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                data-parent="#accordionExample"
              >
                <div class="pt-2 pb-4 border-gray-500 border-b">
                  <ul
                    class="nice-scroll"
                    style="overflow-y: hidden; outline: none; list-style: none;"
                    tabindex="1"
                  >
                    <li
                      class="mb-3"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <input
                        type="checkbox"
                        class="check lista"
                        :id="category.id"
                        :value="category"
                        v-model="filters.selected_categories"
                      />
                      <label :for="category.id">{{ category.name }}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- By Subcategory -->
            <div class="rounded-none mb-6">
              <div class="mb-3">
                <a
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  class="text-black text-xl font-bold uppercase block"
                  >Subcategories</a
                >
              </div>
              <div
                id="collapseOne"
                class="collapse show"
                data-parent="#accordionExample"
              >
                <div class="pt-2 pb-4 border-gray-500 border-b">
                  <ul
                    class="nice-scroll"
                    style="overflow-y: hidden; outline: none; list-style: none;"
                    tabindex="1"
                  >
                    <li
                      class="mb-3"
                      v-for="subcategory in subcategories"
                      :key="subcategory.id"
                    >
                      <input
                        type="checkbox"
                        class="check lista"
                        :id="subcategory.id"
                        :value="subcategory"
                        v-model="filters.selected_subcategories"
                      />
                      <label :for="subcategory.id">{{
                        subcategory.name
                      }}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- By Price -->
            <div class="rounded-none mb-6">
              <div class="">
                <a
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  class="text-black text-xl font-bold uppercase block"
                  >Filter Price (₹)</a
                >
              </div>
              <div
                id="collapseThree"
                class="collapse show"
                data-parent="#accordionExample"
              >
                <div class="pt-2 pb-4 border-gray-500 border-b">
                  <div class="shop__sidebar__price">
                    <input
                      class="p-3 rounded bg-gray-100 my-2 w-full"
                      type="number"
                      placeholder="min"
                      v-model="filters.min_price"
                    /><br />
                    <input
                      class="p-3 rounded bg-gray-100 my-2 w-full"
                      type="number"
                      placeholder="max"
                      v-model="filters.max_price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              class="bg-gray-800 text-white w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 transform transition duration-200 hover:shadow-xl hover:-translate-y-1"
              type="submit"
            >
              Go
            </button>
          </form>
        </div>
      </div>
      <!-- SIDEBAR ENDS -->
      <!-- PRODUCTS -->
      <div class="col-span-1 md:col-span-9 p-5">
        <div
          class="grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          <product-item
            v-for="product in products"
            :id="product.id"
            :name="product.name"
            :price="product.price"
            :discount_price="
              product.discount_price !== 0
                ? product.discount_price
                : product.price
            "
            :images="product.images"
            :description="product.description"
            :key="product.id"
          ></product-item>
        </div>
        <h3
          v-if="products.length === 0"
          class="text-3xl m-10 font-light text-gray-900 flex justify-center"
        >
          No products found. Search something else?
        </h3>
      </div>
      <!-- PRODUCTS ENDS -->
    </div>
  </div>
</template>

<script>
import ProductItem from "../../components/shop/ProductItem.vue";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      filters: {
        min_price: "",
        max_price: "",
        selected_categories: [],
        selected_subcategories: []
      },
      allProducts: [],
      products: [],
      categories: [],
      subcategories: [],
      searchQuery: "",
      isLoading: false
    };
  },
  watch: {
    searchQuery: function(val) {
      let items = [];
      let filter = val.toUpperCase();
      for (let i = 0; i < this.allProducts.length; i++) {
        let name = this.allProducts[i].name.toUpperCase();
        if (name.indexOf(filter) > -1) {
          items.push(this.allProducts[i]);
        }
      }
      this.products = items;
    }
  },
  methods: {
    filter() {
      let min_price = this.filters.min_price;
      let max_price = this.filters.max_price;
      if (min_price === "") min_price = 0;
      if (max_price === "") max_price = 25000;

      this.products = this.allProducts.filter(
        p => p.discount_price >= min_price && p.discount_price <= max_price
      );

      if (this.filters.selected_categories.length) {
        const cats = this.filters.selected_categories;
        this.products = this.products.filter(p => {
          for (let cat of cats) {
            if (p.category_name === cat.name) return true;
          }
          return false;
        });
      }

      if (this.filters.selected_subcategories.length) {
        const subcats = this.filters.selected_subcategories;
        this.products = this.products.filter(p => {
          for (let subcat of subcats) {
            for (let s of p.sub_categories) {
              if (s === subcat.name) return true;
            }
          }
          return false;
        });
      }
    }
  },
  async created() {
    this.isLoading = true;
    const products = await this.$store.dispatch("products/getAllProducts");
    const categories = await this.$store.dispatch(
      "categories/getAllCategories"
    );
    const subcategories = await this.$store.dispatch(
      "categories/getAllSubcategories"
    );

    this.allProducts = products;
    this.products = products;
    this.categories = categories;
    this.subcategories = subcategories;
    this.isLoading = false;
  }
};
</script>
