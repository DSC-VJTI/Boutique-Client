import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
      subcategories: []
    };
  },
  getters: {
    getSubcategories(state) {
      return state.subcategories;
    },
    getCategories(state) {
      return state.categories;
    }
  },
  mutations: {
    setSubcategories(state, payload) {
      state.subcategories = payload.subcategories;
    },
    setCategories(state, payload) {
      state.categories = payload.categories;
    }
  },
  actions: actions
};
