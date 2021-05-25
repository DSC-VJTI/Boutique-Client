<template>
  <div class="carousel-cell">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <img :src="imageURL" alt="" />
    <div
      class="carousel-text hidden absolute sm:inset-y-1/3 left-50 md:left-10 w-full h-full"
    >
      <p class="text-red-300 text-base font-mono p-2 tracking-widest">
        {{ tag }}
      </p>
      <h1 class="font-extrabold font-serif text-5xl text-white mb-5 w-1/2">
        {{ title }}
      </h1>
      <p class="font-sans text-base text-white mb-5 w-1/2">
        {{ description }}
      </p>
      <div class="">
        <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0 text-sm"
          style="width:100px;"
        >
          <button @click="updateSlide" class="update">
            Update
          </button>
        </div>
        <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0 text-sm"
          style="width:100px;"
        >
          <button @click="deleteSlide" class="delete">
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
  data() {
    return {
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
    updateSlide() {
      this.$router.push({ name: "updateSlide", params: { slideId: this.id } });
    },
    async deleteSlide() {
      this.isLoading = true;
      const status = await this.$store.dispatch("carousel/deleteSlide", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        slide_id: this.id
      });
      if (status === 204) {
        this.isLoading = false;
        this.displayToast(true, "Slide deleted successfully.");
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
      }
      this.isLoading = false;
    }
  }
};
</script>
