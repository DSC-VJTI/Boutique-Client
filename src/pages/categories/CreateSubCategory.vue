<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <h1 class="green mb-10">New Subcategory</h1>
    <div class="lg:p-10">
      <form class="lg:m-5" @submit.prevent="newSubcategory">
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
          <button class="mt-10">Save</button>
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
      category_name: "",
      available_categories: [],
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  methods: {
    displayToast(isSuccessMsg, msg) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
    },
    async newSubcategory() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "categories/createNewSubcategory",
        {
          body: {
            name: this.name,
            category_name: this.category_name
          },
          token: JSON.parse(localStorage.getItem("user")).access_token
        }
      );

      if (status === 201) {
        this.isLoading = false;
        this.resetInput();
        this.displayToast(true, "New subcategory created successfully.");
        setTimeout(() => this.$router.replace("/categories"), 3000);
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else if (status === 400) {
        this.displayToast(
          false,
          "Subategory with this name already exists. Please choose a new name."
        );
      } else {
        this.displayToast(false, "Something went wrong.");
      }
      this.isLoading = false;
    },
    resetInput() {
      this.name = "";
      this.category_name = "";
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
