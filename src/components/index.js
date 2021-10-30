// prime vue
import Breadcrumb from 'primevue/breadcrumb'
import BreadcrumbItem from 'primevue/breadcrumb/BreadcrumbItem.vue'
import Menu from 'primevue/menu'

// zi
import RTLBreadcrumb from './TheRTLBreadcrumb.vue'
import Navbar from './TheNavbar.vue'

export default {
  install (app) {
    // primevue
    app.component('Breadcrumb', Breadcrumb)
    app.component('BreadcrumbItem', BreadcrumbItem)
    app.component('Menu', Menu)

    // zi
    app.component('zi-rtl-breadcrumb', RTLBreadcrumb)
    app.component('zi-navbar', Navbar)
  }
}
