<template>
  <base-spinner :show="isLoading"></base-spinner>
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
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    ckeditor: CKEditor.component
  },
  props: ["blogId"],
  data() {
    return {
      title: "",
      titleError: "",
      contentError: "",
      isValid: true,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        height: "500px"
      },
      isLoading: false
    };
  },
  methods: {
    validate() {
      this.isValid = true;

      const titlePattern = /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*){1,10}$/g;

      if (!titlePattern.test(this.title)) {
        this.titleError =
          "*Please enter a title which is not empty and has not more than 10 words.";
        this.isValid = false;
      } else this.titleError = "";

      if (this.editorData === "") {
        this.contentError = "*You cannot keep the content blank.";
        this.isValid = false;
      } else this.contentError = "";
    },

    async updateBlog() {
      this.isLoading = true;
      this.validate();

      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch("blogs/updateCurrentBlog", {
        body: {
          content: this.editorData,
          title: this.title
        },
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.blogId
      });

      if (status === 200) {
        this.resetInputs();
        this.resetErrors();
        this.isLoading = false;
        this.$router.push({
          name: "seeBlog",
          params: {
            blogId: this.blogId
          }
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        alert("Something went wrong");
      }
      this.isLoading = false;
    },
    resetErrors() {
      this.contentError = "";
      this.titleError = "";
    },
    resetInputs() {
      this.editorData = "";
      this.title = "";
    }
  },

  async created() {
    const blog = await this.$store.dispatch("blogs/getABlog", {
      blog_id: this.blogId
    });
    this.title = blog.title;
    setTimeout(() => {
      this.editorData = blog.content;
    }, 100);
  }
};
</script>

<style></style>
