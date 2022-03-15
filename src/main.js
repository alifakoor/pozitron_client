import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import VueTheMask from "vue-the-mask";
import Vuex from "vuex";
import VueCookies from "vue3-cookies";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

// add components
import components from "./installComponents";

//style import
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App)
  .use(Vuex)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(VueTheMask)
  .use(VueCookies)
  .use(Vue3PersianDatetimePicker, {
    name: "DatePicker",
    props: {
      format: "YYYY-MM-DD HH:mm",
      displayFormat: "jYYYY-jMM-jDD",
      editable: false,
      inputClass: "form-control my-custom-class-name",
      placeholder: "Please select a date",
      altFormat: "YYYY-MM-DD HH:mm",
      color: "#00acc1",
      autoSubmit: false,
      //...
      //... And whatever you want to set as default.
      //...
    },
  });

// install components
components.install(app);

app.mount("#app");
