import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import components from './components'

// css from the Primevue
import 'primevue/resources/themes/saga-blue/theme.css' // theme
import 'primevue/resources/primevue.min.css' // core css
import 'primeicons/primeicons.css' // icons
import 'primeflex/primeflex.css' // flex

const app = createApp(App).use(store).use(router).use(PrimeVue)

// use components
components.install(app)

// mount
app.mount('#app')
