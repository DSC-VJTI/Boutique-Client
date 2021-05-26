<template>
  <div>
    <div
      :style="{ backgroundImage: `url(${image})` }"
      class="bg-no-repeat bg-cover bg-center sm:w-96 h-96"
      :class="{ 'order-last': false, 'md:order-last': reverse }"
    ></div>
    <div
      class="sm:p-4 lg:p-0 flex flex-col items-center sm:items-start w-96 sm:my-10"
    >
      <h1
        class="font-extrabold font-serif text-3xl md:text-5xl text-gray-800 sm:mt-5 md:mb-5 w-full"
      >
        {{ title }}
      </h1>
      <p
        class="font-sans text-lg md:text-2xl font-light text-gray-800 mb-10 w-full"
      >
        {{ description }}
      </p>
      <div v-if="isAdmin" class="flex flex-row justify-start">
        <div class="pt-2 pb-2 pr-2 w-11/12 md:w-3/4 mx-0" style="width:150px;">
          <button
            @click="updateCollection"
            class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          >
            Update
          </button>
        </div>
        <div class="pt-2 pb-2 pr-2 w-11/12 md:w-3/4 mx-0" style="width:150px;">
          <button
            @click="deleteCollection"
            class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "title", "description", "id", "reverse"],
  emits: ["loading", "toast"],
  methods: {
    updateCollection() {
      this.$router.push({ name: "UpdateCollection", params: { cId: this.id } });
    },
    async deleteCollection() {
      this.$emit("loading", true);
      const status = await this.$store.dispatch(
        "collections/deleteCollection",
        {
          token: JSON.parse(localStorage.getItem("user")).access_token,
          c_id: this.id
        }
      );
      if (status === 204) {
        this.$emit("loading", false);
        this.$emit("toast", {
          isSuccessMsg: true,
          msg: "Collection deleted successfully."
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
