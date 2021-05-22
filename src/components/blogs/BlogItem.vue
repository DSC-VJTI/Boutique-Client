<template>
  <router-link :to="blogLink" class="blogItem text-left rounded mb-10">
    <div class="grid grid-cols-1 md:grid-cols-3 md:p-3">
      <div
        class="file-listing sketchPreview rounded-tl-lg rounded-tr-lg md:rounded-none"
        style="width:100%;"
        :style="{ 'background-image': `url(${cover_photo})` }"
      ></div>
      <div class="md:col-span-2 md:ml-5 p-7">
        <h3 class="text-gray-800 text-3xl font-semibold">
          <router-link :to="blogLink">{{ title }}</router-link>
        </h3>
        <p class="text-gray-400 text-sm italic py-2">
          Last Updated on: {{ last_updated }}
        </p>
        <p v-html="getContent" class="mt-4 text-lg text-gray-700 text-bold"></p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["title", "last_updated", "content", "id", "cover_photo"],
  computed: {
    blogLink() {
      return "/blogs/" + this.id;
    },
    getContent() {
      return (
        this.content
          .split(" ")
          .slice(0, 10)
          .join(" ") + `...`
      );
    }
  }
};
</script>
