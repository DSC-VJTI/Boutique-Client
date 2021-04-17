<template>
    <div class="container flex flex-col mx-auto w-full items-center justify-center">
        <div class="px-4 py-5 sm:px-6 w-full border bg-gray-100 shadow mb-4 rounded-md">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Measurements</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
                Details and informations about client Measurements
            </p>
        </div>
        <div class="mx-auto mb-4 w-3/5 sm:w-96">
            <router-link to="/measurements/new">
                <div class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white md:w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">New Measurement</div>
            </router-link>
        </div>
        <ul class="flex flex-col">
            <measurement-item
                class="border-gray-400 flex flex-row mb-6"
                v-for="measurement in measurements"
                :key="measurement.id"
                :name="measurement.name"
                :mobileNumber="measurement.mobileNumber"
                :dateCreated="measurement.dateCreated"
                :id="measurement.id"
            ></measurement-item>
        </ul>
    </div>
</template>
<script>
import MeasurementItem from './MeasurementItem.vue'
export default {
    components: { MeasurementItem },
    data() {
        return {
            measurements: []
        }
    },

    async created() {
        console.log("Measurements created");
        const measurements = await this.$store.dispatch("measurements/getAllMeasurements", {token: JSON.parse(localStorage.getItem("user")).access_token});
        this.measurements = measurements;
    }
}
</script>