<template>
  <div class="iconicSelectInput" :class="InGrid">
    <span class="p-input-icon-right p-col-12 p-p-0">
      <i :class="iconClass" class="iconSelect p-mr-1"></i>
      <Dropdown
        v-model="selected"
        :options="dataOption"
        class="inputSelectStyle"
        :placeholder="InPlaceholder"
        :style="{ height: InHeight }"
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
    dataOption: {
      required: true,
    },
    inputText: {
      type: String,
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: "",
    };
  },
  created() {
    console.log(this.dataOption);
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfCreateProduct";

.iconicSelectInput {
  position: relative;
  direction: rtl;

  .inputInfo {
    height: fit-content;
    padding: 0px 8px;
    position: absolute;
    top: 0;
    right: 10%;
    transform: translateY(-10%);
    background-color: #fff;
    font-size: 12px;
    color: #7b84b2;
  }
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
    width: 100%;
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
      text-align: right;
    }
    .pi-chevron-down {
      color: $textMuted;
      font-size: 12px;
    }
  }

  .inputSelectStyle:hover {
    border: 1px solid #bbc0d8;
  }

  .inputSelectStyle.p-focus:focus {
    box-shadow: none;
    border: 2px solid #7b84b2;
    outline: none;
  }
}

.hiddenElement {
  visibility: hidden !important;
}
</style>
