<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="container flex flex-col mx-auto w-11/12 md:w-3/5 lg:w-2/5 items-center justify-center"
  >
    <div
      class="px-4 py-5 sm:px-6 w-full border bg-gray-100 shadow mb-4 rounded-md"
    >
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
        Measurements
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
        Details and informations about client Measurements
      </p>
    </div>
    <div class="mx-auto mb-10 w-3/5 sm:w-96">
      <router-link to="/measurements/new">
        <div
          class="py-2 px-4 bg-gray-800 hover:bg-gray-50 text-white hover:text-gray-800 md:w-full transition duration-200 text-center text-xl base font-semibold transform hover:-translate-y-1 hover:shadow-lg border hover:border-gray-800"
        >
          New Measurement
        </div>
      </router-link>
    </div>
    <ul class="flex flex-col mx-auto mb-4 w-full sm:w-96">
      <measurement-item
        class="border-gray-400 flex flex-row mb-6 w-full"
        v-for="measurement in measurements"
        :key="measurement.id"
        :name="measurement.client_name"
        :dateCreated="measurement.created_on"
        :id="measurement.id"
      ></measurement-item>
    </ul>
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
