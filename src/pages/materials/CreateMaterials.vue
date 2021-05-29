<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div>
    <toast-message
      :type="isSuccessMsg"
      :msg="toastMsg"
      :show="errorOccured"
    ></toast-message>
    <form
      class="container max-w-4xl mx-auto sm:my-8 shadow-md md:w-3/4"
      @submit.prevent="newMaterial"
    >
      <div class="space-y-6 bg-white">
        <div
          class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
        >
          <h2 class="mx-auto text-2xl text-gray-700">Create New Cost List</h2>
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

        <!-- NOTES -->
        <h2 class="px-8 text-xl text-gray-800">NOTES</h2>
        <div class="w-full px-8 text-gray-500">
          <div class="mr-4">
            <textarea
              type="text"
              class="notes w-full"
              rows="5"
              placeholder="Notes"
              v-model="material.notes"
            ></textarea>
          </div>
        </div>
        <hr />

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
  data() {
    return {
      material: {
        client_name: "",
        notes: "",
        top: "",
        bottom: "",
        dupatta: "",
        lining: "",
        laces: "",
        emroidery: "",
        piping: "",
        zip: "",
        buttons: "",
        tailoring: "",
        convayance: "",
        overheads: ""
      },
      isValid: true,
      nameError: "",
      isLoading: false,
      errorOccured: false,
      toastMsg: "",
      isSuccessMsg: false
    };
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
    async newMaterial() {
      this.isLoading = true;
      this.validate();

      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch("materials/createNewMaterial", {
        body: this.material,
        token: JSON.parse(localStorage.getItem("user")).access_token
      });

      if (status === 201) {
        this.isLoading = false;
        this.displayToast(true, "Cost List created successfully.");
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
  created() {
    if (!this.$store.getters["user/isAuthenticated"]) {
      if (
        !localStorage.getItem("isAuthenticated") ||
        localStorage.getItem("isAuthenticated") === false
      )
        this.$router.replace("/admin/login");
      else this.$store.commit("user/setAuth", { isAuthenticated: true });
    }
  }
};
</script>
