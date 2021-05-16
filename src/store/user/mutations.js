export default {
  setUser(state, payload) {
    state.user.access_token = payload.access_token;
    state.user.is_admin = payload.is_admin;
  },
  setAuth(state, payload) {
    state.isAuthenticated = payload.isAuthenticated;
  },
  setRememberMe(state, payload) {
    state.rememberMe = payload.rememberMe;
  }
};
