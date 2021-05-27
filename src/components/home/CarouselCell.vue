<template>
  <div class="carousel-cell">
    <img :src="imageURL" alt="" />
    <div
      class="carousel-text hidden absolute inset-y-1/3 top-10 sm:top-40 md:left-10 w-1/3 sm:w-full"
    >
      <p class="text-red-300 text-base font-mono w-5/6 tracking-widest ml-8">
        {{ tag }}
      </p>
      <h1 class="font-extrabold font-serif text-5xl text-white mb-5 w-5/6 sm:w-1/2 ml-8">
        {{ title }}
      </h1>
      <p class="font-sans text-base text-white mb-5 w-5/6 sm:w-1/2 ml-8">
        {{ description }}
      </p>
      <div class="">
        <div
          class="inline-block w-11/12 md:w-3/4 ml-8 text-sm"
          style="width:100px;"
        >
          <button v-if="isAdmin" @click="updateSlide" class="update">
            Update
          </button>
        </div>
        <div
          class="inline-block w-11/12 md:w-3/4 ml-4 text-sm"
          style="width:100px;"
        >
          <button v-if="isAdmin" @click="deleteSlide" class="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["imageURL", "title", "tag", "description", "id"],
  emits: ["loading", "toast"],
  methods: {
    updateSlide() {
      this.$router.push({ name: "updateSlide", params: { slideId: this.id } });
    },
    async deleteSlide() {
      this.$emit("loading", true);
      const status = await this.$store.dispatch("carousel/deleteSlide", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        slide_id: this.id
      });
      if (status === 204) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: true,
          msg: "Slide deleted successfully."
        });
      } else if (status === 401) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: false,
          msg: "You are not authorized."
        });
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
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
