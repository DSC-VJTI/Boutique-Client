<template>
  <div
    class="flex-none mx-auto md:grid md:col-span-1 relative p-2 lg:p-4 hover:scale-110 transform transition-all duration-300"
    style="@media(max-width:600px){ width:30vw; };"
  >
    <img
      class="mx-auto h-40 object-cover"
      style="@media(max-width:600px){ width:30vw; };"
      :src="imageURL"
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: ["imageURL"]
};
</script>
