<template>
  <div class="p-5 text-center">
    <h1 class="green mb-10">New Subcategory</h1>
    <div class="grid grid-cols-2 gap-4">
      <form class="m-5" @submit.prevent="newSubcategory">
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
          <input
            class="form-control"
            type="text"
            placeholder="Category Name"
            v-model.trim="category_name"
            required
          />
        </div>
        <div class="form-group">
          <button class="mt-10">Add Subcategory</button>
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
      category_name: ""
    };
  },
  methods: {
    async newSubcategory() {
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
        this.resetInput();
        alert("New subcategory created!");
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
