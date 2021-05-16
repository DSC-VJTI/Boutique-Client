import { createApp } from "vue";
import "@/assets/css/styles.css";
import App from "@/App.vue";
import store from "@/store";
import router from "@/routes.js";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(CKEditor);

app.component("base-spinner", BaseSpinner);

app.mount("#app");
