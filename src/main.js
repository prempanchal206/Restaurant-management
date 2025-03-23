import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Signup from "@/components/Signup.vue";
import "@/assets/main.css";
import FontAwesomeIcon from "@/plugins/fontawesome";
import swalPlugin from "@/plugins/swal";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app
  .component("SignupPage", Signup)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(swalPlugin)
  .use(pinia)
  .mount("#app");
