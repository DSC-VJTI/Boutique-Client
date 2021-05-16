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
      if (response.status == 201 && response.data) {
        const blogs = context.getters.getBlogs;
        blogs.push(response.data);
        context.commit("setBlogs", {
          blogs: blogs
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
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
      context.commit("setBlogs", { blogs: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getABlog(context, payload) {
    const blogs = context.getters.getBlogs;
    const blog = blogs.filter(b => b.id == payload.blog_id);
    if (blog.length) return blog[0];

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
      return error.response ? error.response.status : 500;
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
      if (response.status == 200 && response.data) {
        const blogs = context.getters.getBlogs;
        const blogIndex = blogs.findIndex(b => b.id == payload.blog_id);
        if (blogIndex !== -1) {
          blogs[blogIndex] = response.data;
        }
        context.commit("setBlogs", {
          blogs: blogs
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
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

      if (response.status == 204) {
        const blogs = context.getters.getBlogs;
        const blogIndex = blogs.findIndex(b => b.id == payload.blog_id);

        if (blogIndex !== -1) {
          blogs.splice(blogIndex, 1);
          context.commit("setBlogs", {
            blogs: blogs
          });
        }
      }

      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
