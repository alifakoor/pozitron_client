<template>
  <div class="iconicDatePicker p-mt-1" :class="InGrid">
    <span class="p-input-icon-left p-p-0 p-col-12">
      <i
        class="iconInput"
        :style="{
          borderColor: notValidData ? '#f44336' : '',
          height: InHeight,
        }"
      >
        <svg
          width="20"
          height="22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.793 0a.75.75 0 0 1 .75.75l.001.848c1.46.1 2.673.6 3.531 1.46.937.941 1.43 2.294 1.425 3.917v9.123c0 3.332-2.116 5.402-5.521 5.402H5.521C2.116 21.5 0 19.401 0 16.022V6.973c0-3.143 1.887-5.16 4.965-5.375V.75a.75.75 0 0 1 1.5 0v.829h6.578V.75a.75.75 0 0 1 .75-.75ZM18 8.904H1.5v7.118C1.5 18.588 2.928 20 5.521 20h8.458C16.572 20 18 18.614 18 16.098V8.904Zm-3.799 6.292a.75.75 0 0 1 0 1.5.754.754 0 0 1-.754-.75c0-.414.331-.75.745-.75h.01Zm-4.437 0a.75.75 0 0 1 0 1.5.754.754 0 0 1-.754-.75c0-.414.33-.75.745-.75h.009Zm-4.447 0a.75.75 0 0 1 0 1.5.755.755 0 0 1-.755-.75c0-.414.332-.75.746-.75h.009ZM14.2 11.31a.75.75 0 0 1 0 1.5.754.754 0 0 1-.754-.75c0-.414.331-.75.745-.75h.01Zm-4.437 0a.75.75 0 0 1 0 1.5.754.754 0 0 1-.754-.75c0-.414.33-.75.745-.75h.009Zm-4.447 0a.75.75 0 0 1 0 1.5.755.755 0 0 1-.755-.75c0-.414.332-.75.746-.75h.009Zm7.726-8.231H6.465v.962a.75.75 0 0 1-1.5 0v-.94C2.725 3.29 1.5 4.649 1.5 6.974v.431H18v-.43c.004-1.236-.328-2.196-.987-2.856-.579-.58-1.424-.927-2.469-1.016v.939a.75.75 0 0 1-1.5 0l-.001-.962Z"
            fill="#7B84B2"
          />
        </svg>
      </i>
      <input
        type="text"
        :placeholder="InPlaceholder"
        class="inputStyle custom-input"
        :style="{
          height: InHeight,
        }"
        :disabled="disabled"
        @blur="isDataNull()"
        @click="() => (notValidData = false)"
        :class="{ 'p-invalid': notValidData }"
      />
      <date-picker
        v-model="date"
        format="YYYY-MM-DD"
        display-format="jYYYY-jMM-jDD"
        custom-input=".custom-input"
        popover="bottom-left"
        auto-submit
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
      date: "",
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

<style lang="scss">
@import "../../../assets/styles/variablesOfTable";
.vpd-header {
  display: none;
}

.vpd-body .vpd-controls {
  border-bottom: 0.8px solid #dcdeea;
  margin-bottom: 10px;
}
.vpd-wrapper .vpd-container {
  margin: 0 0 20px 0;
  transform: translate(-48%, -15px) !important;
}
.vpd-container .vpd-content {
  background: #ffffff;
  box-shadow: 0px 0px 9.56px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
}
.vpd-day-effect {
  background-color: transparent !important;
}
.vpd-day .vpd-day-text {
  color: #363d5d;
}
.vpd-day:not(.vpd-selected):hover .vpd-day-effect {
  background-color: #bbc0d8 !important;
}
.vpd-body .vpd-selected .vpd-day-effect {
  background-color: #048ba8 !important;
}

.vpd-day:not([disabled="true"]).vpd-selected .vpd-day-text {
  color: #fff;
}

.vpd-day:not([disabled="true"]):hover .vpd-day-text {
  color: #fff;
}

.vpd-weekday {
  color: #8c9196;
}
.vpd-month-label > span {
  color: #363d5d !important;
}

.vpd-clearfix .vpd-day:last-child > .vpd-day-text {
  color: #b41c10;
}

.custom-input:focus {
  outline: 0;
  border: 0;
}
.iconicDatePicker {
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
