<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Edit Product Info</h1>
    <div>
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
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Category that it belongs to"
            v-model.trim="category_name"
            required
          />
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
          <button class="mt-10">Modify Product</button>
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
      available_subcategories: [
        "Women's Clothing",
        "Men's Clothing",
        "Winter Clothing",
        "Earings"
      ],
      isLoading: false
    };
  },
  methods: {
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
            sub_categories: this.sub_categories
          },
          token: JSON.parse(localStorage.getItem("user")).access_token,
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
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
