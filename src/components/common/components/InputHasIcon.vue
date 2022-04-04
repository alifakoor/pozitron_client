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
        class="svgIcon warningTxtIcon iconInCorrect"
      ></i>
      {{ validationErr }}</small
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
    ...mapState("iconSVG", ["closeCircleLine"]),
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
  mounted() {
    if (this.InPlaceholder == "درصد") {
      document.querySelector(".inputStyle[max='100']").oninput = function () {
        var max = parseInt(this.max);

        if (parseInt(this.value) > max) {
          this.value = this.value.slice(0, 2);
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(
              ".warningTxt"
            ).innerHTML = `<p style="color:#891A29" class="p-d-flex p-ai-center"><i style="display:flex;margin-left:4px" ><svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.999.333A6.674 6.674 0 0 1 13.665 7 6.674 6.674 0 0 1 7 13.666 6.674 6.674 0 0 1 .332 7 6.674 6.674 0 0 1 6.999.333Zm0 1A5.673 5.673 0 0 0 1.332 7a5.673 5.673 0 0 0 5.667 5.666A5.673 5.673 0 0 0 12.665 7 5.673 5.673 0 0 0 7 1.333ZM7 8.863a.666.666 0 1 1 0 1.334.669.669 0 0 1-.67-.667c0-.368.296-.666.664-.666H7ZM6.995 3.97a.5.5 0 0 1 .5.5v2.946a.5.5 0 0 1-1 0V4.469a.5.5 0 0 1 .5-.5Z" fill="#891A29"/></svg></i>عدد باید بین 0 تا 100 باشد.</p>`;
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(".warningTxt")
            .classList.add("p-d-flex");
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(".warningTxt")
            .classList.remove("p-d-none");
        } else {
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(
              ".warningTxt"
            ).innerHTML = "";
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(".warningTxt")
            .classList.remove("p-d-flex");
          document
            .querySelector(".inputStyle[max='100']")
            .parentElement.parentElement.querySelector(".warningTxt")
            .classList.add("p-d-none");
        }
      };
    }
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
    font-size: 0.75rem;
    font-weight: 500;
    color: #49527e;
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
    direction: rtl;
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
    font-size: 0.875rem;
    font-weight: Regular;
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
