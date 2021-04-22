<template>
  <!-- Address -->
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
<<<<<<< HEAD
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
        style="height:160px; @media(min-width:768px){ height:550px; };"
        class="align-middle col-span-1 md:grid md:grid-rows-3 justify-items-center md:col-span-2"
      >
        <div style="width:348px;" class="m-auto">
          <thumbnail
            v-for="item in thumbnails"
            :key="item"
            :imageURL="item.imageURL"
          ></thumbnail>
        </div>
      </div>

      <div style="height:533px;" class="col-span-1 md:col-span-10">
        <img
          class="mx-auto h-auto"
          src="https://preview.colorlib.com/theme/malefashion/img/shop-details/product-big-2.png"
          alt=""
        />
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
        <strike v-if="isDiscounted" class="ml-10 text-xl self-center text-gray-400"
          >Rs. {{ price }}</strike
        >
      </h3>
      <p class="text-base font-normal text-gray-500 p-6 mx-6 md:mx-16 lg:mx-48">
        {{ description }}
      </p>

      <div class="my-4">
        <h5 class="mx-2 font-thin text-gray-300 text-lg sm:text-2xl mb-6 block">
          ----
          <span class="text-gray-800 font-bold ">Guaranteed Safe Checkout</span>
          ----
        </h5>
        <!-- Whatsapp icon with link to msg for buying -->
        <a
          style="width:350px;"
          class="px-2 mx-auto mb-5 relative block justify-self-center text-2xl text-white transform transition-all duration-300 py-2 uppercase font-semibold hover:text-green-700 bg-gray-800 hover:scale-103 hover:border-green-800 hover:bg-green-100 border rounded border-transparent"
          target="_blank"
          href="http://wa.me/919594116911"
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
            <span v-if="hasSubcategories" class="text-gray-400 uppercase font-normal text-base"
              >Sub Category:</span
            >
            <span class="mx-2" v-for="item in sub_categories" :key="item">
              {{ item }},</span
            >
          </li>
        </ul>
=======
        <span class="text-sm text-gray-800 mx-4 inline-block"
          >Hooded thermal anorak</span
        >
      </div>
    </div>
  </div>
  <!-- Address ends -->

  <!-- Product Images -->
  <!-- @media (min-width:768px){ height:691px; }  -->
  <div class="bg-gray-200 px-2 sm:px-10">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-0">
      <div
        style="height:160px; @media(min-width:768px){ height:550px; };"
        class="align-middle col-span-1 md:grid md:grid-rows-3 justify-items-center md:col-span-2"
      >
        <div style="width:348px;" class="m-auto">
          <div
            class="inline-block mx-auto md:grid md:col-span-1 relative p-2 lg:p-4 md:pt-8 hover:scale-125 transform transition-all duration-300"
          >
            <img
              class="mx-auto align-middle"
              src="https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-1.png"
              alt=""
            />
          </div>
          <div
            class="inline-block mx-auto md:grid md:col-span-1 relative p-2 lg:p-4 hover:scale-125 transform transition-all duration-300"
          >
            <img
              class="object-none object-center mx-auto"
              src="https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-2.png"
              alt=""
            />
          </div>
          <div
            class="inline-block mx-auto md:grid md:col-span-1 relative p-2 lg:p-4 hover:scale-125 transform transition-all duration-300"
          >
            <img
              class="mx-auto"
              src="https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-3.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div style="height:533px;" class="col-span-1 md:col-span-10">
        <img
          class="mx-auto h-auto"
          src="https://preview.colorlib.com/theme/malefashion/img/shop-details/product-big-2.png"
          alt=""
        />
>>>>>>> upstream/main
      </div>
    </div>
  </div>

<<<<<<< HEAD
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

