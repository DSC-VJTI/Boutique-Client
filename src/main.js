import { createApp } from "vue";
import "@/assets/css/styles.css";
import App from "@/App.vue";
import store from "@/store";
import router from "@/routes.js";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-spinner", BaseSpinner);

app.mount("#app");
