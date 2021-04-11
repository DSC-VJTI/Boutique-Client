<template>
    <div class="container flex flex-col mx-auto w-full items-center justify-center">
        <div class="px-4 py-5 sm:px-6 w-full border bg-gray-100 shadow mb-4 rounded-md">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Materials</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
                Details and informations about client Materials
            </p>
        </div>
        <div class="mx-auto mb-4 w-3/5 sm:w-96">
            <router-link to="/admin/materials/new">
                <div class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white md:w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">New Material</div>
            </router-link>
        </div>
        <ul class="flex flex-col">
            <material-item
                class="border-gray-400 flex flex-row mb-6"
                v-for="material in materials"
                :key="material.id"
                :name="material.name"
                :mobileNumber="material.mobileNumber"
                :dateCreated="material.dateCreated"
                :id="material.id"
            ></material-item>
        </ul>
    </div>
</template>

<script>
    import MaterialItem from "./MaterialItem"
    export default {
        components: { MaterialItem },
        data() {
            return {
                materials: [
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 1",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "12 April 2021",
                    },
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 2",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "8 April 2021",
                    },
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 3",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "7 April 2021",
                    },
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 4",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "7 April 2021",
                    },
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 5",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "4 April 2021",
                    },
                    {
                        "id" : "1",
                        "name" : "Lorem Ipsum 6",
                        "mobileNumber" : 9999999999,
                        "dateCreated" : "3 April 2021",
                    },
                ]
            }
        },
    }
</script>