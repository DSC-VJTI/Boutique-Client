<template>
  <div class="text-left bg-green-50 rounded mb-5 p-7">
    <router-link class="bg-transparent" :to="blogLink">
      <h3 class="green-h3 bg-transparent">
        {{ title }}
      </h3>
      <p class="bg-transparent mt-2 font-sans text-green-900">
        Last Updated on: {{ last_updated }}
      </p>
      <p
        v-html="getContent"
        class="bg-transparent mt-2 text-l font-mono text-green-600 text-bold"
      ></p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["title", "last_updated", "content", "id"],
  computed: {
    blogLink() {
      return "/blogs/" + this.id;
    },
    getContent() {
      return (
        this.content
          .split(" ")
          .slice(0, 25)
          .join(" ") +
        `...<router-link style="color: blue" :to="blogLink">See more</router-link>`
      );
    }
  }
};
</script>
