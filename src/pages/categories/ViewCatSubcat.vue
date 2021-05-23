<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="flex flex-col items-center p-5">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <!-- CATEGORIES -->
    <h1 class="green mb-10">Categories</h1>
    <div class="mx-auto mb-10 w-3/5 sm:w-96">
      <router-link to="/category/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          Create Category
        </div>
      </router-link>
    </div>
    <div class="m-5 md:w-1/2">
      <div
        v-for="(cat, index) in categories"
        :key="index"
        class="grid grid-cols-2"
      >
        <h4 class="text-gray-900 lg:text-xl lg:font-light flex items-center">
          {{ cat.name }}
        </h4>
        <div>
          <div
            class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
            style="width:150px;"
          >
            <button
              @click="updateCategory(cat.id)"
              class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
            >
              Update
            </button>
          </div>
          <div
            class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
            style="width:150px;"
          >
            <button
              @click="deleteCategory(cat.id)"
              class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <br /><br /><br />

    <!-- SUBCATEGORIES -->
    <h1 class="green mb-10">Subcategories</h1>
    <div class="mx-auto mb-10 w-3/5 sm:w-96">
      <router-link to="/subcategory/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          Create Subcategory
        </div>
      </router-link>
    </div>
    <div class="m-5 md:w-1/2">
      <div
        v-for="(subcat, index) in subcategories"
        :key="index"
        class="grid grid-cols-2"
      >
        <h4 class="text-gray-900 lg:text-xl lg:font-light flex items-center">
          {{ subcat.name }}
        </h4>
        <div>
          <div
            class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
            style="width:150px;"
          >
            <button
              @click="updateSubcategory(subcat.id)"
              class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
            >
              Update
            </button>
          </div>
          <div
            class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
            style="width:150px;"
          >
            <button
              @click="deleteSubcategory(subcat.id)"
              class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      subcategories: [],
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  methods: {
    updateCategory(id) {
      this.$router.push({
        name: "ModifyCat",
        params: { cat_id: id }
      });
    },
    updateSubcategory(id) {
      this.$router.push({
        name: "ModifySubcat",
        params: { subcat_id: id }
      });
    },
    async deleteCategory(id) {
      this.isLoading = true;
      const status = await this.$store.dispatch("categories/deleteCategory", {
        cat_id: id,
        token: JSON.parse(localStorage.getItem("user")).access_token
      });
      if (status === 204) {
        this.isLoading = false;
        this.resetInput();
        this.isSuccessMsg = true;
        this.toastMsg = "Category deleted successfully.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 2000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else if (status === 800) {
        this.isSuccessMsg = false;
        this.toastMsg =
          "Products of this category still exist. Please delete them before deleting this category.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
      } else {
        this.isSuccessMsg = false;
        this.toastMsg = "Something went wrong.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
      }
      this.isLoading = false;
    },
    async deleteSubcategory(id) {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "categories/deleteSubcategory",
        {
          subcat_id: id,
          token: JSON.parse(localStorage.getItem("user")).access_token
        }
      );
      if (status === 204) {
        this.isLoading = false;
        this.resetInput();
        this.isSuccessMsg = true;
        this.toastMsg = "Subcategory deleted successfully.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 2000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else if (status === 800) {
        this.toastMsg =
          "Products of this subcategory still exist. Please delete them before deleting this subcategory.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
      } else {
        this.toastMsg = "Something went wrong.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
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
    const categories = await this.$store.dispatch(
      "categories/getAllCategories"
    );
    const subcategories = await this.$store.dispatch(
      "categories/getAllSubcategories"
    );
    this.categories = categories;
    this.subcategories = subcategories;
    this.isLoading = false;
  }
};
</script>
