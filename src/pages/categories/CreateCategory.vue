<template>
<base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
  <toast-message :type="isSuccessMsg" :msg="toastMsg" :show="errorOccured"></toast-message>
    <h1 class="green mb-10">Create Category</h1>
    <div class="lg:p-10">
      <form class="lg:m-5" @submit.prevent="newCategory">
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
  data() {
    return {
      name: '',
      isLoading: false,
      errorOccured: false,
      toastMsg: '',
      isSuccessMsg: false
    };
  },
  methods: {
    async newCategory() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "categories/createNewCategory",
        {
          body: {
            name: this.name
          },
          token: JSON.parse(localStorage.getItem("user")).access_token
        }
      );

      if (status === 201) {
        this.isLoading = false;
        this.resetInput();
        this.isSuccessMsg = true;
        this.toastMsg = "New category created!";
        this.errorOccured = true;
        setTimeout(() => {
          this.errorOccured = false;
          this.$router.replace("/categories");
        }, 10000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        this.callToast("Something went wrong.")
      }
      this.isLoading = false;
    },
    resetInput() {
      this.name = "";
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
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
