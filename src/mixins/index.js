import { addRestaurant } from "@/api/index.js";

export default {
  methods: {
    fetchRestaurants() {
      return addRestaurant()
        .then((res) => res.data)
        .catch((error) => {
          alert("Error fetching restaurants:", error);
          return [];
        });
    },

    createRestaurant(newRestaurant) {
      return addRestaurant(newRestaurant)
        .then((response) => {
          if (response.status === 201) {
            return { success: true, message: "Restaurant added successfully!" };
          } else {
            return { success: false, message: "Failed to add restaurant." };
          }
        })
        .catch((error) => {
          alert("Failed to add restaurant:", error);
          return { success: false, message: "An error occurred." };
        });
    },
  },
};
