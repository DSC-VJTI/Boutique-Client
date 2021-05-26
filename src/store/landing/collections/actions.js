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

  let public_id = "collections/" + name;
  let signature = `overwrite=true&public_id=${public_id}&tags=collection_img&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("tags", "collection_img");
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
  async createCollection(context, payload) {
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (isNaN(imgurl)) payload.body.image = imgurl;
      else return imgurl;
    } else {
      payload.body.image = null;
    }

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/collections/",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const collections = context.getters.getCollections;
        collections.push(response.data);
        context.commit("setCollections", {
          collections: collections
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAllCollections(context) {
    const collections = context.getters.getCollections;
    if (collections.length !== 0) return collections;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/collections/",
        context.rootGetters.getConfig
      );
      context.commit("setCollections", { collections: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getACollection(context, payload) {
    const collections = context.getters.getCollections;
    const collection = collections.filter(s => s.id == payload.c_id);
    if (collection.length) return collection[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl + `api/admin/collections/${payload.c_id}/`,
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

  async updateCollection(context, payload) {
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (imgurl) payload.body.image = imgurl;
      else return imgurl;
    }
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/admin/collections/${payload.c_id}/`,
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const collections = context.getters.getCollections;
        const collectionIndex = collections.findIndex(s => s.id == payload.c_id);
        if (collectionIndex !== -1) {
          collections[collectionIndex] = response.data;
        }
        context.commit("setCollections", {
          collections: collections
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async deleteCollection(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/admin/collections/${payload.c_id}/`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const collections = context.getters.getCollections;
        const collectionIndex = collections.findIndex(s => s.id == payload.c_id);

        if (collectionIndex !== -1) {
          collections.splice(collectionIndex, 1);
          context.commit("setCollections", {
            collections: collections
          });
        }
      }

      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
