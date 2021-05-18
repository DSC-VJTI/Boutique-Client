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
    <div class="text-lg text-gray-800 text-bold" v-html="content"></div>
    <div v-if="isAdmin" class="my-10">
      <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
          style="width:150px;"
        >
        <button @click="updateBlog" class="update">Update</button>
      </div>
      <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
          style="width:150px;"
        >
        <button @click="deleteBlog" class="delete">Delete</button>
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
