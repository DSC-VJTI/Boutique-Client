<template>
  <div>
    <h1 class="green text-center">Admin Dashboard</h1>
  </div>
</template>

<script>
export default {
  created() {
    if (!this.$store.getters["user/isAuthenticated"]) {
      if (
        !localStorage.getItem("isAuthenticated") ||
        localStorage.getItem("isAuthenticated") === false
      )
        this.$router.replace("/admin/login");
      else this.$store.commit("user/setAuth", { isAuthenticated: true });
    }
  }
};
</script>
