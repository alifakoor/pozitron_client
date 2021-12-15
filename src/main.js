import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import VueTheMask from "vue-the-mask";
import Vuex from "vuex";
import VueCookies from "vue3-cookies";
import { globalCookiesConfig } from "vue3-cookies";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// add components
import components from "./installComponents";

//style import
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//remix icon import
import "remixicon/fonts/remixicon.css";

// globalCookiesConfig({
//   expireTimes: "60s",
//   path: "/",
//   domain: "",
//   secure: true,
// });

const app = createApp(App)
  .use(Vuex)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(VueTheMask)
  .use(VueCookies);

// install components
components.install(app);

app.provide("apiURL", "EDFEGTETGvfvg");
app.mount("#app");
