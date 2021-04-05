<template>
  <div>
    <div>
      <div class="grid grid-rows-1 grid-cols-1 gap-4 py-5">
        <img
          class="justify-self-center"
          src="https://images.unsplash.com/photo-1572798272168-9df8bb95771e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60"
        />
      </div>
      <div class="grid grid-rows-1 grid-cols-4 gap-4 lg:px-60 md:px-24 py-5">
        <div>
          <img
            src="https://images.unsplash.com/photo-1572798272168-9df8bb95771e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1572798272168-9df8bb95771e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1572798272168-9df8bb95771e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60"
          />
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1572798272168-9df8bb95771e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&auto=format&fit=crop&w=600&q=60"
          />
        </div>
      </div>
    </div>
    <div class="text-center bg-green-100 my-10 py-5">
      <p class="text-green-800 text-base font-mono p-2 tracking-widest">
        BLACK COLLECTION
      </p>
      <h1 class="font-extrabold font-serif text-4xl text-green-800 mb-5">
        Black Dress with Floral Print
      </h1>
      <p class="font-sans text-base text-green-800 mb-5">
        A specialist label creating luxury essentials. Ethically crafted with an
        unwavering commitment to exceptional quality.
      </p>
      <h1 class="mb-5 font-extrabold">
        <span class="font-mono text-3xl text-green-900">Rs. 1899</span
        >&emsp;&emsp;<del class="font-mono text-xl text-gray-400">Rs. 2599</del>
      </h1>
      <div class="m-5">
        <span>Size: </span>
        <label for="xxl" class="p-2 bg-green-500 text-white m-2 rounded">
          XXL
          <input class="visible" type="radio" name="size" id="xxl" />
        </label>
        <label for="xl" class="p-2 bg-green-500 text-white m-2 rounded">
          XL
          <input class="visible" type="radio" name="size" id="xl" />
        </label>
        <label for="l" class="p-2 bg-green-500 text-white m-2 rounded">
          L
          <input class="visible" type="radio" name="size" id="l" />
        </label>
        <label for="s" class="p-2 bg-green-500 text-white m-2 rounded">
          S
          <input class="visible" type="radio" name="size" id="s" />
        </label>
      </div>

      <input
        class="outline-none p-2 mx-4"
        value="1"
        type="number"
        min="1"
        max="100"
      />
      <button
        class="text-white bg-green-800 text-sm font-mono p-3 m-2 hover:shadow-xl"
      >
        ADD TO CART
      </button>
    </div>

    <div class="bg-green-100 my-10 p-5">
      <h1 class="font-extrabold font-serif text-3xl text-green-600 m-2">
        Additional Information
      </h1>
      <hr />
      <p class="p-3 font-bold text-lg">
        Nam tempus turpis at metus scelerisque placerat nulla deumantos
        solicitud felis. Pellentesque diam dolor, elementum etos lobortis des
        mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des
        commodo pharetras loremos.
      </p>
      <p class="pb-3 px-3 font-bold text-xl">
        Products Infomation
      </p>
      <p class="pb-3 px-3 text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit
        amet felis elementum, porta neque et, porta est. Sed quis porta ligula.
        Ut eget lacinia turpis, id convallis ex. Vestibulum dapibus metus eget
        euismod tincidunt. Ut sollicitudin gravida volutpat. Vestibulum quis
        accumsan ante. Pellentesque sed sapien fermentum lectus lacinia varius.
      </p>
      <p class="pb-3 px-3 font-bold text-xl">
        Material used
      </p>
      <p class="pb-3 px-3 text-lg">
        Etiam mollis mi lectus. Vivamus sed ipsum eget neque luctus imperdiet.
        Fusce sit amet ex vel metus volutpat sodales. Nulla tincidunt, erat nec
        lacinia tempus, tortor mi sodales tortor, ac malesuada eros est quis
        odio. Vivamus varius convallis lacus at rutrum. Aenean nunc magna,
        bibendum at rutrum quis, elementum in turpis. Etiam fringilla fermentum
        enim, vitae congue metus accumsan id. Aliquam mollis mattis est ut
        egestas. Fusce pretium hendrerit magna, non mattis neque accumsan non.
      </p>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
input[type="radio"]:checked + label {
  background-color: #bbb;
}
</style>
