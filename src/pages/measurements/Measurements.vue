<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="container flex flex-col mx-auto w-11/12 items-center justify-center"
  >
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif my-8">
      Measurements
    </h1>
    <div class="mx-auto mb-7 w-3/5 sm:w-96">
      <router-link to="/measurements/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          New Measurement
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
    <div class="grid grid-flow-col gap-8 sr-only md:not-sr-only">
      <ul
        v-if="measurements.length !== 0"
        class="flex flex-col mx-auto mb-4 w-full sm:w-96"
      >
        <measurement-item
          class="border-gray-400 flex flex-row mb-6 w-full"
          v-for="measurement in measurements.slice(
            measurements.length / 2,
            measurements.length
          )"
          :key="measurement.id"
          :name="measurement.client_name"
          :dateCreated="measurement.created_on"
          :id="measurement.id"
        ></measurement-item>
      </ul>
      <ul
        v-if="measurements.length !== 0"
        class="flex flex-col mx-auto mb-4 w-full sm:w-96"
      >
        <measurement-item
          class="border-gray-400 flex flex-row mb-6 w-full"
          v-for="measurement in measurements.slice(0, measurements.length / 2)"
          :key="measurement.id"
          :name="measurement.client_name"
          :dateCreated="measurement.created_on"
          :id="measurement.id"
        ></measurement-item>
      </ul>
    </div>
    <ul
      v-if="measurements.length !== 0"
      class="flex flex-col mx-auto mb-4 w-full sm:w-96 not-sr-only md:sr-only"
    >
      <measurement-item
        class="border-gray-400 flex flex-row mb-6 w-full"
        v-for="measurement in measurements.slice(0, measurements.length)"
        :key="measurement.id"
        :name="measurement.client_name"
        :dateCreated="measurement.created_on"
        :id="measurement.id"
      ></measurement-item>
    </ul>
    <h3
      v-if="measurements.length === 0"
      class="text-2xl mt-8 font-light text-gray-900"
    >
      You haven't added any measurements yet! Add some..
    </h3>
  </div>
</template>
<script>
import MeasurementItem from "./MeasurementItem.vue";
export default {
  components: { MeasurementItem },
  data() {
    return {
      allMeasurements: [],
      measurements: [],
      isLoading: false,
      searchQuery: ""
    };
  },
  watch: {
    searchQuery: function(val) {
      let items = [];
      let filter = val.toUpperCase();
      for (let i = 0; i < this.allMeasurements.length; i++) {
        let name = this.allMeasurements[i].client_name.toUpperCase();
        if (name.indexOf(filter) > -1) {
          items.push(this.allMeasurements[i]);
        }
      }
      this.measurements = items;
    }
  },
  async created() {
    this.isLoading = true;
    const measurements = await this.$store.dispatch(
      "measurements/getAllMeasurements",
      { token: JSON.parse(localStorage.getItem("user")).access_token }
    );
    this.allMeasurements = measurements;
    this.measurements = measurements;
    this.isLoading = false;
  }
};
</script>
