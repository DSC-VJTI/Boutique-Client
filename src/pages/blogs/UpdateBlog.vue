<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="m-5 sm:ml-5 inline-block">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <router-link
      class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
      :to="`/blogs/${blogId}`"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
  <div class="mb-5 text-center">
    <h1 class="text-gray-800 text-3xl md:text-5xl font-bold font-serif mb-12">
      Update Blog
    </h1>
    <div>
      <div class="p-5 text-center">
        <label
          class="bg-gray-900 text-green-500 py-2 px-4 hover:bg-gray-50 hover:border-green-500 border transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
          style="width: 100%;"
          for="file-input"
          >Add Cover Photo
          <input
            id="file-input"
            type="file"
            ref="files"
            @change="selectImage()"
            class="hidden"
          />
        </label>
      </div>
      <div
        class="col-span-3 file-listing sketchPreview"
        :style="{ 'background-image': `url(${imageData})` }"
      >
        <span
          v-if="imageData"
          class="float-right text-red-500 bg-transparent m-2 text-2xl hover:opacity-80"
          @click="removeFile()"
          ><i class="fas fa-times-circle"></i
        ></span>
      </div>
      <form class="mx-5" @submit.prevent="updateBlog">
        <div class="form-group mb-8">
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
          <button class="mt-3" style="width:100px;">Update</button>
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
        plugins: [
          Essentials,
          Autoformat,
          BlockQuote,
          Heading,
          List,
          ListStyle,
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
      file: null,
      image: null,
      imageData: null,
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },
  methods: {
    removeFile() {
      this.file = null;
      this.image = null;
      this.imageData = null;
    },
    selectImage() {
      this.file = null;
      this.imageData = null;

      let uploadedFile = this.$refs.files.files[0];
      this.file = uploadedFile;

      // for (let img of this.images) {
      if (uploadedFile && uploadedFile.name) {
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          function() {
            this.imageData = reader.result;
          }.bind(this),
          false
        );

        reader.readAsDataURL(uploadedFile);
      }
    },
    validate() {
      this.isValid = true;
      if (this.title.length == 0) {
        this.titleError = "Title cannot be empty.";
        this.isValid = false;
      } else this.titleError = "";

      if (this.editorData === "") {
        this.contentError = "Content cannot be empty.";
        this.isValid = false;
      } else this.contentError = "";
    },
    displayToast(isSuccessMsg, msg) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
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
          title: this.title,
          image: this.image
        },
        image: this.file,
        token: JSON.parse(localStorage.getItem("user")).access_token,
        blog_id: this.blogId
      });

      if (status === 200) {
        this.resetInputs();
        this.resetErrors();
        this.isLoading = false;
        this.displayToast(true, "Blog updated successfully.");
        setTimeout(
          () =>
            this.$router.push({
              name: "seeBlog",
              params: { blogId: this.blogId }
            }),
          3000
        );
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
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
    if (!this.$store.getters["user/getRole"]) {
      const payload = JSON.parse(localStorage.getItem("user"));
      if (!payload || !payload.is_admin) this.$router.replace("/admin/login");
      else {
        this.$store.commit("user/setAuth", { isAuthenticated: true });
        this.$store.commit("user/setUser", payload);
      }
    }
    this.isLoading = true;
    const blog = await this.$store.dispatch("blogs/getABlog", {
      blog_id: this.blogId
    });
    this.title = blog.title;
    setTimeout(() => {
      this.editorData = blog.content;
    }, 100);
    this.image = blog.image;
    this.imageData = blog.image;
    this.isLoading = false;
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
