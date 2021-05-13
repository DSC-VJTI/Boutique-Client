<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Edit Product Info</h1>
    <div>
      <div>
        <h2 class="px-8 text-xl text-gray-800">Product Images</h2>
        <div
          v-for="(img, key) in imageData"
          :key="key"
          class="col-span-3 file-listing sketchPreview"
          :style="{ 'background-image': `url(${img})` }"
        ></div>
        <br />
        <div class="mt-5 mb-10">
          <span
            class="py-2 px-4 bg-green-500 cursor-pointer hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
            style="width: 100%;"
            >Add Files
            <input
              type="file"
              ref="files"
              @change="selectImage()"
              class="hidden"
              multiple
            />
          </span>
          <span
            class="py-2 px-4 ml-5 bg-red-500 cursor-pointer hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
            @click="removeAllFiles()"
            >Remove All</span
          >
          <span
            class="py-2 px-4 ml-5 bg-red-500 cursor-pointer hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
            @click="removeOldFiles()"
            >Remove Old</span
          >
          <span
            class="py-2 px-4 ml-5 bg-red-500 cursor-pointer hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
            @click="removeNewFiles()"
            >Remove New</span
          >
        </div>
      </div>
      <form class="m-5" @submit.prevent="updateProduct">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Name of the Product"
            v-model.trim="name"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ nameError }}</span>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Short Description"
            v-model.trim="description"
            required
          />
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Detailed Info"
            v-model.trim="info"
            required
          />
        </div>
        <div class="form-group">
          <label>Original Price: </label>
          <input
            class="form-control"
            type="number"
            placeholder="MRP"
            v-model.trim="price"
            required
          />
        </div>
        <div class="form-group">
          <label>Discounted Price: </label>
          <input
            class="form-control"
            type="number"
            placeholder="Discounted Price"
            v-model.trim="discount_price"
            required
          />
        </div>
        <br /><br />
        <div class="form-group">
          <label>Category that it belongs to:</label><br />
          <select
            v-model="category_name"
            class="px-5 py-2 border-2 rounded w-2/3 outline-none"
          >
            <option
              class="py-5"
              v-for="(cat, key) in available_categories"
              :key="key"
            >
              {{ cat }}
            </option>
          </select>
          <br />
        </div>
        <div class="form-group">
          <label class="my-15">Sub-categories that it belongs to:</label><br />
          <div v-for="subcat in available_subcategories" :key="subcat">
            <input
              type="checkbox"
              class="check"
              :id="subcat"
              :value="subcat"
              v-model="sub_categories"
            />
            <label :for="subcat">{{ subcat }}</label>
          </div>
        </div>
        <div class="form-group" style="width: 20%">
          <input
            type="submit"
            class="py-2 px-4 bg-green-600 cursor-pointer hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
            value="Modify Product"
          />
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
    if (!this.$store.getters["user/isAuthenticated"]) {
      if (
        !localStorage.getItem("isAuthenticated") ||
        localStorage.getItem("isAuthenticated") === false
      )
        this.$router.replace("/admin/login");
      else this.$store.commit("user/setAuth", { isAuthenticated: true });
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
