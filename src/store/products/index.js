import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      products: []
    };
  },
  getters: {
    getProducts(state) {
      return state.products;
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload.products;
    }
  },
  actions: actions
};
