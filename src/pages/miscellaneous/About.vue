<template>
  <div class="flex-none">
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif my-8">
      About Us
    </h1>
    <div
      class="w-5/6 sm:w-2/3 lg:w-1/2 md:flex mx-auto my-5 sm:my-20 shadow-2xl"
    >
      <div
        class="h-48 w-full md:h-auto md:w-1/3 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style="background-image: url('https://images.unsplash.com/photo-1519167130418-c3640bd21b7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')"
      ></div>
      <div
        class="border-r border-b border-l border-grey-light md:border-l-0 md:border-t md:border-grey-light bg-gray-50 rounded-b md:rounded-b-none md:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <div class="text-black font-bold text-xl mb-2">Who are we?</div>
          <p class="text-grey-darker text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.<br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="inline-block mt-2 mx-auto md:ml-0">
          <router-link
            class="w-12 h-12 inline-block mx-2 hover:scale-110 transform duration-200"
            to="#"
          >
            <img
              class="w-12 h-12 mr-4"
              src="../../assets/images/instagram.png"
              alt="Instagram of Owner"
            />
          </router-link>
          <router-link
            class="w-12 h-12 inline-block mx-2 hover:scale-110 transform duration-200"
            to="#"
          >
            <img
              class="w-12 h-12 mr-4"
              src="../../assets/images/gmail.png"
              alt="Gmail of Owner"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
