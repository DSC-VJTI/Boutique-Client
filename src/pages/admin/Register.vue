<template>
  <div class="p-5 text-center">
    <h1 class="green mb-10">Admin Register</h1>
    <div>
      <form class="m-5" @submit.prevent="register">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Full Name"
            v-model.trim="fullname"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ fullnameError }}</span>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Username"
            v-model.trim="username"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ usernameError }}</span>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            type="password"
            placeholder="Password"
            v-model.trim="password"
            required
          />
          <br /><span class="text-red-600 font-bold">{{ passwordError }}</span>
        </div>
        <div class="form-group">
          <button class="mt-10">Add Admin</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: "",
      username: "",
      password: "",
      fullnameError: "",
      usernameError: "",
      passwordError: "",
      isValid: true
    };
  },
  methods: {
    validate() {
      this.isValid = true;

      const fullnamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){1,3}$/g;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const usernamePattern = /^[A-Za-z0-9]{1,}$/;

      if (!passwordPattern.test(this.password)) {
        this.passwordError =
          "*Please enter a password with minimum eight characters, at least one letter, one number and one special character.";
        this.isValid = false;
      } else this.passwordError = "";

      if (!fullnamePattern.test(this.fullname)) {
        this.fullnameError = "*Please enter a valid name.";
        this.isValid = false;
      } else this.fullnameError = "";

      if (!usernamePattern.test(this.username)) {
        this.usernameError = "*Please enter only letters and numbers.";
        this.isValid = false;
      } else this.usernameError = "";
    },

    async register() {
      this.validate();

      if (!this.isValid) return;

      const status = await this.$store.dispatch("user/register", {
        body: {
          username: this.username,
          full_name: this.fullname,
          password: this.password
        },
        token: JSON.parse(localStorage.getItem("user")).access_token
      });

      if (status === 201) {
        this.resetInputs();
        this.resetErrors();
        this.$store.dispatch('user/unauthorize');
        this.$router.replace("/admin/login");
      } else if (status === 400) {
        this.usernameError = "*Username already taken.";
      } else if (status === 401) {
        this.$store.dispatch("user/unauthorize");
      } else {
        console.log("Something went wrong", status);
      }
    },
    resetErrors() {
      this.usernameError = "";
      this.fullnameError = "";
      this.passwordError = "";
    },
    resetInputs() {
      this.username = "";
      this.fullname = "";
      this.password = "";
    }
  }
};
</script>

<style></style>
