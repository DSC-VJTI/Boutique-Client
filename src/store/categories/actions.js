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
    const cats = context.getters.getCategories;
    const cat = cats.filter(c => c.id == payload.cat_id);
    if (cat.length) return cat[0];
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
      console.log(error);
      console.log(error.response.status);
      return error.response ? error.response.status : 500;
    }
  },
  async updateSubcategory(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl +
          `api/admin/sub_categories/${payload.subcat_id}`,
        payload.body,
        {
          headers: {
            ContentType: "application/json",
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
  },
  async deleteCategory(context, payload) {
    const cats = context.getters.getCategories;
    const catIndex = cats.findIndex(c => c.id == payload.cat_id);

    // category does not exist
    if (catIndex == -1) return 404;

    // if products of that category exist, it cannot be deleted
    if (
      cats[catIndex].products.length !== 0 ||
      cats[catIndex].sub_categories.length !== 0
    )
      return 403;

    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/admin/categories/${payload.cat_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 204) {
        if (catIndex !== -1) {
          cats.splice(catIndex, 1);
          context.commit("setCategories", {
            categories: cats
          });
        }
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },
  async deleteSubcategory(context, payload) {
    const subcats = context.getters.getSubcategories;
    const subcatIndex = subcats.findIndex(c => c.id == payload.subcat_id);

    // if products of that category exist, it cannot be deleted
    if (subcatIndex !== -1 && subcats[subcatIndex].products.length !== 0)
      return 403;

    try {
      const response = await axios.delete(
        context.rootGetters.getUrl +
          `api/admin/sub_categories/${payload.subcat_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 204) {
        const subcats = context.getters.getSubcategories;
        const subcatIndex = subcats.findIndex(s => s.id == payload.subcat_id);

        if (subcatIndex !== -1) {
          subcats.splice(subcatIndex, 1);
          context.commit("setSubcategories", {
            subcategories: subcats
          });
        }
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
