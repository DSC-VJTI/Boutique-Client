import { createApp } from "vue";
import "@/assets/css/styles.css";
import App from "@/App.vue";
import store from "@/store";
import router from "@/routes.js";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
