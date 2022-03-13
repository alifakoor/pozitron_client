<template>
  <div class="iconicInput p-mt-1" :class="InGrid">
    <span class="p-input-icon-left p-p-0 p-col-12">
      <i
        :class="[
          { bgButtonGray: buttonIcon == 'true' },
          { bgIconGray: buttonIcon == 'false' },
        ]"
        class="iconInput"
        :style="{
          borderColor: notValidData ? '#f44336' : '',
          height: InHeight,
        }"
        :innerHTML="iconClass"
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
      ><i
        :innerHTML="closeCircleLine"
        class="svgIcon warningTxtIcon iconInput iconInCorrect"
      ></i
      >{{ validationErr }}</small
    >
    <small class="inputInfo" :style="{ color: disabled ? '#D2D5D8' : '' }">{{
      inputText
    }}</small>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  emits: ["changeInputValue"],
  data() {
    return {
      notValidData: false,
      inputValue: null,
    };
  },
  props: {
    inputName: {
      type: String,
      default: "",
    },
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
  computed: {
    ...mapState("icovSVG", ["closeCircleLine"]),
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
      if (this.inputName != "") {
        this.$emit("changeInputValue", {
          name: this.inputName,
          inValue: this.inputValue,
        });
      } else {
        this.$emit("changeInputValue", this.inputValue);
      }
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
    right: 10%;
    transform: translateY(-15%);
    background-color: #fff;
    font-size: 12px;
    color: #7b84b2;
  }
  .iconInput {
    width: v-bind(InHeight);
    height: v-bind(InHeight);
    left: 0 !important;
    margin-top: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px 0px 0px 4px;
    border-right: none;
    transform: scale(0.9);
    font-size: 20px;
  }

  .iconInput:focus {
    background: #7b84b2;
  }
  .bgIconGray {
    background-color: $iconGray;
    color: #7b84b2;
  }
  .bgButtonGray {
    background-color: $buttonGray;
    color: #fff;
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
    font-size: 14px;
    color: $textMuted;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #bbc0d8;
    border-radius: 4px;
    height: 40px;
    padding-right: 10px !important;
  }

  .inputStyle::placeholder {
    color: #bbc0d8;
    font-size: 12px;
    font-family: "VazirFD";
  }

  .inputStyle:hover {
    border: 1px solid #bbc0d8;
  }

  .inputStyle:focus,
  .inputStyle:focus .iconInput {
    box-shadow: none;
    border: 2px solid #7b84b2;
  }
  .p-inputtext.p-invalid.p-component {
    border-color: $errorBorder;
  }
}
</style>
