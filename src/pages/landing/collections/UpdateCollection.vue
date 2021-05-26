<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="m-5 sm:ml-5 inline-block">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <router-link
      class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
      to="/"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
  <div class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4">
    <div class="space-y-6 bg-white">
      <div
        class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
      >
        <h2 class="mx-auto text-2xl text-gray-700">Update Collection</h2>
      </div>
      <div class="p-5 text-center">
        <label
          class="bg-gray-900 cursor-pointer text-green-500 py-2 px-4 hover:bg-gray-50 hover:border-green-500 border transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
          style="width: 100%;"
          for="file-input"
          >Add Cover Photo
          <input
            id="file-input"
            type="file"
            ref="files"
            @change="selectImage()"
            class="hidden"
          />
        </label>
      </div>
      <div
        v-if="imageData"
        class="col-span-3 file-listing sketchPreview"
        :style="{ 'background-image': `url(${imageData})` }"
      >
        <span
          v-if="imageData"
          class="float-right px-2 m-2 text-white bg-red-500 rounded-full"
          @click="removeFile()"
          >X</span
        >
      </div>
      <form class="mx-5" @submit.prevent="updateCollection">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Title of collection"
            v-model.trim="title"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ titleError }}</span>
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            type="text"
            placeholder="Description"
            v-model.trim="description"
            rows="5"
          ></textarea>
        </div>
        <div class="mx-auto w-4/5 md:w-1/4 form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cId"],
  data() {
    return {
      title: "",
      titleError: "",
      description: "",
      isValid: true,
      file: null,
      image: null,
      imageData: null,
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  methods: {
    removeFile() {
      this.file = null;
      this.image = null;
      this.imageData = null;
    },
    selectImage() {
      this.file = null;
      this.imageData = null;

      let uploadedFile = this.$refs.files.files[0];
      this.file = uploadedFile;

      // for (let img of this.images) {
      if (uploadedFile && uploadedFile.name) {
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            this.imageData = reader.result;
          }.bind(this),
          false
        );

        reader.readAsDataURL(uploadedFile);
      }
    },
    validate() {
      this.isValid = true;
      if (this.title.length == 0) {
        this.titleError = "Title cannot be empty.";
        this.isValid = false;
      } else this.titleError = "";
    },
    displayToast(isSuccessMsg, msg) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
    },
    async updateCollection() {
      this.isLoading = true;
      this.validate();
      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      let payload = {
        body: {
          title: this.title,
          description: this.description,
          image: this.image
        },
        image: this.file,
        token: JSON.parse(localStorage.getItem("user")).access_token,
        c_id: this.cId
      };

      const status = await this.$store.dispatch(
        "collections/updateCollection",
        payload
      );

      if (status === 200) {
        this.resetInputs();
        this.resetErrors();
        this.isLoading = false;
        this.displayToast(true, "Collection updated successfully.");
        setTimeout(() => this.$router.push({ path: "/" }), 3000);
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
      }
      this.isLoading = false;
    },
    resetErrors() {
      this.titleError = "";
    },
    resetInputs() {
      this.title = "";
      this.description = "";
      this.imageData = "";
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
    const collection = await this.$store.dispatch(
      "collections/getACollection",
      {
        c_id: this.cId
      }
    );
    this.title = collection.title;
    this.description = collection.description;
    this.image = collection.image;
    this.imageData = collection.image;
    this.isLoading = false;
  }
};
</script>
