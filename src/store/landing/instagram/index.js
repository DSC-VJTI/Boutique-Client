import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      items: []
    };
  },
  getters: {
    getItems(state) {
      return state.items;
    }
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload.items;
    }
  },
  actions: actions
};
