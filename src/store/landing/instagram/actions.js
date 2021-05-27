import axios from "axios";
import crypto from "crypto";

function getSignature(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

async function uploadToCloudinary(img) {
  let url = process.env.VUE_APP_CLOUDINARY_URL;
  let timeStamp = Math.round(new Date() / 1000);
  let preset = process.env.VUE_APP_PRESET;
  let api_key = process.env.VUE_APP_API_KEY;
  let public_id = "instagram/" + new Date();
  let signature = `overwrite=true&public_id=${public_id}&tags=instagram_item&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("tags", "instagram_item");
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
  async createItem(context, payload) {
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image);
      if (isNaN(imgurl)) payload.body.image = imgurl;
      else return imgurl;
    } else {
      payload.body.image = null;
    }

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/instagram/",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const items = context.getters.getItems;
        items.push(response.data);
        context.commit("setItems", {
          items: items
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAllItems(context) {
    const items = context.getters.getItems;
    if (items.length !== 0) return items;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/instagram/",
        context.rootGetters.getConfig
      );
      context.commit("setItems", { items: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async deleteItem(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/admin/instagram/${payload.image_id}/`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const items = context.getters.getItems;
        const itemIndex = items.findIndex(s => s.id == payload.c_id);

        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);
          context.commit("setItems", {
            items: items
          });
        }
      }

      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
