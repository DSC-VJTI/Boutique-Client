<template>
  <div>
    <form class="container max-w-4xl mx-auto mb-12 shadow-md md:w-3/4">
      <div class="space-y-6 bg-white">
        <div
          class="w-full bg-gray-100 p-4 md:inline-flex shadow-md justify-items-end md:space-y-0"
        >
          <h2 class="mx-auto text-2xl text-gray-700">Create New Material</h2>
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
            />
          </div>
          <div class="col-span-1 md:inline-block float-right">
            <h2 class="inline-block p-2 w-32 mr-4">Mobile Number</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 180px;"
              placeholder="Mobile Number"
              required
            />
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
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">BOTTOM</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="BOTTOM"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">DUPATTA</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="DUPATTA"
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
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">LACES</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="LACES"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">EMROIDERY</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="EMROIDERY"
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
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">ZIP</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="ZIP"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">BUTTONS</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="BUTTONS"
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
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">CONVAYANCE</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="CONVAYANCE"
            />
          </div>
          <div class="col-span-1 md:inline-block mr-4 ">
            <h2 class="inline-block p-2 w-30 mr-4 text-left">OVERHEADS</h2>
            <input
              type="text"
              class="measurementInput"
              style="width: 120px;"
              placeholder="OVERHEADS"
            />
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
              class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in w-full duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
