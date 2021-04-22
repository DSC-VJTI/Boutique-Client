<template lang="html">
  <!-- Address -->
  <div class="grid grid-cols-1 m-0 bg-gray-200">
    <div class="col-span-1">
      <div class="my-7 ml-1 sm:ml-5 inline-block">
<<<<<<< HEAD
        <router-link
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          to="/"
          >Home</router-link
=======
        <a
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          href="/"
          >Home</a
>>>>>>> upstream/main
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
<<<<<<< HEAD
        <router-link
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          to="/shop"
          >Shop</router-link
        >
=======
        <a
          class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
          href="/shop"
          >Shop</a
        >
        <img
          class="transform -rotate-90 inline-block"
          src="https://img.icons8.com/android/20/000000/expand-arrow.png"
        />
        <span class="text-sm text-gray-800 mx-4 inline-block">Products</span>
>>>>>>> upstream/main
      </div>
    </div>
  </div>
  <!-- Address ends -->

  <div class="p-5 m-5 md:p-10 md:m-10 mt-5">
    <div class="grid grid-cols-1 gap-0 md:grid-cols-12">
      <!-- SIDEBAR -->
      <div class="col-span-1 md:col-span-3 p-5">
        <!-- search bar -->
        <div class="mb-8 p-0 text-sm text-gray-700">
          <form
            action="#"
            class="px-4 py-2 relative border border-gray-400 rounded-md"
          >
            <input
              type="text"
<<<<<<< HEAD
              class="h-full w-11/12 text-lg outline-none"
=======
              class="h-full w-11/12 text-lg"
>>>>>>> upstream/main
              placeholder="Search..."
            />
            <button class="absolute float-right" type="submit">
              <img src="https://img.icons8.com/android/24/000000/search.png" />
            </button>
          </form>
        </div>

        <!-- Filtering -->
        <div class="">
          <div class="rounded-none mb-6">
            <div class="">
              <a
                data-toggle="collapse"
                data-target="#collapseOne"
                class="text-black text-xl font-bold uppercase block"
                >Categories</a
              >
<<<<<<< HEAD
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
                  <li class="mb-3 mt-3">
                    <router-link class="lista" to="#">Men Trousers</router-link>
                  </li>
                  <li class="mb-3">
                    <router-link class="lista" to="#"
                      >Women Trousers</router-link
                    >
                  </li>
                  <li class="mb-3">
                    <router-link class="lista" to="#">Mens Tshirts</router-link>
                  </li>
                  <li class="mb-3">
                    <router-link class="lista" to="#"
                      >Women Tshirts</router-link
                    >
                  </li>
                  <li class="mb-3">
                    <router-link class="lista" to="#">Masks</router-link>
                  </li>
                  <li class="mb-3">
                    <router-link class="lista" to="#">Bags</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="rounded-none mb-6">
            <div class="">
              <a
                data-toggle="collapse"
                data-target="#collapseThree"
                class="text-black text-xl font-bold uppercase block"
                >Filter Price</a
              >
            </div>
            <div
              id="collapseThree"
              class="collapse show"
              data-parent="#accordionExample"
            >
              <div class="pt-2 pb-4 border-gray-500 border-b">
                <div class="shop__sidebar__price">
                  <ul>
                    <li class="mb-3 mt-3">
                      <router-link class="lista" to="#"
                        >$0.00 - $50.00</router-link
                      >
                    </li>
                    <li class="mb-3">
                      <router-link class="lista" to="#"
                        >$50.00 - $100.00</router-link
                      >
                    </li>
                    <li class="mb-3">
                      <router-link class="lista" to="#"
                        >$100.00 - $150.00</router-link
                      >
                    </li>
                    <li class="mb-3">
                      <router-link class="lista" to="#"
                        >$150.00 - $200.00</router-link
                      >
                    </li>
                    <li class="mb-3">
                      <router-link class="lista" to="#"
                        >$200.00 - $250.00</router-link
                      >
                    </li>
                    <li class="mb-3">
                      <router-link class="lista" to="#">250.00+</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
            :discount_price="product.discount_price"
            :key="product.id"
          ></product-item>
