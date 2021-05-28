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
      @submit.prevent="newMeasurement"
    >
      <div class="space-y-6 bg-white">
        <div
          class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
        >
          <h2 class="mx-auto text-2xl text-gray-700">Create New Measurement</h2>
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
              v-model="measurement.client_name"
            />
            <br /><span class="text-red-600 font-bold">{{ nameError }}</span>
          </div>
        </div>
        <hr />
        <!-- DL -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block p-2 w-10 mr-4 text-center">DL</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="DL"
              v-model="measurement.dl"
            />
          </div>
        </div>
        <hr />
        <!-- L -->
        <h2 class="px-8 text-xl text-gray-800">L</h2>
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="F"
              v-model="measurement.l.full"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">3/4</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="3/4"
              v-model="measurement.l.three_fourth"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="HALF"
              v-model="measurement.l.half"
            />
          </div>
        </div>
        <hr />
        <!-- AC C -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">AC</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="AC"
              v-model="measurement.ac"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block p-2 w-10 text-center mr-4">C</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="C"
              v-model="measurement.c"
            />
          </div>
        </div>
        <hr />
        <!-- BC W LW -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">BC</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="BC"
              v-model="measurement.bc"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">W</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="W"
              v-model="measurement.w"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">LW</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="LW"
              v-model="measurement.lw"
            />
          </div>
        </div>
        <hr />

        <!-- H SH ARM -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">H</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="H"
              v-model="measurement.h"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">SH</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="SH"
              v-model="measurement.sh"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">ARM</h2>
            <input
              type="text"
              id="name"
              class="measurementInput"
              placeholder="ARM"
              v-model="measurement.arm"
            />
          </div>
        </div>
        <hr />

        <!-- SL -->
        <h2 class="px-8 text-xl text-gray-800">SL</h2>
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="F"
              v-model="measurement.sl.full"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">3/4</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="3/4"
              v-model="measurement.sl.three_fourth"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="HALF"
              v-model="measurement.sl.half"
            />
          </div>
        </div>
        <hr />
        <!-- N -->
        <h2 class="px-8 text-xl text-gray-800">N</h2>
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="F"
              v-model="measurement.n.f"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">B</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="B"
              v-model="measurement.n.b"
            />
          </div>
        </div>
        <hr />
        <!-- BOTTOM -->
        <h2 class="px-8 text-xl text-gray-800">BOTTOM</h2>
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">W</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="W"
              v-model="measurement.bottom_l"
            />
          </div>
        </div>
        <hr />
        <!-- L - F ANKLE HALF -->
        <h2 class="px-8 text-xl text-gray-800">L</h2>
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="F"
              v-model="measurement.bottom_w.full"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">Ankle</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="Ankle"
              v-model="measurement.bottom_w.three_fourth"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="HALF"
              v-model="measurement.bottom_w.half"
            />
          </div>
        </div>
        <hr />
        <!-- TH - K -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">TH</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="Bottom TH"
              v-model="measurement.bottom_th"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">K</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="Bottom K"
              v-model="measurement.bottom_k"
            />
          </div>
        </div>
        <hr />
        <!-- BOTTOM C - R -->
        <div
          class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">C</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="Bottom C"
              v-model="measurement.bottom_c"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4">
            <h2 class="inline-block text-center p-2 w-10 mr-4">R</h2>
            <input
              type="text"
              id=""
              class="measurementInput"
              placeholder="Bottom R"
              v-model="measurement.bottom_r"
            />
          </div>
        </div>
        <hr />
        <!-- SKETCH -->
        <h2 class="px-8 text-xl text-gray-800">SKETCHES</h2>
        <div
          class="w-full justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
        >
          <div class="container">
            <div class="mb-8">
              <label
                class="bg-gray-900 cursor-pointer text-green-500 py-2 px-4 hover:bg-gray-50 border hover:border-green-500 transform transition duration-200 hover:-translate-y-1 hover:shadow-md"
                style="width: 100%;"
                for="file-input"
                >Add Files
                <input
                  id="file-input"
                  type="file"
                  ref="files"
                  @change="selectImage()"
                  class="hidden"
                  multiple
                />
              </label>
            </div>
            <div
              v-for="(img, key) in imageData"
              :key="key"
              class="col-span-3 file-listing sketchPreview"
              :style="{ 'background-image': `url(${img})` }"
            >
              <span
                class="float-right px-2 m-2 text-white bg-red-500 rounded-full hover:bg-red-600 hover:border-red-800"
                @click="removeFile(key)"
                >X</span
              >
            </div>
            <br />
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
  data() {
    return {
      measurement: {
        client_name: "",
        dl: "",
        ac: "",
        c: "",
        l: {
          full: "",
          three_fourth: "",
          half: ""
        },
        bc: "",
        w: "",
        lw: "",
        h: "",
        sh: "",
        arm: "",
        sl: {
          full: "",
          three_fourth: "",
          half: ""
        },
        n: {
          f: "",
          b: ""
        },
        bottom_w: {
          full: "",
          three_fourth: "",
          half: ""
        },
        bottom_l: "",
        bottom_th: "",
        bottom_c: "",
        bottom_k: "",
        bottom_r: ""
      },
      images: [],
      imageData: [],
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
    removeFile(key) {
      this.images.splice(key, 1);
      this.imageData.splice(key, 1);
    },
    selectImage() {
      this.imageData = [];

      let uploadedFiles = this.$refs.files.files;
      /* Adds the uploaded file to the files array */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.images.push(uploadedFiles[i]);
      }

      for (let img of this.images) {
        if (img && img.name) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function() {
              this.imageData.push(reader.result);
            }.bind(this),
            false
          );

          reader.readAsDataURL(img);
        }
      }
    },
    validate() {
      this.isValid = true;

      if (this.measurement.client_name === "") {
        this.nameError = "*Name cannot be empty. Please enter a valid name.";
        this.isValid = false;
      } else this.nameError = "";
    },
    async newMeasurement() {
      this.isLoading = true;
      this.validate();

      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch(
        "measurements/createNewMeasurement",
        {
          body: this.measurement,
          token: JSON.parse(localStorage.getItem("user")).access_token,
          images: this.images
        }
      );

      if (status === 201) {
        this.displayToast(true, "Measurement created successfully.");
        setTimeout(() => this.$router.push({ name: "seeMeasurements" }), 3000);
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
