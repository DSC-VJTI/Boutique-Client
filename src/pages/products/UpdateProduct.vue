<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="m-8 sm:ml-5 inline-block">
    <router-link
      class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
      :to="`/shop/${productId}`"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Edit Product Info</h1>
    <div>
      <div>
        <h2 class="px-8 mb-3 text-gray-800 text-xl font-semibold">
          Product Images
        </h2>
        <div
          v-for="(img, key) in imageData"
          :key="key"
          class="col-span-3 file-listing sketchPreview"
          :style="{ 'background-image': `url(${img})` }"
        ></div>
        <br />
        <div class="mt-5 mb-10">
          <div class="block sm:inline-block p-3 sm:mr-5">
            <label
              class="bg-gray-900 text-green-500 py-2 px-4 hover:bg-gray-50 border hover:border-green-500 transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
              style="width: 100%;"
              for="file-input"
              >Add Photos
              <input
                id="file-input"
                type="file"
                ref="files"
                @change="selectImage()"
                class="hidden"
                multiple
              />
            </label>
          </div>
          <div class="block sm:inline-block p-3 sm:mr-5">
            <span
              class="bg-gray-900 text-red-500 py-2 px-4 hover:bg-gray-50 border hover:border-red-500 transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
              @click="removeAllFiles()"
              >Remove All</span
            >
          </div>
          <div class="block sm:inline-block p-3 sm:mr-5">
            <span
              class="bg-gray-900 text-red-500 py-2 px-4 hover:bg-gray-50 border hover:border-red-500 transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
              @click="removeOldFiles()"
              >Remove Old</span
            >
          </div>
          <div class="block sm:inline-block p-3">
            <span
              class="bg-gray-900 text-red-500 py-2 px-4 hover:bg-gray-50 border hover:border-red-500 transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
              @click="removeNewFiles()"
              >Remove New</span
            >
          </div>
        </div>
      </div>
      <form class="m-5 px-5 md:px-40" @submit.prevent="updateProduct">
        <div class="w-full mt-5">
          <input
            class="measurementInput"
            style="width:100%;"
            type="text"
            placeholder="Name of the Product"
            v-model.trim="name"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ nameError }}</span>
        </div>
        <div class="w-full mt-5">
          <input
            class="measurementInput"
            style="width:100%;"
            type="text"
            placeholder="Short Description"
            v-model.trim="description"
            required
          />
        </div>
        <div class="w-full mt-5">
          <input
            class="measurementInput"
            style="width:100%;"
            type="text"
            placeholder="Detailed Info"
            v-model.trim="info"
            required
          />
        </div>
        <div
          class="w-full block sm:grid grid-flow-col grid-cols-1 sm:grid-cols-3"
        >
          <div class="w-auto mt-5 col-span-1">
            <label class="mr-5 text-xl font-semibold">Original Price</label>
            <input
              class="measurementInput"
              style="width:100px;"
              type="number"
              placeholder="MRP"
              v-model.trim="price"
              required
            />
          </div>
          <div class="w-auto mt-5 col-span-1">
            <label class="mr-5 text-xl font-semibold">Discounted Price</label>
            <input
              class="measurementInput"
              style="width:100px;"
              type="number"
              placeholder="Discounted Price"
              v-model.trim="discount_price"
              required
            />
          </div>
          <div class="w-auto mt-5 col-span-1">
            <label class="mr-5 text-xl font-semibold">Category</label>
            <select
              v-model="category_name"
              class="px-5 py-2 border-2 rounded w-40 outline-none"
            >
              <option
                class="py-5 text-gray-700 text-base font-light"
                v-for="(cat, key) in available_categories"
                :key="key"
              >
                {{ cat }}
              </option>
            </select>
            <br />
          </div>
        </div>
        <div class="mt-6">
          <label class="my-15 mr-5 text-xl font-semibold">Sub-categories</label>
          <div
            class="sm:inline-block block px-4 bg-gray-300"
            v-for="subcat in available_subcategories"
            :key="subcat"
          >
            <input
              type="checkbox"
              class="check"
              :id="subcat"
              :value="subcat"
              v-model="sub_categories"
            />
            <label class="text-gray-700 text-base font-light" :for="subcat">{{
              subcat
            }}</label>
          </div>
        </div>
        <div class="mx-auto w-4/5 md:w-1/4 mt-10">
          <button
            type="submit"
            class="bg-gray-800 text-blue-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          >
            Modify Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productId"],
  data() {
    return {
      name: "",
      description: "",
      info: "",
      price: 0,
      discount_price: 0,
      category_name: "",
      sub_categories: [],
      available_subcategories: [],
      available_categories: [],
      isLoading: false,
      images: [],
      imageData: [],
      files: []
    };
  },
  methods: {
    removeAllFiles() {
      this.images = []; // Array of old images
      this.files = []; // Array of newly added images
      this.imageData = []; // Array of images previewed (old + new images)
    },
    removeOldFiles() {
      this.imageData.splice(0, this.images.length);
      this.images = [];
    },
    removeNewFiles() {
      this.files = [];
      this.imageData = this.images;
    },
    selectImage() {
      this.imageData = [];

      let uploadedFiles = this.$refs.files.files;
      this.$refs.files = [];
      /* Adds the uploaded file to the files array */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      for (let img of this.files) {
        if (img && img.name) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.imageData.push(reader.result);
            }.bind(this),
            false
          );

          reader.readAsDataURL(img);
        }
      }
      this.imageData.push(...this.images);
    },
    async updateProduct() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "products/updateCurrentProduct",
        {
          body: {
            name: this.name,
            description: this.description,
            info: this.info,
            price: this.price,
            discount_price: this.discount_price,
            category_name: this.category_name,
            sub_categories: this.sub_categories,
            images: this.images
          },
          token: JSON.parse(localStorage.getItem("user")).access_token,
          images: this.files,
          product_id: this.productId
        }
      );

      if (status === 200) {
        this.resetInputs();
        this.isLoading = false;
        this.$router.push({
          name: "viewProduct",
          params: {
            productId: this.productId
          }
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log("Something went wrong");
      }
      this.isLoading = false;
    },
    resetInputs() {
      this.name = "";
      this.description = "";
      this.info = "";
      this.price = 0;
      this.discount_price = 0;
      this.category_name = "";
      this.sub_categories = [];
    }
  },
  async created() {
    if (!this.$store.getters["user/getRole"]) {
      const payload = JSON.parse(localStorage.getItem("user"));
      if (!payload || !payload.is_admin) this.$router.replace("/admin/login");
      else {
        this.$store.commit("user/setAuth", { isAuthenticated: true });
        this.$store.commit("user/setUser", payload);
      }
    }
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
    this.imageData = product.images;

    const allSubcategories = await this.$store.dispatch(
      "categories/getAllSubcategories"
    );
    const allCategories = await this.$store.dispatch(
      "categories/getAllCategories"
    );

    this.available_subcategories = allSubcategories.map(obj => obj.name);
    this.available_categories = allCategories.map(obj => obj.name);
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
