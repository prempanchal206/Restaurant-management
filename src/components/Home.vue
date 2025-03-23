<template>
  <Header />
  <div v-if="restaurants.length">
    <h2 class="title">Restaurant List</h2>
    <table class="restaurant-table">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="restaurant in restaurants" :key="restaurant.id">
          <td>{{ restaurant.name }}</td>
          <td>{{ restaurant.contact }}</td>
          <td>{{ restaurant.address }}</td>
          <td>{{ restaurant.cuisine }}</td>
          <td>
            <font-awesome-icon
              icon="edit"
              class="action-icon edit-icon"
              @click="updateRestaurant(restaurant)"
            />
            <font-awesome-icon
              icon="trash"
              class="action-icon delete-icon"
              @click="deleteRestaurant(restaurant.id, restaurant.name)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <EmptyRecords />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { defineAsyncComponent } from "vue";
import restaurantMixin from "@/mixins/index";
import Header from "@/components/Header.vue";
import Swal from "sweetalert2";
import { useRestaurantStore } from "@/store/resturant";

export default {
  name: "HomePage",
  components: {
    Header,
    EmptyRecords: defineAsyncComponent(() =>
      import("@/components/EmptyRecords.vue")
    ),
  },
  mixins: [restaurantMixin],
  data() {
    return {
      restaurants: [],
    };
  },
  computed: {
    ...mapState(useRestaurantStore, "restaurants"),
    tableHeaders() {
      return ["Name", "Contact", "Address", "Cuisine", "Actions"];
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.loadRestaurants();
    });
  },
  methods: {
    ...mapActions(useRestaurantStore, ["setEditRestaurant", "loadRestaurants"]),
    loadRestaurants() {
      this.fetchRestaurants()
        .then((data) => {
          this.restaurants = data;
        })
        .catch((error) => {
          alert.error("Failed to fetch restaurants:", error);
        });
    },
    updateRestaurant(restaurant) {
      this.setEditRestaurant(restaurant);
      this.$router.push({ name: "UpdateResturant" });
    },
    deleteRestaurant(id, name) {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete "${name}".`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.restaurants = this.restaurant.filter(
            (restaurant) => restaurant.id !== id
          );
          Swal.fire({
            title: "Deleted!",
            text: `${name} has been removed successfully.`,
            icon: "success",
          });
        }
      });
    },
  },
};
</script>
