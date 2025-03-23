<template>
  <Header />
  <div class="restaurant-container">
    <h2>{{ isEdit ? "Update" : "Add" }} Restaurant</h2>
    <form @submit.prevent="onAddRestaurant" novalidate>
      <div class="form-group">
        <label for="name">Restaurant Name</label>
        <input v-model="restaurant.name" type="text" id="name" required />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="contact">Contact</label>
        <input
          v-model="restaurant.contact"
          type="text"
          id="contact"
          required
          :maxlength="maxLength.contact"
          @input="validateInput"
        />
        <span class="error" v-if="errors.contact">{{ errors.contact }}</span>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <textarea v-model="restaurant.address" id="address" required></textarea>
        <span class="error" v-if="errors.address">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label for="cuisine">Cuisine</label>
        <input v-model="restaurant.cuisine" type="text" id="cuisine" required />
        <span class="error" v-if="errors.cuisine">{{ errors.cuisine }}</span>
      </div>

      <button type="submit">{{ isEdit ? "Update" : "Add" }} Restaurant</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRestaurantStore } from "@/store/resturant";
import Header from "@/components/Header.vue";
import restaurantMixin from "@/mixins/index.js";
import { allowOnlyNumbers, maxLength } from "@/utils/common";
import { updateRestaurant } from "@/api/index";

export default {
  name: "AddRestaurant",
  components: {
    Header,
  },
  mixins: [restaurantMixin],
  data() {
    return {
      restaurant: {
        name: "",
        contact: "",
        address: "",
        cuisine: "",
      },
      errors: {},
      maxLength,
    };
  },
  computed: {
    ...mapState(useRestaurantStore, ["isEdit", "selectedRestaurant"]),
  },
  mounted() {
    if (this.isEdit && this.selectedRestaurant) {
      this.restaurant = { ...this.selectedRestaurant };
    }
  },
  methods: {
    ...mapActions(useRestaurantStore, ["setEditRestaurant", "resetEditState"]),
    onAddRestaurant() {
      this.errors = {};
      // Validate input fields
      if (!this.restaurant.name) this.errors.name = "Name is required";
      if (!this.restaurant.contact) this.errors.contact = "Contact is required";
      if (!this.restaurant.address) this.errors.address = "Address is required";
      if (!this.restaurant.cuisine) this.errors.cuisine = "Cuisine is required";
      if (Object.keys(this.errors).length > 0) return null;

      if (this.isEdit) {
        updateRestaurant({ id: this.restaurant.id, ...this.restaurant })
          .then((res) => {
            if (res.data && res.status === 200) {
              alert("Restaurant Updated Successfully");
              this.resetForm();
              this.resetEditState();
              this.$router.push({ name: "Home" });
            }
          })
          .catch((error) => {
            alert("Failed to add restaurant. Please try again.", error);
          });
      } else {
        this.createRestaurant(this.restaurant)
          .then((res) => {
            if (res.data && res.status === 200) {
              alert("Restaurant Added Successfully");
              this.resetForm();
              this.$router.push({ name: "Home" });
            }
          })
          .catch((error) => {
            alert("Failed to add restaurant. Please try again.", error);
          });
      }
    },
    resetForm() {
      this.restaurant = {
        name: "",
        contact: "",
        address: "",
        cuisine: "",
      };
      this.errors = {};
    },
    validateInput(event) {
      this.restaurant.contact = allowOnlyNumbers(event.target.value);
    },
  },
};
</script>
