<template>
  <div class="iconicInput p-mt-1" :class="InGrid">
    <span class="p-input-icon-left p-p-0 p-col-12">
      <Textarea
        v-if="inType == 'textarea'"
        class="inputStyle"
        :style="{ height: InHeight }"
        v-model="inputValue"
      ></Textarea>
      <InputText
        v-else
        id="explain"
        v-model="inputValue"
        :type="inType"
        class="inputStyle"
        :placeholder="InPlaceholder"
        :style="{
          height: InHeight,
          direction: inType == 'number' ? 'ltr' : 'rtl',
          textAlign: 'right',
          paddingLeft: inType == 'number' ? '10px' : '',
        }"
        :disabled="disabled"
        :min="inType == 'number' ? 0 : ''"
        @blur="isValidData()"
        @click="() => (notValidData = false)"
        :class="{ 'p-invalid': notValidData || sameInventory }"
        aria-describedby="onlinePrice-help"
      />
      <small
        id="onlinePrice-help"
        class="warningTxt p-ai-center"
        :class="{
          'p-d-flex': notValidData || sameInventory,
          'p-d-none': !notValidData || !sameInventory,
        }"
        ><i class="ri-error-warning-line p-ml-1 warningTxtIcon"></i
        >{{ validationErr }}</small
      >
      <small
        class="explaination"
        v-if="explaination === 'true' && inputValue"
        for="explain"
        style="text-align: right"
        >{{ changeNumToPersian(inputValue) }} تومان‌‌‌‌
      </small>
    </span>
    <small class="inputInfo" :style="{ color: disabled ? '#D2D5D8' : '' }">{{
      inputText
    }}</small>
  </div>
</template>

<script>
import Num2persian from "num2persian";
export default {
  data() {
    return {
      inputValue: null,
      notValidData: false,
      inputOff: null,
    };
  },
  emits: ["InvertoryUpdate", "changeInputValue"],
  props: {
    inputName: {
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
    explaination: {
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
    sameInventory: {
      required: false,
    },
  },
  methods: {
    changeNumToPersian(num) {
      return Num2persian(num);
    },
    isValidData() {
      if (this.$props.validation == "true") {
        if (this.inputValue === "" || this.inputValue === null) {
          this.notValidData = true;
        } else {
          this.notValidData = false;
          this.$emit("InvertoryUpdate", parseInt(this.inputValue));
        }
      } else {
        this.$emit("InvertoryUpdate", parseInt(this.inputValue));
      }
    },
    // addComma(newValue, oldValue) {
    //   let nf = new Intl.NumberFormat("en-US");
    //   if (this.explaination == "true" && newValue != "") {
    //     // console.log(this.inputValue);
    //     let newInput = nf.format(parseInt(this.inputValue));
    //     // console.log(newInput.charAt(newInput.length - 2));
    //     this.inputOff = newInput;
    //     console.log(this.inputOff);
    //   }
    // },
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
  position: relative;
  margin: 0;
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
  .iconInput {
    width: 32px;
    height: 32px;
    left: 0 !important;
    margin-top: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $iconGray;
    border-radius: 4px 0px 0px 4px;
    border-right: none;
    transform: scale(0.9);
  }
  .warningTxt {
    color: $errorText;
    font-size: 12px;
    width: 14em;
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
  }

  .inputStyle:hover {
    border: 1px solid #bbc0d8;
  }

  .inputStyle:focus {
    box-shadow: none;
    border: 2px solid #7b84b2;
  }

  .explaination {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    overflow-wrap: break-word;
    color: #7b84b2;
  }
}
</style>
