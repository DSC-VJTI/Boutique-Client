<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="container flex flex-col mx-auto w-11/12 md:w-3/5 lg:w-2/5 items-center justify-center"
  >
    <div
      class="px-4 py-5 sm:px-6 w-full border bg-gray-100 shadow mb-4 rounded-md"
    >
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
        Materials
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
        Details and informations about client Materials
      </p>
    </div>
    <div class="mx-auto mb-4 w-3/5 sm:w-96">
      <router-link to="/materials/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          New Material
        </div>
      </router-link>
    </div>
    <ul v-if="materials.length!==0" class="flex flex-col mx-auto mb-4 w-full sm:w-96">
      <material-item
        class="border-gray-400 flex flex-row mb-6 w-full"
        v-for="material in materials"
        :key="material.id"
        :name="material.client_name"
        :dateCreated="material.created_on"
        :id="material.id"
      ></material-item>
    </ul>
    <h3 v-if="materials.length===0" class="text-2xl mt-8 font-light text-gray-900">You haven't added any materials yet! Add some..</h3>
  </div>
</template>

<script>
import MaterialItem from "./MaterialItem.vue";
export default {
  components: { MaterialItem },
  data() {
    return {
      materials: [],
      isLoading: false
    };
  },

  async created() {
    this.isLoading = true;
    const materials = await this.$store.dispatch("materials/getAllMaterials", {
      token: JSON.parse(localStorage.getItem("user")).access_token
    });
    this.materials = materials;
    this.isLoading = false;
  }
};
</script>
