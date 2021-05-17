<template>
  <router-link :to="blogLink" class="blogItem text-left rounded mb-10 p-7">
    <div class="grid grid-cols-3">
      <div class="col-span-2">
        <h3 class="text-gray-800 text-3xl font-semibold">
          <router-link :to="blogLink">{{ title }}</router-link>
        </h3>
        <p class="text-gray-400 text-sm italic py-2">
          Last Updated on: {{ last_updated }}
        </p>
        <p v-html="getContent" class="mt-4 text-lg text-gray-700 text-bold"></p>
      </div>
      <div>
        <div
          class="file-listing sketchPreview"
          :style="{ 'background-image': `url(${cover_photo})` }"
        ></div>
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
