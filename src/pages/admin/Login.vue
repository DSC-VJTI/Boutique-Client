<template>
  <base-spinner :show="isLoading"></base-spinner>
  <div
    class="p-5 text-center md:bg-gray-50 md:shadow-2xl w-full md:w-3/5 lg:w-2/5 mx-auto pb-10 md:mt-20"
  >
    <h1 class="green mb-10">Admin Login</h1>
    <div>
      <form @submit.prevent="login">
        <div class="form-group mb-10" style="width:370px;">
          <input
            class="form-control"
            type="text"
            placeholder="Username"
            v-model.trim="username"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ usernameError }}</span>
        </div>
        <div class="form-group mb-10" style="width:370px;">
          <input
            class="form-control"
            type="password"
            v-model.trim="password"
            placeholder="Password"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ passwordError }}</span>
        </div>
        <div class="form-group" style="width:370px;">
          <input type="checkbox" class="outline-none" v-model="rememberMe" />
          <span class="ml-3 text-gray-500">Remember Me</span>
        </div>
        <div class="form-group" style="width:370px;">
          <button class="mt-5">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      isValid: true,
      rememberMe: false,
      isLoading: false
    };
  },
  methods: {
    resetInputs() {
      this.username = "";
      this.password = "";
    },

    resetErrors() {
      this.usernameError = "";
      this.passwordError = "";
    },

    validate() {
      this.isValid = true;
      const usernamePattern = /^[A-Za-z0-9]{4,}$/;

      if (this.password.length < 8) {
        this.passwordError =
          "*Please enter a password with minimum eight characters.";
        this.isValid = false;
      } else this.passwordError = "";

      if (!usernamePattern.test(this.username)) {
        this.usernameError = "*Please enter a valid username.";
        this.isValid = false;
      } else this.usernameError = "";
    },

    async login() {
      this.isLoading = true;
      this.validate();
      if (!this.isValid) {
        this.isLoading = false;
        return;
      }

      const status = await this.$store.dispatch("user/login", {
        body: {
          username: this.username,
          password: this.password
        }
      });
      if (status === 200) {
        this.resetInputs();
        this.resetErrors();

        if (this.rememberMe) {
          this.$store.commit("user/setRememberMe", { rememberMe: true });
          localStorage.setItem("rememberMe", true);
          localStorage.setItem("isAuthenticated", true);
        }
        this.isLoading = false;
        this.$router.replace("/admin");
      } else if (status === 401) {
        this.passwordError = "Incorrect Password!";
      } else if (status === 404) {
        this.usernameError = "User not found!";
      } else {
        console.log("Something went Wrong", status);
      }
      this.isLoading = false;
    }
  },
  created() {
    if (
      this.$store.getters["user/isAuthenticated"] ||
      localStorage.getItem("rememberMe")
    ) {
      this.$store.commit("user/setAuth", {
        isAuthenticated: true
      });
      this.$router.replace("/admin");
    }
  }
};
</script>
