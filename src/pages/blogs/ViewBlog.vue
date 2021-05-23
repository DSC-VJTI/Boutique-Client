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
      to="/blogs"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
  <div class="w-10/12 md:w-2/3 lg:w-3/5 mx-auto my-10 bg-white p-7 shadow-2xl">
    <h1 class="text-gray-800 text-3xl md:text-5xl font-bold font-serif mb-5">
      {{ title }}
    </h1>
    <p
      class="mb-7 text-base font-sans italic text-gray-500 border-b-2 border-gray-300"
    >
      Last Updated on: <span class="text-gray-700">{{ last_updated }}</span>
    </p>
    <div
      class="col-span-3 file-listing blogCover"
      :style="{ 'background-image': `url(${cover_photo})` }"
    ></div>
    <div class="my-container my-5" v-html="content"></div>
    <div v-if="isAdmin">
      <div class="p-2 inline-block w-11/12 md:w-3/4 mx-0" style="width:150px;">
        <button
          @click="updateBlog"
          class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
        >
          Update
        </button>
      </div>
      <div class="p-2 inline-block w-11/12 md:w-3/4 mx-0" style="width:150px;">
        <button
          @click="deleteBlog"
          class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blogId"],
  data() {
    return {
      title: "",
      content: "",
      created_on: "",
      last_updated: "",
      cover_photo: "",
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  computed: {
    isAdmin() {
      return JSON.parse(localStorage.getItem("user"))
        ? this.$store.getters["user/getRole"] ||
            JSON.parse(localStorage.getItem("user")).is_admin
        : false;
    }
  },
  methods: {
    updateBlog() {
      this.$router.push({ path: `update/${this.blogId}` });
    },

    async deleteBlog() {
      this.isLoading = true;
      const status = await this.$store.dispatch("blogs/deleteCurrentBlog", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.blogId
      });

      if (status === 204) {
        this.isLoading = false;
        this.isSuccessMsg = true;
        this.toastMsg = "Insertion successful.";
        this.errorOccured = true;
        setTimeout(() => {
          this.errorOccured = false;
          this.$router.push({ name: "seeBlogs" });
        }, 2000);
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        this.toastMsg = "Something went wrong.";
        this.errorOccured = true;
        setTimeout(() => (this.errorOccured = false), 3000);
      }
      this.isLoading = false;
    }
  },

  async created() {
    this.isLoading = true;
    const blog = await this.$store.dispatch("blogs/getABlog", {
      blog_id: this.blogId
    });
    this.title = blog.title;
    this.created_on = blog.created_on;
    this.last_updated = blog.last_updated;
    this.content = blog.content;
    this.cover_photo = blog.image;
    this.isLoading = false;
  }
};
</script>

<style scoped>
.my-container {
  /* Remove the background color to make it transparent */
  background-color: #fff;
  @apply text-xl;
}

.my-container::v-deep(blockquote) {
  overflow: hidden;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: solid 5px hsl(0, 0%, 80%);
}

.my-container::v-deep(a) {
  @apply text-green-500;
}

.my-container::v-deep(ul),
.my-container::v-deep(ol),
.my-container::v-deep(dl) {
  /* IE7: reset rtl list margin. (#7334) */
  *margin-right: 0px;
  /* preserved spaces for list items with text direction other than the list.    (#6249,#8049)*/
  padding: 0 40px;
}

.my-container::v-deep(h2) {
  @apply text-4xl;
  @apply font-bold;
}

.my-container::v-deep(hr) {
  border: 0px;
  border-top: 1px solid #ccc;
}

.my-container::v-deep(img.right) {
  border: 1px solid #ccc;
  float: right;
  margin-left: 15px;
  padding: 5px;
}

.my-container::v-deep(img.left) {
  border: 1px solid #ccc;
  float: left;
  margin-right: 15px;
  padding: 5px;
}

.my-container::v-deep(re) {
  white-space: pre-wrap; /* CSS 2.1 */
  word-wrap: break-word; /* IE7 */
}
</style>
