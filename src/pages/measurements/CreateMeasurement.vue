<template>
    <div>
    <form class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4">
        <div class="space-y-6 bg-white">
            <div class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0">
                <h2 class="mx-auto text-2xl text-gray-700">Create New Measurement</h2>
            </div>
            <!-- Personal Info -->
            <h2 class="px-8 text-xl text-gray-800">Personal info</h2>
            <div class="w-full grid col-span-1 md:grid-cols-2 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-32 mr-4">Name</h2>
                    <input type="text" class="measurementInput" style="width: 180px;" placeholder="Name" required />
                </div>
                <div class="col-span-1 md:inline-block float-right">
                    <h2 class="inline-block p-2 w-32 mr-4">Mobile Number</h2>
                    <input type="text" class="measurementInput" style="width: 180px;" placeholder="Mobile Number" required/>
                </div>
            </div>
            <hr/>
            <!-- DL AC C -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-10 mr-4 text-center">DL</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="DL"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">AC</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="AC"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block p-2 w-10 text-center mr-4">C</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="C"/>
                </div>
            </div>
            <hr/>
            <!-- L -->
            <h2 class="px-8 text-xl text-gray-800">L</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
                    <input type="text" id="" class="measurementInput" placeholder="F"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">3/4</h2>
                    <input type="text" id="" class="measurementInput" placeholder="3/4"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
                    <input type="text" id="" class="measurementInput" placeholder="HALF"/>
                </div>
            </div>
            <hr/>
            <!-- BC W LW -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">BC</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="BC"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">W</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="W"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">LW</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="LW"/>
                </div>
            </div>
            <hr/>
            
            <!-- SH ARM -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">SH</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="SH"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">ARM</h2>
                    <input type="text" id="name" class="measurementInput" placeholder="ARM"/>
                </div>
            </div>
            <hr/>

            <!-- SL -->
            <h2 class="px-8 text-xl text-gray-800">SL</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
                    <input type="text" id="" class="measurementInput" placeholder="F"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">3/4</h2>
                    <input type="text" id="" class="measurementInput" placeholder="3/4"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
                    <input type="text" id="" class="measurementInput" placeholder="HALF"/>
                </div>
            </div>
            <hr/>
            <!-- N -->
            <h2 class="px-8 text-xl text-gray-800">N</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">N</h2>
                    <input type="text" id="" class="measurementInput" placeholder="N"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
                    <input type="text" id="" class="measurementInput" placeholder="F"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">B</h2>
                    <input type="text" id="" class="measurementInput" placeholder="B"/>
                </div>
            </div>
            <hr/>    
            <!-- BOTTOM_W -->
            <h2 class="px-8 text-xl text-gray-800">BOTTOM_W</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">F</h2>
                    <input type="text" id="" class="measurementInput" placeholder="F"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Ankle</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Ankle"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">Half</h2>
                    <input type="text" id="" class="measurementInput" placeholder="HALF"/>
                </div>
            </div>
            <!-- BOTTOM L - TH - C -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">L</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Bottom L"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">TH</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Bottom TH"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">C</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Bottom C"/>
                </div>
            </div>
            <!-- BOTTOM K - R -->
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">K</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Bottom K"/>
                </div>
                <div class="col-span-1 md:inline-block mr-4">
                    <h2 class="inline-block text-center p-2 w-10 mr-4">R</h2>
                    <input type="text" id="" class="measurementInput" placeholder="Bottom R"/>
                </div>
            </div>
            <hr/>
            <!-- SKETCH -->
            <h2 class="px-8 text-xl text-gray-800">SKETCHES</h2>
            <div class="w-full grid col-span-1 justify-items-center md:grid-cols-3 px-8 space-y-2 text-gray-500 md:space-y-0">
                <div class="col-span-1">
                    <input class="hidden" ref="fileInput1" id="files1" type="file" @input="pickFile">
                    <label class="sketchInput" for="files1">Upload Image</label>
                    <br>
                    <div class="sketchPreview" :style="{ 'background-image': `url(${previewImage1})` }" @click="selectImage"></div>
                </div>
                <div class="col-span-1">
                    <input class="hidden" ref="fileInput2" id="files2" type="file" @input="pickFile">
                    <label class="sketchInput" for="files2">Upload Image</label>
                    <br>
                    <div class="sketchPreview" :style="{ 'background-image': `url(${previewImage2})` }" @click="selectImage"></div>
                </div>
                <div class="col-span-1">
                    <input class="hidden" ref="fileInput3" id="files3" type="file" @input="pickFile">
                    <label class="sketchInput" for="files3">Upload Image</label>
                    <br>
                    <div class="sketchPreview" :style="{ 'background-image': `url(${previewImage3})` }" @click="selectImage"></div>
                </div>
            </div>
            <!-- SAVE -->
            <div class="w-full grid bg-gray-100 py-6 px-16 md:px-4 md:inline-flex shadow-md justify-items-end md:space-y-0">
                <div class="mx-auto md:mr-2 w-4/5 md:w-1/4">
                    <button type="submit" class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Save</button>
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
        previewImage1: null,
        previewImage2: null,
        previewImage3: null,
      };
    },
  methods: {
      selectImage () {
          this.$refs.fileInput1.click();
      },
      pickFile () {
        let input1 = this.$refs.fileInput1;
        let file1 = input1.files;
        let input2 = this.$refs.fileInput2;
        let file2 = input2.files;
        let input3 = this.$refs.fileInput3;
        let file3 = input3.files;
        if (file1 && file1[0]) {
          let reader = new FileReader;
          reader.onload = e => {
            this.previewImage1 = e.target.result;
          }
          reader.readAsDataURL(file1[0]);
          this.$emit('input', file1[0]);
        }

        if (file2 && file2[0]) {
          let reader = new FileReader;
          reader.onload = e => {
            this.previewImage2 = e.target.result;
          }
          reader.readAsDataURL(file2[0]);
          this.$emit('input', file2[0]);
        }
        
        if (file3 && file3[0]) {
          let reader = new FileReader;
          reader.onload = e => {
            this.previewImage3 = e.target.result;
          }
          reader.readAsDataURL(file3[0]);
          this.$emit('input', file3[0]);
        }
      }
  }
}
</script>