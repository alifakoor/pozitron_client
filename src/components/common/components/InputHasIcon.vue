<template>
  <div class="iconicInput p-mt-1" :class="InGrid">
    <span class="p-input-icon-left p-p-0 p-col-12">
      <i
        :class="[
          iconClass,
          { bgButtonGray: buttonIcon == 'true' },
          { bgIconGray: buttonIcon == 'false' },
        ]"
        class="iconInput"
        :style="{
          borderColor: notValidData ? '#f44336' : '',
          height: InHeight,
        }"
      ></i>
      <InputText
        :type="inType"
        :placeholder="InPlaceholder"
        class="inputStyle"
        :style="{
          height: InHeight,
          direction: 'rtl',
        }"
        :disabled="disabled"
        :min="inType == 'number' ? 0 : ''"
        :max="MaxValue"
        v-model="inputValue"
        @blur="isDataNull()"
        @click="() => (notValidData = false)"
        :class="{ 'p-invalid': notValidData }"
        aria-describedby="productName-help"
      />
    </span>
    <small
      id="productName-help"
      class="warningTxt p-ai-center"
      :class="{ 'p-d-flex': notValidData, 'p-d-none': !notValidData }"
      ><i class="ri-error-warning-line p-ml-1 warningTxtIcon"></i
      >{{ validationErr }}</small
    >
    <small class="inputInfo" :style="{ color: disabled ? '#D2D5D8' : '' }">{{
      inputText
    }}</small>
  </div>
</template>

<script>
export default {
  emits: ["changeInputValue"],
  data() {
    return {
      notValidData: false,
      inputValue: null,
    };
  },
  props: {
    iconClass: {
      type: String,
      default: "",
    },
    inputText: {
      type: String,
      default: "",
    },
    InPlaceholder: {
      type: String,
      default: "",
    },
    inType: {
      type: String,
      default: "text",
    },
    InHeight: {
      type: String,
      default: "40px",
    },
    InGrid: {
      type: String,
      default: "p-col-6",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonIcon: {
      type: String,
      default: "false",
    },
    validation: {
      required: false,
      type: String,
      default: "false",
    },
    validationErr: {
      required: false,
      type: String,
    },
    MaxValue: {
      required: false,
    },
  },
  methods: {
    isDataNull() {
      if (
        (this.inputValue === "" && this.validation == "true") ||
        (this.inputValue === null && this.validation == "true")
      ) {
        this.notValidData = true;
      } else this.notValidData = false;
    },
  },
  watch: {
    inputValue: function () {
      this.$emit("changeInputValue", this.inputValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";

.iconicInput {
  margin: 0;
  position: relative;
  .inputInfo {
    height: fit-content;
    padding: 0px 4px;
    position: absolute;
    top: 0;
    right: 5%;
    transform: translateY(-10%);
    background-color: #fff;
    font-size: 12px;
  }
  .iconInput {
    width: 50px;
    height: 40px;
    left: 0 !important;
    margin-top: 0;
    top: 0;
    background-color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px 0px 0px 4px;
    border: 1px solid #a7acb1;
    border-right: none;
  }
  .bgIconGray {
    background-color: $iconGray;
  }
  .bgButtonGray {
    background-color: $buttonGray;
  }

  .bgButtonGray:hover {
    background-color: $hoverButtonGray;
    cursor: pointer;
  }

  .warningTxt {
    color: $errorText;
    font-size: 12px;
  }
  .warningTxtIcon {
    color: $errorText;
    font-size: 13px;
  }
  .inputStyle {
    width: 100%;
    font-size: 12px;
    color: $textMuted;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #a7acb1;
    border-radius: 4px;
    height: 40px;
    padding-right: 10px !important;
  }
  .p-inputtext.p-invalid.p-component {
    border-color: $errorBorder;
  }
}
</style>
