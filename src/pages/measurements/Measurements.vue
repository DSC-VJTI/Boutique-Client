<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="container flex flex-col mx-auto w-11/12 md:w-3/5 lg:w-2/5 items-center justify-center"
  >
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif my-8">
      Measurements
    </h1>
    <div class="mx-auto mb-10 w-3/5 sm:w-96">
      <router-link to="/measurements/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          New Measurement
        </div>
      </router-link>
    </div>
    <ul
      v-if="measurements.length !== 0"
      class="flex flex-col mx-auto mb-4 w-full sm:w-96"
    >
      <measurement-item
        class="border-gray-400 flex flex-row mb-6 w-full"
        v-for="measurement in measurements"
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
      measurements: [],
      isLoading: false
    };
  },

  async created() {
    this.isLoading = true;
    const measurements = await this.$store.dispatch(
      "measurements/getAllMeasurements",
      { token: JSON.parse(localStorage.getItem("user")).access_token }
    );
    this.measurements = measurements;
    this.isLoading = false;
  }
};
</script>
