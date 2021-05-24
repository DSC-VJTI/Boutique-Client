<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="p-5 text-center">
    <h1 class="text-gray-800 text-5xl font-bold font-serif mb-10">Blogs</h1>
    <blog-item
      v-for="blog in blogs"
      :key="blog.id"
      :title="blog.title"
      :content="blog.content"
      :cover_photo="blog.image"
      :last_updated="blog.last_updated"
      :id="blog.id"
    >
    </blog-item>
    <h3
      v-if="blogs.length === 0"
      class="text-2xl mt-8 font-light text-gray-900"
    >
      Blogs on their way, Stay Tuned...
    </h3>
  </div>
</template>

<script>
import blogItem from "../../components/blogs/BlogItem.vue";
export default {
  components: { blogItem },
  data() {
    return {
      blogs: [],
      isLoading: false
    };
  },

  async created() {
    this.isLoading = true;
    const blogs = await this.$store.dispatch("blogs/getAllBlogs");
    this.blogs = blogs;
    this.isLoading = false;
  }
};
</script>
