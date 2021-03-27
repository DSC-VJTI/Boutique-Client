<template>
  <div>
    <h1 class="green-blog-headings">{{ title }}</h1>
    <p class="mt-4 pb-2 font-sans text-green-600 border-b-4 border-green-700">
      Last Updated on: {{ last_updated }}
    </p>
    <div class="mt-4 text-lg text-green-800 text-bold" v-html="content"></div>
    <div v-if="isAdmin">
      <button @click="updateBlog" class="mt-10 update">Update</button>
      <button @click="deleteBlog" class="mt-10 delete ml-5">Delete</button>
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
        // const blogs = this.$store.getters['blogs/getBlogs'];
        // const blogIndex = blogs.findIndex(blog => blog.id == this.blogId);
        //
        // if (blogIndex !== -1){
        //   blogs.splice(blogIndex, 1);
        //   this.$store.commit('blogs/setBlogs', {
        //     blogs: blogs
        //   });
        // }

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
