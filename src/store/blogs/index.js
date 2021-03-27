import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      blogs: []
    };
  },
  getters: {
    getBlogs(state) {
      return state.blogs;
    }
  },
  mutations: {
    setBlogs(state, payload) {
      state.blogs = payload;
    }
  },
  actions: actions
};
