import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import VueTheMask from "vue-the-mask";

import Steps from "primevue/steps";
import Galleria from "primevue/galleria";

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
app.component("Steps", Steps);
app.component("Galleria", Galleria);

app.mount("#app");
