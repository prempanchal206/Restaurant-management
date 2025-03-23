<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" novalidate>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          autocomplete="username"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          autocomplete="new-password"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>
      <button type="submit">Login</button>

      <p class="login-link">
        Don't have an account?
        <router-link :to="{ name: 'Signup' }">Signup here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import Regex from "@/utils/index";
import { loginUser } from "@/api/index";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  mounted() {
    let userDetail = localStorage.getItem("user-info");
    if (userDetail) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    validEmail(email) {
      return Regex.EMAIL_REGEX.test(email);
    },
    validateForm() {
      this.errors = {};

      // Email validation
      if (!this.email) {
        this.errors.email = "Email is required.";
      } else if (!this.validEmail(this.email)) {
        this.errors.email = "Invalid email.";
      }

      // Password validation
      if (!this.password) {
        this.errors.password = "Password is required.";
      } else if (this.password.length < 6) {
        this.errors.password =
          "Invalid password. Must be at least 6 characters.";
      }
      return Object.keys(this.errors).length === 0;
    },
    handleLogin() {
      if (!this.validateForm()) return false;

      loginUser(this.email, this.password)
        .then((res) => {
          if (res.status === 200 && res.data.length) {
            localStorage.setItem("user-info", JSON.stringify(res.data[0]));
            alert("Login Successful!");
            this.resetForm();
            this.$router.push({ name: "Home" });
          } else {
            alert("You are not registered. Please sign up.");
            this.$router.push({ name: "Signup" });
          }
        })
        .catch((error) => {
          alert("Login failed", error);
        });
    },
    resetForm() {
      this.user = {
        email: "",
        password: "",
      };
      this.errors = {};
    },
  },
};
</script>
