import axios from "axios";

export default {
  async createNewMaterial(context, payload) {
    try {
      const response = await axios.post(
        context.rootGetters.getUrl + "api/admin/materials",
        payload.body,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 201 && response.data) {
        const materials = context.getters.getMaterials;
        materials.push(response.data);
        context.commit("setMaterials", {
          materials: materials
        });
      }
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  },

  async getAllMaterials(context, payload) {
    const materials = context.getters.getMaterials;
    if (materials.length !== 0) return materials;
    try {
      const response = await axios.get(
        context.rootGetters.getUrl + "api/admin/materials",
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      context.commit("setMaterials", { materials: response.data });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getAMaterial(context, payload) {
    const materials = context.getters.getMaterials;
    const material = materials.filter(
      m => m.id == payload.material_id
    );
    if (material.length) return material[0];

    try {
      const response = await axios.get(
        context.rootGetters.getUrl +
          `api/admin/materials/${payload.material_id}`,
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

  async updateCurrentMaterial(context, payload) {
    try {
      const response = await axios.put(
        context.rootGetters.getUrl +
          `api/admin/materials/${payload.material_id}`,
        payload.material,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );
      if (response.status == 200 && response.data) {
        const materials = context.getters.getMaterials;
        const materialIndex = materials.findIndex(
          m => m.id == payload.material_id
        );
        if (materialIndex !== -1) {
          materials[materialIndex] = response.data;
        }
        context.commit("setMaterials", {
          materials: materials
        });
      }
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  },

  async deleteCurrentMaterial(context, payload) {
    try {
      const response = await axios.delete(
        context.rootGetters.getUrl +
          `api/admin/materials/${payload.material_id}`,
        {
          headers: {
            ContentType: "application/json",
            Authorization: "Bearer " + payload.token
          }
        }
      );

      if (response.status == 204) {
        const materials = context.getters.getMaterials;
        const materialIndex = materials.findIndex(
          m => m.id == payload.material_id
        );

        if (materialIndex !== -1) {
          materials.splice(materialIndex, 1);
          context.commit("setMaterials", {
            materials: materials
          });
        }
      }
      return response.status;
    } catch (error) {
      return error.response.status;
    }
  }
};
