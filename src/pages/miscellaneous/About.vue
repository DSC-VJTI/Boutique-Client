<template>
  <div class="flex-none">
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif my-8">
      About Us
    </h1>
    <div
      class="w-5/6 sm:w-2/3 md:flex mx-auto m-5 my-10 md:my-0 shadow-2xl"
    >
      <div
        class="h-48 w-full md:h-auto md:w-1/3 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style="background-image: url('https://images.unsplash.com/photo-1519167130418-c3640bd21b7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoZXN8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60')"
      ></div>
      <div
        class="border-r border-b border-l border-grey-light md:border-l-0 md:border-t md:border-grey-light bg-gray-50 rounded-b md:rounded-b-none md:rounded-r p-8 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <div class="text-black text-3xl mb-4">Who are we?</div>
          <p class="text-grey-darker font-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.<br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="text-4xl flex flex-row items-center">
          <div class="text-black text-3xl inline-block">Follow Us:</div>
          <a
            class="px-8 hover:scale-110 transform duration-200 hover:text-gray-300"
            href="https://instagram.com/fashion.o.phile"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            class="hover:scale-110 transform duration-200 hover:text-gray-300"
            href="mailto:fashnophl@gmail.com"
          >
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
