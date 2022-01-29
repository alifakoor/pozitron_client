// prime vue
import Button from "primevue/button/Button.vue";
import Dialog from "primevue/dialog/Dialog.vue";
import DataTable from "primevue/datatable/DataTable.vue";
import Column from "primevue/column/Column.vue";
import ColumnGroup from "primevue/columngroup/ColumnGroup.vue";
import Row from "primevue/row/Row.vue";
import Chip from "primevue/chip/Chip.vue";
import Tag from "primevue/tag/Tag.vue";
import Badge from "primevue/badge/Badge.vue";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Galleria from "primevue/galleria";
import ProgressBar from "primevue/progressbar";
import BadgeDirective from "primevue/badgedirective";
import Tooltip from "primevue/tooltip";
import Divider from "primevue/divider";
import Textarea from "primevue/textarea";
import Menu from "primevue/menu";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import Checkbox from "primevue/checkbox";
import FileUpload from "primevue/fileupload";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

// zi
import RTLBreadcrumb from "./components/panel/TheRTLBreadcrumb.vue";
import Sidebar from "./components/panel/TheSidebar.vue";
import Search from "./components/common/components/Search.vue";
import BulkEdit from "./components/common/components/BulkEdit.vue";
import ShowDetail from "./components/panel/ShowFactorDetail.vue";

//mine
import InputHasIcon from "./components/common/components/InputHasIcon.vue";
import InputHasInfo from "./components/common/components/InputHasInfo.vue";
import ImageInput from "./components/common/components/ImageInput.vue";
import SelectOption from "./components/common/components/SelectOption.vue";
import CahangeFactorStatus from "./components/common/components/CahangeFactorStatus.vue";
import DomainCard from "./components/common/components/DomainCard.vue";

export default {
  install(app) {
    // primevue
    app.component("InputText", InputText);
    app.component("Button", Button);
    app.component("Dialog", Dialog);
    app.component("DataTable", DataTable);
    app.component("Column", Column);
    app.component("ColumnGroup", ColumnGroup);
    app.component("Row", Row);
    app.component("Chip", Chip);
    app.component("Tag", Tag);
    app.component("Badge", Badge);
    app.component("InputSwitch", InputSwitch);
    app.component("Checkbox", Checkbox);
    app.component("TriStateCheckbox", TriStateCheckbox);
    app.component("Divider", Divider);
    app.component("Galleria", Galleria);
    app.component("Textarea", Textarea);
    app.component("ProgressBar", ProgressBar);
    app.component("Menu", Menu);
    app.directive("badge", BadgeDirective);
    app.directive("tooltip", Tooltip);
    app.component("Dropdown", Dropdown);
    app.component("SelectOption", SelectOption);
    app.component("DomainCard", DomainCard);
    app.component("FileUpload", FileUpload);
    app.component("TabView", TabView);
    app.component("TabPanel", TabPanel);

    //mine
    app.component("InputHasIcon", InputHasIcon);
    app.component("InputHasInfo", InputHasInfo);
    app.component("ImageInput", ImageInput);
    app.component("CahangeFactorStatus", CahangeFactorStatus);

    // zi
    app.component("zi-rtl-breadcrumb", RTLBreadcrumb);
    app.component("zi-sidebar", Sidebar);
    app.component("zi-search", Search);
    app.component("zi-bulk-edit", BulkEdit);
    app.component("showDetail", ShowDetail);
  },
};
