<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4">
    <div class="space-y-6 bg-white">
      <div class="p-4 bg-gray-50">
        <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
          style="width:150px;"
        >
          <button
            @click="updateMaterial"
            class="bg-gray-800 text-yellow-200 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          >
            Update
          </button>
        </div>
        <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
          style="width:150px;"
        >
          <button
            @click="deleteMaterial"
            class="bg-gray-800 text-red-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <!-- Personal Info -->
      <h2 class="px-8 text-xl text-gray-800">Personal info</h2>
      <div
        class="w-full grid col-span-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block p-2 w-32 mr-4">
            Name:<span>{{ material.client_name }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block float-right">
          <h2 class="inline-block p-2 w-32 mr-4">
            Date Created:<span>{{ material.created_on }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- TOP BOTTOM DUPATTA -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block p-2 w-10 mr-4 text-center">
            TOP:<span>{{ material.top }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            BOTTOM:<span>{{ material.bottom }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block p-2 w-10 text-center mr-4">
            DUPATTA:<span>{{ material.dupatta }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- LINING LACES EMROIDERY -->
      <h2 class="px-8 text-xl text-gray-800">L</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            LINING:<span>{{ material.lining }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            LACES:<span>{{ material.laces }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            EMROIDERY:<span>{{ material.emroidery }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- PIPING ZIP BUTTONS -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            PIPING:<span>{{ material.piping }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            ZIP:<span>{{ material.zip }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            BUTTONS:<span>{{ material.buttons }}</span>
          </h2>
        </div>
      </div>
      <hr />

      <!-- TAILORING CONVAYANCE OVERHEADS -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            TAILORING:<span>{{ material.tailoring }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            CONVAYANCE:<span>{{ material.convayance }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            OVERHEADS:<span>{{ material.overheads }}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["materialId"],
  data() {
    return {
      material: {},
      isLoading: false
    };
  },
  methods: {
    updateMaterial() {
      this.$router.push({ path: `${this.materialId}/update` });
    },

    async deleteMaterial() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "materials/deleteCurrentMaterial",
        {
          token: JSON.parse(localStorage.getItem("user")).access_token,
          material_id: this.materialId
        }
      );

      if (status === 204) {
        this.isLoading = false;
        this.$router.push({
          name: "seeMaterials"
        });
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log(status);
        console.log("Something went wrong. Please try again!");
      }
      this.isLoading = false;
    }
  },
  async created() {
    this.isLoading = true;
    this.material = await this.$store.dispatch("materials/getAMaterial", {
      material_id: this.materialId,
      token: JSON.parse(localStorage.getItem("user")).access_token
    });
    this.isLoading = false;
  }
};
</script>
