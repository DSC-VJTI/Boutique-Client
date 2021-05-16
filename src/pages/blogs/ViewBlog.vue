<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="w-10/12 md:w-2/3 lg:w-3/5 mx-auto my-10 bg-white p-7 shadow-2xl">
    <h1 class="text-gray-800 text-3xl md:text-5xl font-bold font-serif mb-12">
      {{ title }}
    </h1>
    <p
      class="mb-7 text-base font-sans italic text-gray-500 border-b-2 border-gray-300"
    >
      Last Updated on: <span class="text-gray-700">{{ last_updated }}</span>
    </p>
    <div class="my-container" v-html="content"></div>
    <div v-if="isAdmin" class="my-10">
      <button @click="updateBlog" class="update">Update</button>
      <button @click="deleteBlog" class="delete ml-5">Delete</button>
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
      isLoading: false
    };
  },
  computed: {
    isAdmin() {
      return (
        this.$store.getters["user/isAuthenticated"] ||
        JSON.parse(localStorage.getItem("isAuthenticated"))
      );
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
        this.$router.push({
          name: "seeBlogs"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        console.log("Something went wrong. Please try again!");
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
