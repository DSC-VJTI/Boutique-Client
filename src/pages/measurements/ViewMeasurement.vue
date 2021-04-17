<template>
    <div class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4">
        <div class="space-y-6 bg-white">
            <div class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0">
                <button @click="updateMeasurement" class="mt-10 update">Update</button>
                <button @click="deleteMeasurement" class="mt-10 delete ml-5">Delete</button>
            </div>
            <!-- Personal Info -->
            <h2 class="px-8 text-xl text-gray-800">Personal info</h2>
            <div class="w-full grid col-span-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-32 mr-4">Name:<span>{{ measurement.name }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block float-right">
                    <h2 class="inline-block p-2 w-32 mr-4">Mobile Number:<span>{{ measurement.mobNum }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block float-right">
                    <h2 class="inline-block p-2 w-32 mr-4">Date Created:<span>{{ measurement.created_on }}</span></h2>
                </div>
            </div>
            <hr/>
            <!-- DL AC C -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-10 mr-4 text-center">DL:<span>{{ measurement.dl }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">AC:<span>{{ measurement.ac }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-10 text-center mr-4">C:<span>{{ measurement.c }}</span></h2>
                </div>
            </div>
            <hr/>
            <!-- L -->
            <h2 class="px-8 text-xl text-gray-800">L</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F:<span>{{ measurement.l.l_f }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">3/4:<span>{{ measurement.l.l_threebyfour }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half:<span>{{ measurement.l.l_half }}</span></h2>
                </div>
            </div>
            <hr/>
            <!-- BC W LW -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">BC:<span>{{ measurement.bc }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">W:<span>{{ measurement.w }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">LW:<span>{{ measurement.lw }}</span></h2>
                </div>
            </div>
            <hr/>
            
            <!-- SH ARM -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">H:<span>{{ measurement.h }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">SH:<span>{{ measurement.sh }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">ARM:<span>{{ measurement.arm }}</span></h2>
                </div>
            </div>
            <hr/>

            <!-- SL -->
            <h2 class="px-8 text-xl text-gray-800">SL</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F:<span>{{ measurement.sl.sl_f }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">3/4:<span>{{ measurement.sl.sl_threebyfour }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half:<span>{{ measurement.sl.sl_half }}</span></h2>
                </div>
            </div>
            <hr/>
            <!-- N -->
            <h2 class="px-8 text-xl text-gray-800">N</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">N:<span>{{ measurement.n.n_n }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F:<span>{{ measurement.n.n_f }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">B:<span>{{ measurement.n.n_b }}</span></h2>
                </div>
            </div>
            <hr/>    
            <!-- BOTTOM -->
            <h2 class="px-8 text-xl text-gray-800">BOTTOM</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F:<span>{{ measurement.bottom_w.bottom_f }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Ankle:<span>{{ measurement.bottom_w.bottom_ankle }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half:<span>{{ measurement.bottom_w.bottom_half }}</span></h2>
                </div>
            </div>
            <!-- BOTTOM L - TH - C -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">L:<span>{{ measurement.bottom_l }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">TH:<span>{{ measurement.bottom_th }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">C:<span>{{ measurement.bottom_c }}</span></h2>
                </div>
            </div>
            <!-- BOTTOM K - R -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">K:<span>{{ measurement.bottom_k }}</span></h2>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">R:<span>{{ measurement.bottom_r }}</span></h2>
                </div>
            </div>
            <hr/>
            <!-- SKETCH -->
            <!-- <h2 class="px-8 text-xl text-gray-800">SKETCHES</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div v-for="(file, key) in files" :key="key" class="col-span-1 file-listing sketchPreview" :style="{ 'background-image': `url(${file.name})` }"></div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["measurementId"],
    data() {
        return {
            measurement : {
                name: "",
                // mobNum: "",
                dl: "", ac: "", c: "",
                l: {
                    l_f:"", l_threebyfour: "", l_half: "",
                },
                bc: "", w: "", lw: "",
                h: "", sh: "", arm: "",
                sl: {
                    sl_f: "", sl_threebyfour: "", sl_half: "",
                },
                n: {
                    n_n: "", n_f: "", n_b: "",
                },
                bottom_w: {
                    bottom_f: "", bottom_ankle: "", bottom_half: "",
                },
                bottom_l: "", bottom_th: "", bottom_c: "", bottom_k: "", bottom_r: ""
            },
        };
    },
    
    methods: {
        updateMeasurement() {
            this.$router.push({ path: `update/${this.measurementId}` });
        },

        async deleteMeasurement() {
            const status = await this.$store.dispatch("measurements/deleteCurrentMeasurement", {
                token: JSON.parse(localStorage.getItem("user")).access_token,
                measurement_id: this.measurementId
            });

            if (status === 204) {
                this.$router.push({
                    name: "seeMeasurements"
                });
            } else if (status === 401) {
                this.$store.dispatch("user/unauthorize");
            } else {
                console.log(status);
                console.log("Something went wrong. Please try again!");
            }
        }
    },

    async created() {
        const measurement = await this.$store.dispatch("measurements/getAMeasurement", {
            measurement_id: this.measurementId
        });
        this.client_name = measurement.name,
        this.dl = measurement.dl,
        this.ac = measurement.ac,
        this.c = measurement.c,
        this.l = measurement.l,
        this.bc = measurement.bc,
        this.w = measurement.w,
        this.lw = measurement.lw,
        this.h = measurement.h,
        this.sh = measurement.sh,
        this.arm = measurement.arm,
        this.sl = measurement.sl,
        this.n = measurement.n,
        this.bottom_w = measurement.bottom_w,
        this.bottom_l = measurement.bottom_l,
        this.bottom_th = measurement.bottom_th,
        this.bottom_c = measurement.bottom_c,
        this.bottom_k = measurement.bottom_k,
        this.bottom_r = measurement.bottom_r
    }
};
</script>