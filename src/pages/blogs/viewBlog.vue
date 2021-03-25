<template>
  <div>
    <h1 class="green-blog-headings">{{ title }}</h1>
    <p class="mt-4 pb-2 font-sans text-green-600 border-b-4 border-green-700">
      Last Updated on: {{ last_updated }}
    </p>
    <p class="mt-4 text-lg text-green-800 text-bold">
      {{ content }}
    </p>
    <div v-show="isAdmin">
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
      return JSON.parse(localStorage.getItem("isAuthenticated"));
    },
    getBlogId() {
      // return this.$route.params.blogId;
      return this.blogId;
    }
  },
  methods: {
    updateBlog() {
      this.$router.push({ path: `update/${this.getBlogId}` });
    },

    async deleteBlog() {
      // ask for confirmation
      const status = await this.$store.dispatch("blogs/deleteCurrentBlog", {
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.getBlogId
      });

      if (status === 204) {
        this.$router.push({
          name: "seeBlogs"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorized");
      } else {
        console.log(status);
        alert("Something went wrong. Please try again!");
      }
    }
  },

  async created() {
    const response = await this.$store.dispatch("blogs/getABlog", {
      blog_id: this.getBlogId
    });
    this.title = response.data.title;
    this.created_on = response.data.created_on;
    this.last_updated = response.data.last_updated;
    this.content = response.data.content;
  }
};
</script>
