<template>
  <nav class="header">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'AddResturant' }">Add Restaurant</router-link>
    <router-link :to="{ name: 'UpdateResturant' }">
      Update Restaurant
    </router-link>
    <a href="javascript:void(0)" @click.prevent="logout" class="logout-link">
      Logout
    </a>
  </nav>
</template>

<script>
export default {
  name: "HeaderPage",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
