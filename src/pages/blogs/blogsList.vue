<template>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Blogs</h1>
    <blog-item
      class="shadow-md hover:translate-y-4"
      v-for="blog in blogs"
      :key="blog.id"
      :title="blog.title"
      :content="blog.content"
      :last_updated="blog.last_updated"
      :id="blog.id"
    >
    </blog-item>
  </div>
</template>

<script>
import blogItem from "./BlogItem.vue";
export default {
  components: { blogItem },
  data() {
    return {
      blogs: []
    };
  },

  async created() {
    const promise = await this.$store.dispatch("blogs/getAllBlogs");
    this.blogs = promise;
  }
};
</script>
