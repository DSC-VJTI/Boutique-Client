<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Add Product</h1>
    <div>
      <div class="w-20 h-20 text-center mb-3">
        <label for="file-input" class="cursor-pointer">Upload</label>
        <input
          id="file-input"
          type="file"
          class="hidden text-gray-500"
          @change="selectImage()"
          ref="files"
          multiple
        />
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
      <form class="m-5" @submit.prevent="newProduct">
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
          />
        </div>
        <div class="form-group">
          <textarea
            rows="8"
            class="form-control"
            type="text"
            placeholder="Detailed Info"
            v-model.trim="info"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Original Price: </label>
          <input
            class="form-control"
            type="number"
            placeholder="MRP"
            v-model.trim="price"
          />
        </div>
        <div class="form-group">
          <label>Discounted Price: </label>
          <input
            class="form-control"
            type="number"
            placeholder="Discounted Price"
            v-model.trim="discount_price"
          />
        </div>
        <div class="form-group">
          <label class="my-15">Category that it belongs to:</label><br />
          <div v-for="cat in available_categories" :key="cat">
            <input
              type="radio"
              class="check"
              :id="cat"
              :value="cat"
              v-model="category_name"
            />
            <label :for="cat">{{ cat }}</label>
          </div>
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
        <div class="form-group">
          <button class="mt-10">Add Product</button>
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
      images: [],
      imageData: []
    };
  },
  methods: {
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
        this.resetInputs();
        this.isLoading = false;
        this.$router.push({
          name: "viewProducts"
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
