<template>
  <div class="text-left bg-green-50 rounded mb-5 p-7">
    <router-link class="bg-transparent" :to="blogLink">
      <h3 class="green-h3 bg-transparent">
        {{ title }}
      </h3>
      <p class="bg-transparent mt-2 font-sans text-green-900">
        Last Updated on: {{ last_updated }}
      </p>
      <p class="bg-transparent mt-2 text-l font-mono text-green-600 text-bold">
        {{ content }}
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["title", "last_updated", "content", "id"],
  computed: {
    blogLink() {
      return "/blogs/" + this.id;
    }
  }
};
</script>
