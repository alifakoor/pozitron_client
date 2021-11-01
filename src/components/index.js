// prime vue
import Breadcrumb from 'primevue/breadcrumb'
import BreadcrumbItem from 'primevue/breadcrumb/BreadcrumbItem.vue'
import InputText from 'primevue/inputtext/InputText.vue'
import Button from 'primevue/button/Button.vue'
import Dialog from 'primevue/dialog/Dialog.vue'
import DataTable from 'primevue/datatable/DataTable.vue'
import Column from 'primevue/column/Column.vue'
import ColumnGroup from 'primevue/columngroup/ColumnGroup.vue'

// zi
import RTLBreadcrumb from './TheRTLBreadcrumb.vue'
import Navbar from './TheNavbar.vue'
import Sidebar from './TheSidebar.vue'
import Search from './common/Search.vue'
import BulkEdit from './common/BulkEdit.vue'

export default {
	install(app) {
		// primevue
		app.component('Breadcrumb', Breadcrumb)
		app.component('BreadcrumbItem', BreadcrumbItem)
		app.component('InputText', InputText)
		app.component('Button', Button)
		app.component('Dialog', Dialog)
		app.component('DataTable', DataTable)
		app.component('Column', Column)
		app.component('ColumnGroup', ColumnGroup)

		// zi
		app.component('zi-rtl-breadcrumb', RTLBreadcrumb)
		app.component('zi-navbar', Navbar)
		app.component('zi-sidebar', Sidebar)
		app.component('zi-search', Search)
		app.component('zi-bulk-edit', BulkEdit)
	}
}
