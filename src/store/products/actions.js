import axios from "axios";

export default {
  async getAllProducts(context) {
    const products = context.getters.getProducts;
    if (products.length !== 0) return products;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/products",
        context.rootGetters.getConfig
      );
      context.commit("setProducts", { products: response.data });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  async createNewProduct(context, payload) {
    try {
      console.log(context.rootGetters.getUrl + "api/admin/products");
      console.log(payload.body);
      console.log(payload.token);
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/products",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      console.log("hello", response);
      if (response.status == 201 && response.data) {
        const products = context.getters.getProducts;
        products.push(response.data);
        context.commit("setProducts", {
          products: products
        });
      }
      return response.status;
    } catch (error) {
      console.log(error);
      return error.response.status;
    }
  },

  async getAProduct(context, payload) {
    const products = context.getters.getProducts;
    const product = products.filter(p => p.id == payload.product_id);
    if (product.length) return product[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl + `api/admin/products/${payload.product_id}`,
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

  async updateCurrentProduct(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/admin/products/${payload.product_id}`,
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const products = context.getters.getProducts;
        const productIndex = products.findIndex(
          p => p.id == payload.product_id
        );
        if (productIndex !== -1) {
          products[productIndex] = response.data;
        }
        context.commit("setProducts", {
          products: products
        });
      }
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  },

  async deleteCurrentProduct(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/admin/products/${payload.product_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const products = context.getters.getProducts;
        const productIndex = products.findIndex(
          b => b.id == payload.product_id
        );

        if (productIndex !== -1) {
          products.splice(productIndex, 1);
          context.commit("setProducts", {
            products: products
          });
        }
      }

      return response.status;
    } catch (error) {
      return error.response.status;
    }
  }
};
