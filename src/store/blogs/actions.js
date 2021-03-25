import axios from "axios";

export default {
  async createNewBlog(context, payload) {
    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/blogs",
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
      return error.response.status;
    }
  },

  async getAllBlogs(context) {
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/blogs",
        context.rootGetters.getConfig
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async getABlog(context, payload) {
    try {
      const response = axios.get(
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}`,
        {
          headers: {
            ContentType: "application/json"
          }
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async updateCurrentBlog(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}`,
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
      return error.response.status;
    }
  },

  async deleteCurrentBlog(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  }
};
