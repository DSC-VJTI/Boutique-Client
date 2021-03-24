import { createStore } from "vuex";
import userModule from "./user/index";
import blogsModule from "./blogs/index";

const store = createStore({
  modules: {
    user: userModule,
    blogs: blogsModule
  },
  state() {
    return {
      // url: process.env.VUE_APP_API_BASE_URL,
      url: "https://boutique-server.herokuapp.com/",
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