import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      collections: []
    };
  },
  getters: {
    getCollections(state) {
      return state.collections;
    }
  },
  mutations: {
    setCollections(state, payload) {
      state.collections = payload.collections;
    }
  },
  actions: actions
};
