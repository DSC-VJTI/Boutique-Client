<template>
  <div class="p-5 text-center">
    <h1 class="green mb-10">New Category</h1>
    <div class="grid grid-cols-2 gap-4">
      <form class="m-5" @submit.prevent="newCategory">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Category Name"
            v-model.trim="name"
            required
          />
        </div>
        <div class="form-group">
          <button class="mt-10">Add Category</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    async newCategory() {
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
        this.resetInput();
        alert("New category created!");
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        alert("Something went wrong");
      }
    },
    resetInput() {
      this.name = "";
    }
  },
  created() {
    if (!this.$store.getters["user/isAuthenticated"]) {
      if (
        !localStorage.getItem("isAuthenticated") ||
        localStorage.getItem("isAuthenticated") === false
      )
        this.$router.replace("/admin/login");
      else this.$store.commit("user/setAuth", { isAuthenticated: true });
    }
  }
};
</script>

<style>
.check {
  @apply m-3;
}
</style>
