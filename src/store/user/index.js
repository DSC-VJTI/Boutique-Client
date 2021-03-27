import getters from "./getters";
import actions from "./actions.js";
import mutations from "./mutations.js";

export default {
  namespaced: true,
  state() {
    return {
      user: {
        access_token: localStorage.getItem["user"]
          ? JSON.parse(localStorage.getItem["user"]).access_token
          : ""
      },
      isAuthenticated: localStorage.getItem["isAuthenticated"] || null,
      rememberMe: localStorage.getItem["rememberMe"] || false
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions
};
