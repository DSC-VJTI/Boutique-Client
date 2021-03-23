<template>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Update Blog</h1>
    <div>
      <form class="m-5" @submit.prevent="updateBlog">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Title of the Blog"
            v-model.trim="title"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ titleError }}</span>
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            type="text"
            placeholder="Content"
            v-model.trim="content"
            rows="20"
            cols="10"
            required
          ></textarea>
          <br /><span class="text-red-600 font-bold">{{ contentError }}</span>
        </div>
        <div class="form-group">
          <button class="mt-10">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      titleError: "",
      content: "",
      contentError: "",
      isValid: true
    };
  },
  computed: {
    getBlogId() {
      return this.$route.params.blogId;
    }
  },
  methods: {
    validate() {
      this.isValid = true;

      const titlePattern = /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*){1,5}$/g;

      if (!titlePattern.test(this.title)) {
        this.titleError =
          "*Please enter a title which is not empty and has less than 6 words.";
        this.isValid = false;
      } else this.titleError = "";

      if (this.content === "") {
        this.contentError = "*You cannot keep the content blank.";
        this.isValid = false;
      } else this.contentError = "";
    },

    async updateBlog() {
      this.validate();

      if (!this.isValid) return;

      const status = await this.$store.dispatch("blogs/updateCurrentBlog", {
        body: {
          content: this.content,
          title: this.title
        },
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.getBlogId
      });

      if (status === 200) {
        this.resetInputs();
        this.resetErrors();
        this.$router.push({
          name: "seeBlog",
          params: this.getBlogId
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorized");
      } else {
        console.log(status);
        alert("Something went wrong");
      }
    },
    resetErrors() {
      this.contentError = "";
      this.titleError = "";
    },
    resetInputs() {
      this.content = "";
      this.title = "";
    }
  },

  created() {
    this.$store
      .dispatch("blogs/getABlog", {
        blog_id: this.getBlogId
      })
      .then(response => {
        this.title = response.data.title;
        this.content = response.data.content;
      });
  }
};
</script>

<style></style>
