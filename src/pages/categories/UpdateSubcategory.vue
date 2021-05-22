<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Update Subcategory</h1>
    <div class="lg:p-10">
      <form class="lg:m-5" @submit.prevent="updateSubcategory">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Subcategory Name"
            v-model.trim="name"
            required
          />
        </div>
        <div class="form-group">
          <label class="mr-5 text-xl font-semibold">Category:</label>
          <select
            v-model.trim="category_name"
            class="px-5 py-2 border-2 w-1/2 outline-none"
          >
            <option
              class="py-5 text-gray-700 text-base font-light"
              v-for="(cat, key) in available_categories"
              :key="key"
            >
              {{ cat }}
            </option>
          </select>
        </div>
        <div class="mx-auto w-4/5 md:w-1/4 form-group">
          <button class="mt-10" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subcat_id"],
  data() {
    return {
      name: "",
      category_name: "",
      available_categories: [],
      isLoading: false
    };
  },
  methods: {
    async updateSubcategory() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "categories/updateSubcategory",
        {
          body: {
            name: this.name,
            category_name: this.category_name
          },
          token: JSON.parse(localStorage.getItem("user")).access_token,
          subcat_id: this.subcat_id
        }
      );

      if (status === 200) {
        this.isLoading = false;
        this.name = "";
        alert("Subcategory name updated successfully!");
        this.$router.replace("/categories");
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        alert("Something went wrong");
      }
      this.isLoading = false;
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
    const subcat = await this.$store.dispatch("categories/getSubcategory", {
      subcat_id: this.subcat_id
    });
    this.name = subcat.name;
    this.category_name = subcat.category_name;

    const allCategories = await this.$store.dispatch(
      "categories/getAllCategories"
    );
    this.available_categories = allCategories.map(obj => obj.name);

    this.isLoading = false;
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
