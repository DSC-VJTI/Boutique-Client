<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="mb-5 text-center">
    <h1 class="text-gray-800 text-2xl font-serif font-bold mb-4">
      New Blog
    </h1>
    <div>
      <form class="mx-5" @submit.prevent="newBlog">
        <div class="form-group mb-8">
          <input
            class="form-control-blog"
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
        <div class="form-group" style="width:370px;">
          <button class="mt-3">Create Blog</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default {
  data() {
    return {
      title: "",
      titleError: "",
      contentError: "",
      isValid: true,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        plugins: [
          Essentials,
          Autoformat,
          BlockQuote,
          Heading,
          List,
          ListStyle,
          TodoList,
          Alignment,
          Font,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Link,
          Paragraph
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "link",
            "blockQuote",
            "|",
            "undo",
            "redo"
          ],
          shouldNotGroupWhenFull: true
        }
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

    async newBlog() {
      this.isLoading = true;
      this.validate();

      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch("blogs/createNewBlog", {
        body: {
          content: this.editorData,
          title: this.title
        },
        token: JSON.parse(localStorage.getItem("user")).access_token
      });

      if (status === 201) {
        this.resetInputs();
        this.resetErrors();
        this.isLoading = false;
        this.$router.push({
          name: "seeBlogs"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
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
  created() {
    if (!this.$store.getters["user/isAuthenticated"]) {
      if (
        !localStorage.getItem("isAuthenticated") ||
        localStorage.getItem("isAuthenticated") === false
      )
        this.$router.replace("/admin/login");
      else this.$store.commit("user/setAuth", { isAuthenticated: true });
    }
  }
};
</script>

<style>
.ck,
.ck p {
  @apply bg-transparent;
}
.ck-content {
  height: 450px;
}
</style>
