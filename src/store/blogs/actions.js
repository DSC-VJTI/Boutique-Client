import axios from "axios";
import crypto from "crypto";

function getSignature(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

async function uploadToCloudinary(img, name) {
  let url = process.env.VUE_APP_CLOUDINARY_URL;
  let timeStamp = Math.round(new Date() / 1000);
  let preset = process.env.VUE_APP_PRESET;
  let api_key = process.env.VUE_APP_API_KEY;

  let public_id = "blogs/" + name;
  let signature = `overwrite=true&public_id=${public_id}&tags=blog_cover&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("tags", "blog_cover");
  formData.append("public_id", public_id);
  formData.append("overwrite", true);
  formData.append("signature", getSignature(signature));
  formData.append("api_key", api_key);
  formData.append("timestamp", timeStamp);
  formData.append("upload_preset", preset);

  try {
    let response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.secure_url;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
}

export default {
  async createNewBlog(context, payload) {
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (imgurl) payload.body.image = imgurl;
      else return imgurl;
    } else {
      payload.body.image = null;
    }

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/blogs/",
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
        context.rootGetters.getUrl + "api/blogs/",
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
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}/`,
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
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (imgurl) payload.body.image = imgurl;
      else return imgurl;
    }
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}/`,
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
        context.rootGetters.getUrl + `api/blogs/${payload.blog_id}/`,
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
