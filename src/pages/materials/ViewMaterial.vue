<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div class="m-5 sm:ml-5 inline-block">
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <router-link
      class="text-sm text-gray-400 mx-4 inline-block relative hover:text-gray-800"
      to="/costlist"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
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
        class="w-full grid grid-cols-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <h2 class="inline-block p-2 mr-4 text-lg">
          Name:&nbsp;<span>{{ material.client_name }}</span>
        </h2>
        <h2 class="inline-block p-2 mr-4 text-lg">
          Date Created:&nbsp;<span>{{ material.created_on }}</span>
        </h2>
      </div>
      <hr />
      <!-- TOP BOTTOM DUPATTA -->
      <div
        class="w-full grid col-span-1 text-center justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            TOP:<span>{{ material.top }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            BOTTOM:<span>{{ material.bottom }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            DUPATTA:<span>{{ material.dupatta }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- LINING LACES EMROIDERY -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            LINING:<span>{{ material.lining }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            LACES:<span>{{ material.laces }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            EMROIDERY:<span>{{ material.emroidery }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- PIPING ZIP BUTTONS -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            PIPING:<span>{{ material.piping }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            ZIP:<span>{{ material.zip }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            BUTTONS:<span>{{ material.buttons }}</span>
          </h2>
        </div>
      </div>
      <hr />

      <!-- TAILORING CONVAYANCE OVERHEADS -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            TAILORING:<span>{{ material.tailoring }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            CONVAYANCE:<span>{{ material.convayance }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block">
          <h2 class="inline-block p-2 w-full">
            OVERHEADS:<span>{{ material.overheads }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- TOTAL PRICE -->
      <div
        class="w-full grid col-span-1 justify-items-center pb-6 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block">
            <h2 class="inline-block text-xl font-bold p-2">
              TOTAL COST : <span>{{ totalCost }} ₹</span>
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
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false,
    };
  },
  
  computed: {
    totalCost: function(){
      let sum = 0;
      for (const item in this.material) {
        if(item === "client_name" || item === "last_updated" || item === "id" || item === "created_on" || this.material[item] === "") {continue;}
        sum += parseFloat(this.material[item]);
      }
      return sum;
    }
  },

  methods: {
    displayToast(isSuccessMsg, msg) {
      this.isSuccessMsg = isSuccessMsg;
      this.toastMsg = msg;
      this.errorOccured = true;
      setTimeout(() => (this.errorOccured = false), 3000);
    },
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
        this.displayToast(true, "Cost List deleted successfully.");
        setTimeout(() => this.$router.push({ name: "seeMaterials" }), 3000);
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
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
