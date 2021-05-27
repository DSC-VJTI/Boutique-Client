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
      :to="`/costlist/${materialId}`"
    >
      <img
        class="transform rotate-90 inline-block"
        src="https://img.icons8.com/android/20/000000/expand-arrow.png"
      />
    </router-link>
  </div>
  <div>
    <form
      class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4"
      @submit.prevent="updateMaterial"
    >
      <div class="space-y-6 bg-white">
        <div
          class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
        >
          <h2 class="mx-auto text-2xl text-gray-700">Update Cost List</h2>
        </div>
        <!-- Personal Info -->
        <h2 class="px-8 text-xl text-gray-800">Personal info</h2>
        <div
          class="w-full grid col-span-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block p-2 w-32 mr-4">Name</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 180px;"
              placeholder="Name"
              required
              v-model="material.client_name"
            />
            <br /><span class="text-red-600 font-bold">{{ nameError }}</span>
          </div>
        </div>
        <hr />
        <!-- TOP BOTTOM DUPATTA -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">TOP</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="TOP"
              v-model="material.top"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">BOTTOM</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="BOTTOM"
              v-model="material.bottom"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">DUPATTA</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="DUPATTA"
              v-model="material.dupatta"
            />
          </div>
        </div>
        <hr />
        <!-- LINING LACES EMROIDERY -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">LINING</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="LINING"
              v-model="material.lining"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">LACES</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="LACES"
              v-model="material.laces"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">EMROIDERY</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="EMROIDERY"
              v-model="material.emroidery"
            />
          </div>
        </div>
        <hr />
        <!-- PIPING ZIP BUTTONS -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">PIPING</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="PIPING"
              v-model="material.piping"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">ZIP</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="ZIP"
              v-model="material.zip"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">BUTTONS</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="BUTTONS"
              v-model="material.buttons"
            />
          </div>
        </div>
        <hr />

        <!-- TAILORING CONVAYANCE OVERHEADS -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">TAILORING</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="TAILORING"
              v-model="material.tailoring"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">CONVAYANCE</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="CONVAYANCE"
              v-model="material.convayance"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">OVERHEADS</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="OVERHEADS"
              v-model="material.overheads"
            />
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

        <!-- SAVE -->
        <div
          class="w-full grid bg-gray-100 py-6 px-16 md:px-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
        >
          <div class="mx-auto md:mr-2 w-4/5 md:w-1/4">
            <button
              type="submit"
              class="bg-gray-800 text-blue-500 w-full py-2 px-4 hover:bg-gray-50 hover:text-gray-900 border hover:border-gray-700 shadow-md transform transition duration-200 hover:shadow-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["materialId"],
  data() {
    return {
      material: {},
      nameError: "",
      isValid: true,
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
  },

  computed: {
    totalCost: function() {
      let sum = 0;
      for (const item in this.material) {
        if (
          item === "client_name" ||
          item === "last_updated" ||
          item === "id" ||
          item === "created_on" ||
          this.material[item] === ""
        ) {
          continue;
        }

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
    validate() {
      this.isValid = true;

      if (this.material.client_name === "") {
        this.nameError = "*Name cannot be empty. Please enter a valid name.";
        this.isValid = false;
      } else this.nameError = "";
    },

    async updateMaterial() {
      this.isLoading = true;
      this.validate();

      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch(
        "materials/updateCurrentMaterial",
        {
          material: this.material,
          token: JSON.parse(localStorage.getItem("user")).access_token,
          material_id: this.materialId
        }
      );

      if (status === 200) {
        this.isLoading = false;
        this.displayToast(true, "Cost List updated successfully.");
        setTimeout(
          () => this.$router.push(`/costlist/${this.materialId}`),
          3000
        );
      } else if (status === 401) {
        this.displayToast(false, "You are not authorized.");
        setTimeout(() => this.$store.dispatch("user/unauthorize"), 3000);
      } else {
        this.displayToast(false, "Something went wrong.");
      }
      this.isLoading = false;
    },

    resetErrors() {
      this.nameError = "";
    }
  },

  async created() {
    this.isLoading = true;
    const material = await this.$store.dispatch("materials/getAMaterial", {
      material_id: this.materialId,
      token: JSON.parse(localStorage.getItem("user")).access_token
    });
    this.material = { ...material };
    this.isLoading = false;
  }
};
</script>
