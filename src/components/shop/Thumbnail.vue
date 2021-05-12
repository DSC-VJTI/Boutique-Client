<template>
  <div
    class="inline-block mx-auto md:grid md:col-span-1 relative p-2 lg:p-4 hover:scale-110 transform transition-all duration-300"
  >
    <img class="mx-auto" :src="imageURL" alt="" />
  </div>
</template>

<script>
export default {
  props: ["imageURL"]
};
</script>
