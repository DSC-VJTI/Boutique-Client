import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      materials: []
    };
  },
  getters: {
    getMaterials(state) {
      return state.materials;
    }
  },
  mutations: {
    setMaterials(state, payload) {
      state.materials = payload.materials;
    }
  },
  actions: actions
};