=======
  <!-- Main Product Content -->
  <div
    class="grid justify-items-center grid-cols-1 px-5 pb-5 pt-0 mb-5 mt-0 md:px-10 md:py-5 md:mx-10 mx-5"
  >
    <div class="col-span-1 justify-items-center text-center">
      <h4 class="font-bold text-3xl text-gray-900 p-4 pt-0">
        Hooded thermal anorak
      </h4>
      <h3 class="font-semibold text-4xl text-gray-700 p-2 pt-6">$270.00</h3>
      <p class="text-base font-normal text-gray-500 p-6 mx-6 md:mx-16 lg:mx-48">
        Coat with quilted lining and an adjustable hood. Featuring long sleeves
        with adjustable cuff tabs, adjustable asymmetric hem with elastic side
        tabs and a front zip fastening with placket.
      </p>

      <div class="my-4">
        <h5 class="mx-2 font-thin text-gray-300 text-lg sm:text-2xl mb-6 block">
          ----
          <span class="text-gray-800 font-bold ">Guaranteed Safe Checkout</span>
          ----
        </h5>
        <!-- Whatsapp icon with link to msg for buying -->
        <a
          style="width:350px;"
          class="px-2 mx-auto mb-5 relative block justify-self-center text-2xl text-white transform transition-all duration-300 py-2 uppercase font-semibold hover:text-green-700 bg-gray-800 hover:scale-110 hover:border-green-800 hover:bg-green-100 border border-transparent"
          href="#"
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
            3812912
          </li>
          <li class="p-2 text-black text-xl font-semibold">
            <span class="text-gray-400 uppercase font-normal text-base"
              >Category:</span
            >
            Clothes
          </li>
          <li class="p-2 text-black text-xl font-semibold">
            <span class="text-gray-400 uppercase font-normal text-base"
              >Sub Category:</span
            >
            Mens T-Shirt
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
          Nam tempus turpis at metus scelerisque placerat nulla deumantos
          solicitud felis. Pellentesque diam dolor, elementum etos lobortis des
          mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des
          commodo pharetras loremos.
        </p>
        <div class="mb-2 pt-4">
          <h5 class="font-bold text-gray-800 text-lg mb-4">
            Products Infomation
          </h5>
          <p class="font-light text-base text-gray-600">
            A Pocket PC is a handheld computer, which features many of the same
            capabilities as a modern PC. These handy little devices allow
            individuals to retrieve and store e-mail messages, create a contact
            file, coordinate appointments, surf the internet, exchange text
            messages and more. Every product that is labeled as a Pocket PC must
            be accompanied with specific software to operate the unit and must
            feature a touchscreen and touchpad.
            <br />
            As is the case with any new technology product, the cost of a Pocket
            PC was substantial during it’s early release. For approximately
            $700.00, consumers could purchase one of top-of-the-line Pocket PCs
            in 2003. These days, customers are finding that prices have become
            much more reasonable now that the newness is wearing off. For
            approximately $350.00, a new Pocket PC can now be purchased.
          </p>
        </div>
>>>>>>> upstream/main
        <div class="mb-2 pt-4">
          <h5 class="font-bold text-gray-800 text-lg mb-4">Material used</h5>
          <p class="font-light text-base text-gray-600">
            Polyester is deemed lower quality due to its none natural quality’s.
            Made from synthetic materials, not natural like wool. Polyester
            suits become creased easily and are known for not being breathable.
            Polyester suits tend to have a shine to them compared to wool and
            cotton suits, this can make the suit look cheap. The texture of
            velvet is luxurious and breathable. Velvet is a great choice for
            dinner party jacket and can be worn all year round.
          </p>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <div v-if="isAdmin">
      <button @click="updateProduct" class="mt-10 update">Update</button>
      <button @click="deleteProduct" class="mt-10 delete ml-5">Delete</button>
    </div>
  </div>

=======
  </div>
>>>>>>> upstream/main
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
        this.$store.getters["user/isAuthenticated"] ||
        JSON.parse(localStorage.getItem("isAuthenticated"))
      );
    },
    isDiscounted() {
      return this.price !== this.discount_price;
    },
    hasSubcategories() {
      if(this.sub_categories[0]) return true;
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
      thumbnails: [
        {
          id: 1,
          imageURL:
            "https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-1.png"
        },
        {
          id: 2,
          imageURL:
            "https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-2.png"
        },
        {
          id: 3,
          imageURL:
            "https://preview.colorlib.com/theme/malefashion/img/shop-details/thumb-3.png"
        }
      ]
    };
  },
  methods: {
    updateProduct() {
      this.$router.push({ path: `update/${this.productId}` });
    },
    async deleteProduct() {
      const status = await this.$store.dispatch("products/deleteCurrentProduct", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        product_id: this.productId
      });

      if (status === 204) {
        this.$router.push({
          name: "viewProducts"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        console.log("Something went wrong. Please try again!");
      }
    }
  },
  async created() {
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
  }
};
</script>