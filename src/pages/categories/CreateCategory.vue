<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
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
      name: "",
      isLoading: false
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
        alert("New category created!");
        this.$router.replace("/categories");
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        alert("Something went wrong");
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
