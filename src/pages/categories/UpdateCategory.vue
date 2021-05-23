<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <h1 class="green mb-10">Update Category</h1>
    <div class="lg:p-10">
      <form class="lg:m-5" @submit.prevent="updateCategory">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Category Name"
            v-model.trim="name"
            required
          />
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
  props: ["cat_id"],
  data() {
    return {
      name: "",
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  methods: {
    async updateCategory() {
      this.isLoading = true;
      const status = await this.$store.dispatch("categories/updateCategory", {
        body: {
          name: this.name
        },
        token: JSON.parse(localStorage.getItem("user")).access_token,
        cat_id: this.cat_id
      });

      if (status === 200) {
        this.isLoading = false;
        this.resetInput();
        this.isSuccessMsg = true;
        this.toastMsg = "Category updated successfully.";
        this.errorOccured = true;
        setTimeout(() => {
          this.errorOccured = false;
          this.$router.replace("/categories");
        }, 2000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else if (status === 400) {
        this.toastMsg =
          "Category with this name already exists. Please choose a new name.";
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
    const cat = await this.$store.dispatch("categories/getCategory", {
      cat_id: this.cat_id
    });
    this.name = cat.name;
    this.isLoading = false;
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
