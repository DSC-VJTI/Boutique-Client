<template>
  <div class="w-10/12 md:w-2/3 lg:w-3/5 mx-auto my-10">
    <h1 class="text-gray-800 text-3xl md:text-5xl font-bold font-serif mb-12">{{ title }}</h1>
    <p class="mb-20 text-base font-sans italic text-gray-500 border-b-2 border-gray-300">
      Last Updated on: <span class="text-gray-700">{{ last_updated }}</span>
    </p>
    <div class="text-lg text-gray-800 text-bold" v-html="content"></div>
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
      last_updated: ""
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
      const status = await this.$store.dispatch("blogs/deleteCurrentBlog", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.blogId
      });

      if (status === 204) {
        this.$router.push({
          name: "seeBlogs"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        console.log("Something went wrong. Please try again!");
      }
    }
  },

  async created() {
    const blog = await this.$store.dispatch("blogs/getABlog", {
      blog_id: this.blogId
    });
    this.title = blog.title;
    this.created_on = blog.created_on;
    this.last_updated = blog.last_updated;
    this.content = blog.content;
  }
};
</script>
