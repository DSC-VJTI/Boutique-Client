import axios from "axios";
import router from "../../routes";

export default {
  async login(context, payload) {
    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/login/",
        payload.body,
        context.rootGetters.getConfig
      );
      context.commit("setUser", response.data);
      context.commit("setAuth", { isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async register(context, payload) {
    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/register/",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  unauthorize(context) {
    context.commit("setUser", { access_token: "" });
    context.commit("setAuth", { isAuthenticated: false });
    context.commit("setRememberMe", { rememberMe: false });
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    if (localStorage.getItem("isAuthenticated"))
      localStorage.removeItem("isAuthenticated");
    if (localStorage.getItem("rememberMe"))
      localStorage.removeItem("rememberMe");
    router.push("/");
  }
};
