<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="submitForm" novalidate>
      <!-- novalidate - Disables browser's built-in validation messages, allowing custom validation handling -->
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="user.name" type="text" id="name" autocomplete="name" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="user.email"
          type="email"
          id="email"
          autocomplete="username"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          id="password"
          autocomplete="new-password"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          v-model="user.confirmPassword"
          autocomplete="new-password"
          type="password"
          id="confirmPassword"
        />
        <span class="error" v-if="errors.confirmPassword">{{
          errors.confirmPassword
        }}</span>
      </div>

      <button type="submit" @click="onSignup">Signup</button>

      <p class="login-link">
        Already a user?
        <router-link :to="{ name: 'Login' }">Login here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import Regex from "@/utils/index";
import { signupUser } from "@/api/index";

export default {
  name: "SignupPage",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
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
    validateForm() {
      this.errors = {};

      if (!this.user.name) {
        this.errors.name = "Name is required.";
      }

      if (!this.user.email) {
        this.errors.email = "Email is required.";
      } else if (!this.validEmail(this.user.email)) {
        this.errors.email = "Invalid email.";
      }

      if (!this.user.password) {
        this.errors.password = "Password is required.";
      } else if (this.user.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
      }

      if (!this.user.confirmPassword) {
        this.errors.confirmPassword = "Confirm Password is required.";
      } else if (this.user.confirmPassword !== this.user.password) {
        this.errors.confirmPassword = "Passwords must match.";
        this.errors.password = "Passwords must match.";
      }

      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
      return Regex.EMAIL_REGEX.test(email);
    },
    submitForm() {
      if (!this.validateForm()) return false;

      signupUser(this.user)
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem("user-info", JSON.stringify(res.data));
            alert("Signup Successful!");
            this.resetForm();
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    resetForm() {
      this.user = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      this.errors = {};
    },
  },
};
</script>
