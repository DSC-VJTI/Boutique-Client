<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <h1 class="green mb-10">Add Product</h1>
    <div>
      <div class="p-5 text-center">
        <label
          class="bg-gray-900 text-green-500 py-2 px-4 hover:bg-gray-50 hover:border-green-500 border transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
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
      <div>
        <div
          v-for="(img, key) in imageData"
          :key="key"
          class="col-span-3 file-listing sketchPreview"
          :style="{ 'background-image': `url(${img})` }"
        >
          <span
            class="float-right px-2 m-2 text-white bg-red-500 rounded-full"
            @click="removeFile(key)"
            >X</span
          >
        </div>
      </div>
      <form class="m-5 px-5 md:px-40" @submit.prevent="newProduct">
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
          />
        </div>
        <div class="w-full mt-5">
          <textarea
            class="measurementInput"
            style="width:100%;"
            type="text"
            placeholder="Detailed Info"
            v-model.trim="info"
          ></textarea>
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
            class="bg-gray-800 text-blue-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-900 transform transition duration-200 hover:shadow-lg"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
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
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false,
      images: [],
      imageData: []
    };
  },
  methods: {
    displayToast(isSuccessMsg, msg) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
    },
    removeFile(key) {
      this.images.splice(key, 1);
      this.imageData.splice(key, 1);
    },
    selectImage() {
      this.imageData = [];

      let uploadedFiles = this.$refs.files.files;
      /* Adds the uploaded file to the files array */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.images.push(uploadedFiles[i]);
      }

      for (let img of this.images) {
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
    },
    async newProduct() {
      if (this.imageData.length === 0) {
        this.displayToast(false, "Please add photos to the product.");
        return;
      }
      this.isLoading = true;
      const body = {
        name: this.name,
        description: this.description,
        info: this.info,
        price: this.price,
        discount_price: this.discount_price,
        category_name: this.category_name,
        sub_categories: this.sub_categories
      };

      const status = await this.$store.dispatch("products/createNewProduct", {
        body: body,
        token: JSON.parse(localStorage.getItem("user")).access_token,
        images: this.images
      });

      if (status === 201) {
        this.isLoading = false;
        this.resetInputs();
        this.displayToast(true, "Product created successfully.");
        setTimeout(() => this.$router.push({ name: "viewProducts" }), 3000);
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
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
