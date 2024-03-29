import axios from "axios";
import crypto from "crypto";

function getSignature(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

export default {
  async getAllProducts(context) {
    const products = context.getters.getProducts;
    if (products.length !== 0) return products;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/products/",
        context.rootGetters.getConfig
      );
      context.commit("setProducts", { products: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },
  async createNewProduct(context, payload) {
    if (payload.images.length != 0) {
      let url = process.env.VUE_APP_CLOUDINARY_URL;
      let timeStamp = Math.round(new Date() / 1000);
      let preset = process.env.VUE_APP_PRESET;
      let api_key = process.env.VUE_APP_API_KEY;

      let count = 0;
      let productRequests = [];

      for (let img of payload.images) {
        count += 1;
        let public_id = "products/" + payload.body.name + count;
        let signature = `overwrite=true&public_id=${public_id}&tags=product_image&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

        const formData = new FormData();
        formData.append("file", img);
        formData.append("tags", "product_image");
        formData.append("public_id", public_id);
        formData.append("overwrite", true);
        formData.append("signature", getSignature(signature));
        formData.append("api_key", api_key);
        formData.append("timestamp", timeStamp);
        formData.append("upload_preset", preset);

        productRequests.push(
          axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        );
      }
      try {
        let images = [];
        let response = await Promise.all(productRequests);
        for (let res of response) {
          images.push(res.data.secure_url);
        }
        payload.body.images = images;
      } catch (error) {
        return error.response ? error.response.status : 500;
      }
    } else {
      payload.body.images = null;
    }

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/products/",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 201 && response.data) {
        const products = context.getters.getProducts;
        products.push(response.data);
        context.commit("setProducts", {
          products: products
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAProduct(context, payload) {
    const products = context.getters.getProducts;
    const product = products.filter(p => p.id == payload.product_id);
    if (product.length) return product[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl +
          `api/admin/products/${payload.product_id}`,
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

  async updateCurrentProduct(context, payload) {
    if (payload.images.length != 0) {
      let url = process.env.VUE_APP_CLOUDINARY_URL;
      let timeStamp = Math.round(new Date() / 1000);
      let preset = process.env.VUE_APP_PRESET;
      let api_key = process.env.VUE_APP_API_KEY;

      let count = 0;
      let productRequests = [];

      for (let img of payload.images) {
        count += 1;
        let public_id = "products/" + payload.body.name + count;
        let signature = `overwrite=true&public_id=${public_id}&tags=product_image&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

        const formData = new FormData();
        formData.append("file", img);
        formData.append("tags", "product_image");
        formData.append("public_id", public_id);
        formData.append("overwrite", true);
        formData.append("signature", getSignature(signature));
        formData.append("api_key", api_key);
        formData.append("timestamp", timeStamp);
        formData.append("upload_preset", preset);

        productRequests.push(
          axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        );
      }
      try {
        let images = [];
        let response = await Promise.all(productRequests);
        for (let res of response) {
          images.push(res.data.secure_url);
        }
        payload.body.images.push(...images);
      } catch (error) {
        return error.response ? error.response.status : 500;
      }
    }

    try {
      const response = await axios.put(
        context.rootGetters.getUrl +
          `api/admin/products/${payload.product_id}`,
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
      return error.response ? error.response.status : 500;
    }
  },

  async deleteCurrentProduct(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl +
          `api/admin/products/${payload.product_id}`,
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
      return error.response ? error.response.status : 500;
    }
  }
};
