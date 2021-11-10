import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import VueTheMask from "vue-the-mask";
import ToastService from "primevue/toastservice";

import Toast from "primevue/toast";

//style import
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//remix icon import
import "remixicon/fonts/remixicon.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(VueTheMask);
app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
