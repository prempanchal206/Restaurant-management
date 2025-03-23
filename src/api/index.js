import axios from "axios";

const API_URL = "http://localhost:3000/users"; // Base API URL
const RESTURANT_API_URL = "http://localhost:3000/resturant"; // Restaurant API URL

// Signup
export const signupUser = (userData) => {
  return axios.post(API_URL, userData);
};

// Login
export const loginUser = (email, password) => {
  return axios.get(`${API_URL}?email=${email}&password=${password}`);
};

// Add Restaurant
export const addRestaurant = (restaurant) => {
  return axios.get(RESTURANT_API_URL, restaurant);
};

// Update Restaurant
export const updateRestaurant = (restaurant) => {
  return axios.put(`${RESTURANT_API_URL}/${restaurant.id}`, restaurant);
};