=======
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
                  <li class="mb-3 mt-3">
                    <a class="lista" href="#">Men Trousers</a>
                  </li>
                  <li class="mb-3">
                    <a class="lista" href="#">Women Trousers</a>
                  </li>
                  <li class="mb-3">
                    <a class="lista" href="#">Mens Tshirts</a>
                  </li>
                  <li class="mb-3">
                    <a class="lista" href="#">Women Tshirts</a>
                  </li>
                  <li class="mb-3"><a class="lista" href="#">Masks</a></li>
                  <li class="mb-3"><a class="lista" href="#">Bags</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="rounded-none mb-6">
            <div class="">
              <a
                data-toggle="collapse"
                data-target="#collapseThree"
                class="text-black text-xl font-bold uppercase block"
                >Filter Price</a
              >
            </div>
            <div
              id="collapseThree"
              class="collapse show"
              data-parent="#accordionExample"
            >
              <div class="pt-2 pb-4 border-gray-500 border-b">
                <div class="shop__sidebar__price">
                  <ul>
                    <li class="mb-3 mt-3">
                      <a class="lista" href="#">$0.00 - $50.00</a>
                    </li>
                    <li class="mb-3">
                      <a class="lista" href="#">$50.00 - $100.00</a>
                    </li>
                    <li class="mb-3">
                      <a class="lista" href="#">$100.00 - $150.00</a>
                    </li>
                    <li class="mb-3">
                      <a class="lista" href="#">$150.00 - $200.00</a>
                    </li>
                    <li class="mb-3">
                      <a class="lista" href="#">$200.00 - $250.00</a>
                    </li>
                    <li class="mb-3"><a class="lista" href="#">250.00+</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- SIDEBAR ENDS -->

      <!-- PRODUCTS -->
      <div class="col-span-1 md:col-span-9 p-5">
        <div
          class="grid justify-items-center grid-cols-1 gap-0 lg:grid-cols-2 xl:grid-cols-3"
        >
          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-3.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <a
                title="Product 1"
                href="/shop/singleproduct"
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
                >Product 1</a
              >
              <h5 class="text-gray-800 text-xl font-bold">$100</h5>
            </div>
          </div>

          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-2.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <h6
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
              >
                Product 2
              </h6>
              <h5 class="text-gray-800 text-xl font-bold">$86.5</h5>
            </div>
          </div>

          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-3.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <h6
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
              >
                Product 3
              </h6>
              <h5 class="text-gray-800 text-xl font-bold">$10</h5>
            </div>
          </div>

          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-4.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <h6
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
              >
                Product 4
              </h6>
              <h5 class="text-gray-800 text-xl font-bold">$50</h5>
            </div>
          </div>

          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-5.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <h6
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
              >
                Product 5
              </h6>
              <h5 class="text-gray-800 text-xl font-bold">$110.6</h5>
            </div>
          </div>

          <div class="col-span-1 w-64">
            <div class="pt-2 relative h-64 w-64">
              <a title="Product 1" href="/shop/singleproduct">
                <div
                  class="productImage"
                  style="background-image: url('https://preview.colorlib.com/theme/malefashion/img/product/product-6.jpg')"
                ></div>
              </a>
            </div>
            <div class="pt-2 relative mb-10">
              <h6
                class="text-gray-800 text-lg font-medium mb-1 transition-all duration-300"
              >
                Product 6
              </h6>
              <h5 class="text-gray-800 text-xl font-bold">$700</h5>
            </div>
          </div>
>>>>>>> upstream/main
        </div>
      </div>
      <!-- PRODUCTS ENDS -->
    </div>
  </div>
</template>
<<<<<<< HEAD

<script>
import productItem from "../../components/shop/ProductItem.vue";
export default {
  components: {
    productItem
  },
  data() {
    return {
      products: []
    };
  },

  async created() {
    const products = await this.$store.dispatch("products/getAllProducts");
    this.products = products;
    // console.log(products)
  }
};
</script>
=======
>>>>>>> upstream/main
