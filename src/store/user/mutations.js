export default {
  setUser(state, payload) {
    state.user.access_token = payload.access_token;
  },
  setAuth(state, payload) {
    state.isAuthenticated = payload.isAuthenticated;
  },
  setRememberMe(state, payload) {
    state.rememberMe = payload.rememberMe;
  }
};
