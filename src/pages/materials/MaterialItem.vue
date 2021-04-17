<template>
  <router-link to="/admin/materials/1">
    <div class="measurementItem">
      <div class="flex-1 pl-1 md:mr-16">
        <div class="font-medium">
          {{ name }}
        </div>
        <div class="text-gray-600 text-sm">+91 {{ mobileNumber }}</div>
      </div>
      <div class="text-gray-600 pl-12 text-xs">
        {{ dateCreated }}
      </div>
      <router-link :to="materialLink" class="w-12 text-right flex justify-end">
        <svg
          width="12"
          fill="currentColor"
          height="12"
          class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
          ></path>
        </svg>
      </router-link>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["id", "name", "mobileNumber", "dateCreated"],
  computed: {
    measurementLink() {
      return "/materials/" + this.id;
    }
  }
};
</script>
