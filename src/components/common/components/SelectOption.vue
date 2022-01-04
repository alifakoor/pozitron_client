<template>
  <div class="iconicSelectInput p-mt-3" :class="InGrid">
    <span class="p-input-icon-right p-col-12">
      <i :class="iconClass" class="iconSelect p-mr-1"></i>

      <Dropdown
        v-model="selectedGroupedCity"
        :options="groupedCities"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        class="inputSelectStyle"
        :placeholder="InPlaceholder"
        :style="{ width: InWidth, height: InHeight }"
      >
      </Dropdown>
    </span>
    <small class="inputInfo">{{ inputText }}</small>
  </div>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      default: "",
    },
    InPlaceholder: {
      type: String,
      default: "",
    },
    InGrid: {
      type: String,
      default: "p-col-6",
    },
    InHeight: {
      type: String,
      default: "40px",
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variablesOfCreateProduct";

.iconicSelectInput {
  position: relative;
  direction: rtl;
  .iconSelect {
    z-index: 5;
    width: fit-content;
    height: 100%;
    left: 0 !important;
    margin-top: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inputSelectStyle {
    direction: rtl;
    color: $textMuted;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #a7acb1;
    border-radius: 4px;
    height: 40px;
    padding-right: 10px !important;
    .p-placeholder {
      margin-right: 15px;
      font-size: 14px;
      color: $textMuted;
    }
    .pi-chevron-down {
      color: $textMuted;
      font-size: 12px;
    }
  }
}
</style>
