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
    const blogs = context.getters.getBlogs;
    if (blogs.length !== 0) return blogs;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/blogs",
        context.rootGetters.getConfig
      );
      context.commit("setBlogs", response.data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getABlog(context, payload) {
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}`,
        {
          headers: {
            ContentType: "application/json"
          }
        }
      );
      return response.data;
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
