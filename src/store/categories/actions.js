import axios from "axios";

export default {
  async getAllCategories(context) {
    const categories = context.getters.getCategories;
    if (categories.length !== 0) return categories;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/categories",
        context.rootGetters.getConfig
      );
      context.commit("setCategories", { categories: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },
  async getAllSubcategories(context) {
    const subcategories = context.getters.getSubcategories;
    if (subcategories.length !== 0) return subcategories;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/sub_categories",
        context.rootGetters.getConfig
      );
      context.commit("setSubcategories", { subcategories: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },
  async getSubcategory(context, payload) {
    try {
      const response = await axios.get(
        context.rootGetters.getUrl +
          `api/admin/sub_categories/${payload.subcat_id}`,
        context.rootGetters.getConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response ? error.response.status : 500;
    }
  },
  async getCategory(context, payload) {
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + `api/admin/categories/${payload.cat_id}`,
        context.rootGetters.getConfig
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response ? error.response.status : 500;
    }
  },
  async createNewSubcategory(context, payload) {
    try {
      console.log("here as well");
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/sub_categories",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const subcategories = context.getters.getSubcategories;
        subcategories.push(response.data);
        context.commit("setSubcategories", {
          subcategories: subcategories
        });
      }
      return response.status;
    } catch (error) {
      console.log(error);
      return error.response ? error.response.status : 500;
    }
  },
  async createNewCategory(context, payload) {
    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/categories",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const categories = context.getters.getCategories;
        categories.push(response.data);
        context.commit("setCategories", {
          categories: categories
        });
      }
      return response.status;
    } catch (error) {
      console.log(error);
      return error.response ? error.response.status : 500;
    }
  },
  async updateCategory(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/admin/categories/${payload.cat_id}`,
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const categories = context.getters.getCategories;
        const categoryIndex = categories.findIndex(c => c.id == payload.cat_id);
        if (categoryIndex !== -1) {
          categories[categoryIndex] = response.data;
        }
        context.commit("setCategories", {
          categories: categories
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },
  async updateSubcategory(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl +
          `api/admin/subcategories/${payload.subcat_id}`,
        payload.body,
        {
          headers: {
            ContentType: "applisubcation/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const subcategories = context.getters.getSubcategories;
        const subcategoryIndex = subcategories.findIndex(
          s => s.id == payload.subcat_id
        );
        if (subcategoryIndex !== -1) {
          subcategories[subcategoryIndex] = response.data;
        }
        context.commit("setSubcategories", {
          subcategories: subcategories
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
