import actions from "./actions.js";

export default {
  namespaced: true,
  state() {
    return {
      slides: []
    };
  },
  getters: {
    getSlides(state) {
      return state.slides;
    }
  },
  mutations: {
    setSlides(state, payload) {
      state.slides = payload.slides;
    }
  },
  actions: actions
};
