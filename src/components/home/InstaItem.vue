<template>
  <div class="relative h-64 w-full">
    <div class="productImage" :style="{ backgroundImage: `url(${image})` }">
      <span
        v-if="isAdmin"
        class="float-right text-red-500 bg-transparent m-2 text-2xl hover:opacity-80 cursor-pointer"
        @click="deleteItem()"
        ><i class="fas fa-times-circle"></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "image"],
  emits: ["loading", "toast"],
  methods: {
    async deleteItem() {
      this.$emit("loading", true);
      const status = await this.$store.dispatch("instagram/deleteItem", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        image_id: this.id
      });
      if (status === 204) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: true,
          msg: "Item deleted successfully."
        });
      } else if (status === 401) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: false,
          msg: "You are not authorized."
        });
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else if (status === 404) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: false,
          msg: "This image does not exist. Please refresh the page."
        });
      } else {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: false,
          msg: "Something went wrong."
        });
      }
    }
  },
  computed: {
    isAdmin() {
      return JSON.parse(localStorage.getItem("user"))
        ? this.$store.getters["user/getRole"] ||
            JSON.parse(localStorage.getItem("user")).is_admin
        : false;
    }
  }
};
</script>
