<template>
  <div class="p-grid p-m-0" style="height: fit-content">
    <TheGeneralSpecifications></TheGeneralSpecifications>
    <TheProductGrouping></TheProductGrouping>
  </div>
  <div class="p-grid p-m-2">
    <div class="middleWrapper p-ai-center p-jc-center p-d-flex p-col-12 p-mt-2">
      <div
        class="p-d-flex p-jc-between p-px-3 p-ai-center middleBoxWrapper p-col-12"
      >
        <div class="p-field-checkbox p-mb-0">
          <Checkbox
            id="groupProduct"
            v-model="groupProduct"
            :binary="true"
            class="p-mx-2"
          />
          <label class="limitLabel" for="groupProduct"
            >می‌خواهم به محصول ویژگی اضافه کنم.</label
          >
        </div>
        <i class="pi pi-angle-down"></i>
      </div>
    </div>
  </div>
  <div class="p-grid p-m-0">
    <TheAdditionalSpecifications></TheAdditionalSpecifications>
    <TheTransportationSpecifications></TheTransportationSpecifications>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import axios from "axios";

export default {
  components: {
    TheGeneralSpecifications: defineAsyncComponent(() =>
      import("../../components/create-product/TheGeneralSpecifications.vue")
    ),
    TheTransportationSpecifications: defineAsyncComponent(() =>
      import(
        "../../components/create-product/TheTransportationSpecifications.vue"
      )
    ),
    GeneralBox: defineAsyncComponent(() =>
      import("../../components/create-product/GeneralBox.vue")
    ),
    TheProductGrouping: defineAsyncComponent(() =>
      import("../../components/create-product/TheProductGrouping.vue")
    ),
    TheAdditionalSpecifications: defineAsyncComponent(() =>
      import("../../components/create-product/TheAdditionalSpecifications.vue")
    ),
  },
  data() {
    return {
      groupProduct: false,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variablesOfCreateProduct";

* {
  font-family: "VazirFD";
}
*::placeholder {
  font-family: "VazirFD";
  text-align: right;
  margin-right: 4px;
}
textarea,
input {
  font-family: "VazirFD" !important;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  direction: rtl;
}
body {
  background-color: #e5e5e5;
}

.middleWrapper {
  direction: rtl;
  height: 56px;
}
.middleBoxWrapper {
  background: #fff;
  height: 56px;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 8px;
  .pi {
    color: #b4b4b4;
    font-size: 18px;
  }
}
</style>
