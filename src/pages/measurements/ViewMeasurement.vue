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
      to="/measurements"
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
          <button @click="updateMeasurement" class="update">
            Update
          </button>
        </div>
        <div
          class="p-2 inline-block w-11/12 md:w-3/4 mx-0"
          style="width:150px;"
        >
          <button @click="deleteMeasurement" class="delete">
            Delete
          </button>
        </div>
      </div>
      <!-- Personal Info -->
      <h2 class="px-8 text-xl text-gray-800">Personal info</h2>
      <div
        class="w-full grid sm:grid-cols-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <h2 class="inline-block text-lg p-2 mr-4">
          Name:&nbsp;<span>{{ measurement.client_name }}</span>
        </h2>
        <h2 class="inline-block text-lg p-2 mr-4">
          Date Created:&nbsp;<span> {{ measurement.created_on }}</span>
        </h2>
      </div>
      <hr />
      <!-- SKETCH -->
      <h2 class="px-8 text-xl text-gray-800">SKETCHES</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div
          v-for="(file, key) in measurement.images"
          :key="key"
          class="col-span-1 file-listing sketchPreview"
          :style="{ 'background-image': `url(${file})` }"
        ></div>
      </div>
      <hr />
      <!-- DL -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block p-2 w-10 mr-4 text-center">
            DL:<span>{{ measurement.dl }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- L -->
      <h2 class="px-8 text-xl text-gray-800">L</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            F:<span>{{ measurement.l.full }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            3/4:<span>{{ measurement.l.three_fourth }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            Half:<span>{{ measurement.l.half }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- AC C -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            AC:<span>{{ measurement.ac }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block p-2 w-10 text-center mr-4">
            C:<span>{{ measurement.c }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- BC W LW -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            BC:<span>{{ measurement.bc }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            W:<span>{{ measurement.w }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            LW:<span>{{ measurement.lw }}</span>
          </h2>
        </div>
      </div>
      <hr />

      <!-- H SH ARM -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            H:<span>{{ measurement.h }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            SH:<span>{{ measurement.sh }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            ARM:<span>{{ measurement.arm }}</span>
          </h2>
        </div>
      </div>
      <hr />

      <!-- SL -->
      <h2 class="px-8 text-xl text-gray-800">SL</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            F:<span>{{ measurement.sl.full }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            3/4:<span>{{ measurement.sl.three_fourth }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            Half:<span>{{ measurement.sl.half }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- N -->
      <h2 class="px-8 text-xl text-gray-800">N</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            F:<span>{{ measurement.n.f }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            B:<span>{{ measurement.n.b }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- BOTTOM -->
      <h2 class="px-8 text-xl text-gray-800">BOTTOM</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            W:<span>{{ measurement.bottom_l }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- L - F ANKLE HALF -->
      <h2 class="px-8 text-xl text-gray-800">L</h2>
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            F:<span>{{ measurement.bottom_w.full }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            Ankle:<span>{{ measurement.bottom_w.three_fourth }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            Half:<span>{{ measurement.bottom_w.half }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- TH - K -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            TH:<span>{{ measurement.bottom_th }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            K:<span>{{ measurement.bottom_k }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- BOTTOM C - R -->
      <div
        class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0"
      >
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            C:<span>{{ measurement.bottom_c }}</span>
          </h2>
        </div>
        <div class="col-span-1 md:inline-block mr-4">
          <h2 class="inline-block text-center p-2 w-10 mr-4">
            R:<span>{{ measurement.bottom_r }}</span>
          </h2>
        </div>
      </div>
      <hr />
      <!-- NOTES -->
      <h2 class="px-8 text-xl text-gray-800">NOTES</h2>
      <div class="w-full px-8 text-gray-500">
        <div class="mr-4">
          {{ measurement.notes }}
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: ["mId"],
  data() {
    return {
      measurement: {
        l: {},
        sl: {},
        n: {},
        bottom_w: {},
        images: []
      },
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
    updateMeasurement() {
      this.$router.push({ path: `${this.mId}/update` });
    },
    async deleteMeasurement() {
      this.isLoading = true;
      const status = await this.$store.dispatch(
        "measurements/deleteCurrentMeasurement",
        {
          token: JSON.parse(localStorage.getItem("user")).access_token,
          measurement_id: this.mId
        }
      );

      if (status === 204) {
        this.isLoading = false;
        this.displayToast(true, "Measurement deleted successfully.");
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
  async created() {
    this.isLoading = true;
    this.measurement = await this.$store.dispatch(
      "measurements/getAMeasurement",
      {
        measurement_id: this.mId,
        token: JSON.parse(localStorage.getItem("user")).access_token
      }
    );
    this.isLoading = false;
  }
};
</script>
