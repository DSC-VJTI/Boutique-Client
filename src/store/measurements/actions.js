import axios from "axios";
import crypto from "crypto";

function getSignature(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

async function uploadToCloudinary(images, name) {
  let url = process.env.VUE_APP_CLOUDINARY_URL;
  let timeStamp = Math.round(new Date() / 1000);
  let preset = process.env.VUE_APP_PRESET;
  let api_key = process.env.VUE_APP_API_KEY;

  let count = 0;
  let productRequests = [];

  for (let img of images) {
    count += 1;
    let public_id = "measurements/" + name + count;
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
    let files = [];
    let response = await Promise.all(productRequests);
    for (let res of response) {
      files.push(res.data.secure_url);
    }
    return files;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
}

export default {
  async createNewMeasurement(context, payload) {
    let imgs = null;

    if (payload.images && payload.images[0]) {
      imgs = await uploadToCloudinary(payload.images, payload.body.client_name);

      if (imgs && imgs[0]) payload.body.images = imgs;
      else return imgs;
    } else {
      payload.body.images = null;
    }

    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/measurements",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const measurements = context.getters.getMeasurements;
        measurements.push(response.data);
        context.commit("setMeasurements", {
          measurements: measurements
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAllMeasurements(context, payload) {
    const measurements = context.getters.getMeasurements;
    if (measurements.length !== 0) return measurements;
    //In case store is empty
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/measurements",
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      context.commit("setMeasurements", { measurements: response.data });
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async getAMeasurement(context, payload) {
    const measurements = context.getters.getMeasurements;
    const measurement = measurements.filter(
      m => m.id == payload.measurement_id
    );
    if (measurement.length) return measurement[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl +
          `api/admin/measurements/${payload.measurement_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      return response.data;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async updateCurrentMeasurement(context, payload) {
    let imgs = null;

    if (payload.images && payload.images[0]) {
      imgs = await uploadToCloudinary(
        payload.images,
        payload.measurement.client_name
      );

      if (imgs && imgs[0]) payload.measurement.images.push(...imgs);
      else return imgs;
    }

    try {
      const response = await axios.put(
        context.rootGetters.getUrl +
          `api/admin/measurements/${payload.measurement_id}`,
        payload.measurement,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const measurements = context.getters.getMeasurements;
        const measurementIndex = measurements.findIndex(
          m => m.id == payload.measurement_id
        );
        if (measurementIndex !== -1) {
          measurements[measurementIndex] = response.data;
        }
        context.commit("setMeasurements", {
          measurements: measurements
        });
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  },

  async deleteCurrentMeasurement(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl +
          `api/admin/measurements/${payload.measurement_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const measurements = context.getters.getMeasurements;
        const measurementIndex = measurements.findIndex(
          m => m.id == payload.measurement_id
        );

        if (measurementIndex !== -1) {
          measurements.splice(measurementIndex, 1);
          context.commit("setMeasurements", {
            measurements: measurements
          });
        }
      }
      return response.status;
    } catch (error) {
      return error.response ? error.response.status : 500;
    }
  }
};
