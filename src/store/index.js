import { createStore } from "vuex";
import userModule from "./user/index";
import blogsModule from "./blogs/index";
<<<<<<< HEAD
import productsModule from "./products/index";
=======
import measurementsModule from "./measurements/index";
import materialsModule from "./materials/index";
>>>>>>> upstream/main

const store = createStore({
  modules: {
    user: userModule,
    blogs: blogsModule,
<<<<<<< HEAD
    products: productsModule
=======
    measurements: measurementsModule,
    materials: materialsModule
>>>>>>> upstream/main
  },
  state() {
    return {
      // url: process.env.VUE_APP_API_BASE_URL,
      url:
        process.env.VUE_APP_API_BASE_URL ||
        "https://boutique-server.herokuapp.com/",
      config: {
        headers: {
          ContentType: "application/json"
        }
      }
    };
  },
  getters: {
    getUrl(state) {
      return state.url;
    },
    getConfig(state) {
      return state.config;
    }
  }
});

export default store;
