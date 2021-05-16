export default {
  getAccessToken(state) {
    return state.user.access_token;
  },
  getRole(state) {
    return state.user.is_admin;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  rememberMe(state) {
    return state.rememberMe;
  }
};
