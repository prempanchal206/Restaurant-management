import { defineStore } from "pinia";
import { fetchRestaurants } from "@/api/index";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurantList: [],
    isEdit: false,
    selectedRestaurant: null,
  }),
  actions: {
    loadRestaurants() {
      fetchRestaurants()
        .then((data) => {
          this.restaurantList = data;
        })
        .catch((error) => {
          alert("Failed to fetch restaurants:", error);
        });
    },
    setEditRestaurant(restaurant) {
      this.isEdit = true;
      this.selectedRestaurant = restaurant;
    },
    resetEditState() {
      this.isEdit = false;
      this.selectedRestaurant = null;
    },
  },
});
