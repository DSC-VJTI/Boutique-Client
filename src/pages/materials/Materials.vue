<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="container flex flex-col mx-auto w-11/12 md:w-3/5 lg:w-2/5 items-center justify-center"
  >
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif my-8">
      Cost List
    </h1>
    <div class="mx-auto mb-4 w-3/5 sm:w-96">
      <router-link to="/costlist/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          New Cost List
        </div>
      </router-link>
      <!-- search bar -->
      <div class="mb-8 p-0 mt-5 text-sm text-gray-700">
        <form
          @submit.prevent="null"
          class="px-4 py-2 relative border border-gray-300"
        >
          <input
            type="text"
            class="h-full w-11/12 text-lg outline-none"
            placeholder="Search..."
            v-model="searchQuery"
          />
          <div class="absolute float-right inline">
            <img src="https://img.icons8.com/android/24/000000/search.png" />
          </div>
        </form>
      </div>
    </div>
    <ul
      v-if="materials.length !== 0"
      class="flex flex-col mx-auto mb-4 w-full sm:w-96"
    >
      <material-item
        class="border-gray-400 flex flex-row mb-6 w-full"
        v-for="material in materials"
        :key="material.id"
        :name="material.client_name"
        :dateCreated="material.created_on"
        :id="material.id"
      ></material-item>
    </ul>
    <h3
      v-if="materials.length === 0"
      class="text-2xl mt-8 font-light text-gray-900"
    >
      You haven't added any Cost List yet! Add some..
    </h3>
  </div>
</template>

<script>
import MaterialItem from "./MaterialItem.vue";
export default {
  components: { MaterialItem },
  data() {
    return {
      allMaterials: [],
      materials: [],
      isLoading: false,
      searchQuery: ""
    };
  },
  watch: {
    searchQuery: function(val) {
      let items = [];
      let filter = val.toUpperCase();
      for (let i = 0; i < this.allMaterials.length; i++) {
        let name = this.allMaterials[i].client_name.toUpperCase();
        if (name.indexOf(filter) > -1) {
          items.push(this.allMaterials[i]);
        }
      }
      this.materials = items;
    }
  },
  async created() {
    this.isLoading = true;
    const materials = await this.$store.dispatch("materials/getAllMaterials", {
      token: JSON.parse(localStorage.getItem("user")).access_token
    });
    this.allMaterials = materials;
    this.materials = materials;
    this.isLoading = false;
  }
};
</script>
