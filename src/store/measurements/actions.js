import axios from "axios";

export default {
  async createNewMeasurement(context, payload) {
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
      return error.response.status;
    }
  },

  async getAllMeasurements(context, payload) {
    const measurements = context.getters.getMeasurements;
    if (measurements.length !== 0) return measurements;
    //In case store is empty
    // console.log(payload.token);
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
      return error.response;
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
      return error.response;
    }
  },

  async updateCurrentMeasurement(context, payload) {
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
      return error.response.status;
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
      return error.response.status;
    }
  }
};
