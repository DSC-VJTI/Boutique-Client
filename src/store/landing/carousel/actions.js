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

  let public_id = "carousel/" + name;
  let signature = `overwrite=true&public_id=${public_id}&tags=slide_cover&timestamp=${timeStamp}&upload_preset=${preset}${process.env.VUE_APP_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("tags", "slide_cover");
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
    console.log("response.data.secure_url", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
}

export default {
  async createNewSlide(context, payload) {
    console.log("here");
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (imgurl) payload.body.image = imgurl;
      else return imgurl;
    } else {
      payload.body.image = null;
    }

    console.log("payload from actions", payload);

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/carousel/",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const slides = context.getters.getSlides;
        slides.push(response.data);
        context.commit("setSlides", {
          slides: slides
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAllSlides(context) {
    const slides = context.getters.getSlides;
    if (slides.length !== 0) return slides;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/carousel/",
        context.rootGetters.getConfig
      );
      context.commit("setSlides", { slides: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getASlide(context, payload) {
    const slides = context.getters.getSlides;
    const slide = slides.filter(s => s.id == payload.slide_id);
    if (slide.length) return slide[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl + `api/admin/carousel/${payload.slide_id}/`,
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

  async updateSlide(context, payload) {
    if (payload.image) {
      let imgurl = await uploadToCloudinary(payload.image, payload.body.title);
      if (imgurl) payload.body.image = imgurl;
      else return imgurl;
    }
    try {
      const response = await axios.put(
        context.rootGetters.getUrl + `api/admin/carousel/${payload.slide_id}/`,
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const slides = context.getters.getSlides;
        const slideIndex = slides.findIndex(s => s.id == payload.slide_id);
        if (slideIndex !== -1) {
          slides[slideIndex] = response.data;
        }
        context.commit("setSlides", {
          slides: slides
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async deleteSlide(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl + `api/admin/carousel/${payload.slide_id}/`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const slides = context.getters.getSlides;
        const slideIndex = slides.findIndex(s => s.id == payload.slide_id);

        if (slideIndex !== -1) {
          slides.splice(slideIndex, 1);
          context.commit("setSlides", {
            slides: slides
          });
        }
      }

      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
