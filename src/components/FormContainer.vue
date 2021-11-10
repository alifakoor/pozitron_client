<template>
  <div class="p-col-5 p-d-flex p-ai-center p-jc-center formContainer">
    <Toast position="top-right" class="send-code" />

    <div class="innerBox p-d-flex p-ai-start p-jc-start p-flex-column">
      <p class="title">ورود به پنل کاربری پوزیترون</p>

      <!-- enter phone number -->
      <form @submit.prevent="sendToken()" v-if="!sendCode || changeNumber">
        <p class="formTitle">لطفا شماره موبایل خود را وارد کنید.</p>
        <div class="inputContainer">
          <input
            type="text"
            class="loginInput"
            :placeholder="!notValidData ? 'شماره موبایل(ضروری)' : ''"
            v-model="userTel"
            @blur="validData()"
            :class="{ 'p-invalid': notValidData, 'p-valid': correctPhone }"
            maxlength="15"
            v-mask="['####  ###  ####']"
            @input="phoneIsCorrect()"
          />
          <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="correctPhone"
          ></i>
          <i
            class="ri-close-circle-line iconInput iconInCorrect"
            v-show="notValidData"
          ></i>
          <p class="errText" v-show="notValidData">
            لطفا شماره تلفن را به درستی وارد کنید.
          </p>
        </div>
        <button class="loginButton" :class="loading ? 'sendData' : ''">
          <i v-show="!loading" class="ri-checkbox-circle-line p-ml-1"></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
          <p>ورود به پوزیترون</p>
        </button>
        <p class="signUp p-mr-2">
          حساب کاربری ندارید؟
          <a class="linkSignUp p-mr-1" href="#"> ثبت نام کنید.</a>
        </p>
      </form>
      <!-- enter code  -->
      <form @submit.prevent="sendToken()" v-else>
        <p class="formTitle">
          کد ارسال شده به شماره {{ userTelOut }} را وارد کنید.
        </p>
        <div class="inputContainer p-d-flex p-jc-between p-flex-row-reverse">
          <input
            type="text"
            v-for="(key, i) in activationKeyFields"
            :key="i"
            :data-length="key.length"
            :data-index="i"
            :ref="
              (el) => {
                if (el) inputs[i] = el;
              }
            "
            v-model="key.value"
            @input="handleActivationInput($event)"
            class="codeTokenInput"
            :maxlength="key.length"
          />
        </div>
        <button class="loginButton" :class="loading ? 'sendData' : ''">
          <i v-show="!loading" class="pi pi-clock p-ml-1"></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
          <p>تایید و ادامه</p>
        </button>
        <p class="signUp p-mr-2">
          <a
            @click.prevent="
              () => {
                changeNumber = true;
                loadin = false;
              }
            "
            class="linkSignUp p-mr-1"
            href="#"
            >تغییر شماره موبایل</a
          >
          <i class="ri-arrow-left-line"></i>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, watchEffect } from "vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const toast = useToast();
    const inputs = ref([]);

    const userTel = ref("");
    const notValidData = ref(false);
    const correctPhone = ref(false);
    const loading = ref(false);
    const sendCode = ref(false);
    const changeNumber = ref(false);
    const activationKeyFields = ref([
      { length: 1, value: "" },
      { length: 1, value: "" },
      { length: 1, value: "" },
      { length: 1, value: "" },
    ]);

    const activationKey = computed(() => {
      let value = "";
      for (let field of activationKeyFields.value) {
        value += field.value;
      }
      return value;
    });

    const userTelOut = computed(() => {
      return userTel.value.replace(/\s/g, "");
    });

    function validData() {
      if (userTel.value === "") {
        notValidData.value = true;
      } else {
        notValidData.value = false;
      }
    }

    function phoneIsCorrect() {
      if (userTelOut.value.length == 11) {
        correctPhone.value = true;
        notValidData.value = false;
      } else {
        correctPhone.value = false;
      }
    }

    function sendToken() {
      if (userTelOut.value == "" || correctPhone.value == false) {
        notValidData.value = true;
      } else if (correctPhone.value) {
        notValidData.value = false;
        loading.value = true;
        setTimeout(() => {
          toast.add({
            severity: "success",
            summary: "کد تایید ارسال شد.",
            styleClass: "sendCodeMessage",
          });
          loading.value = false;
          sendCode.value = true;
          changeNumber.value = false;

          watchEffect(
            () => {
              inputs.value[0].focus();
            },
            {
              flush: "post",
            }
          );
        }, 3000);
      }
    }

    function handleActivationInput(e) {
      // Grab input's value
      let value = e.target.value;
      // Grab data-index value
      let index = parseInt(e.target.dataset.index);
      // Grab data-length value
      let maxlength = e.target.dataset.length;

      // Shift focus to next input field if max length reached
      if (value.length >= maxlength) {
        if (typeof activationKeyFields.value[index + 1] == "undefined") {
          watchEffect(
            () => {
              console.log("fcfdcfcfdc");
              inputs.value[index].blur();
            },
            {
              flush: "post",
            }
          );
          e.preventDefault();
          return;
        }
        watchEffect(
          () => {
            inputs.value[index + 1].focus();
          },
          {
            flush: "post",
          }
        );
        e.preventDefault();
      }
      // Shift focus to prev input field if input clear
      else if (value.length < maxlength) {
        if (typeof activationKeyFields.value[index - 1] == "undefined") {
          e.preventDefault();
          return;
        }
        watchEffect(
          () => {
            inputs.value[index - 1].focus();
          },
          {
            flush: "post",
          }
        );
        e.preventDefault();
      }
    }

    return {
      userTel,
      notValidData,
      validData,
      userTelOut,
      correctPhone,
      phoneIsCorrect,
      sendToken,
      loading,
      inputs,
      sendCode,
      activationKeyFields,
      handleActivationInput,
      activationKey,
      changeNumber,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.formContainer {
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 0 8px 8px 0;
  height: 80vh;
  .innerBox {
    width: 70%;
  }
  form {
    width: 100%;
  }
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 162%;
    display: flex;
    color: #000;
    align-items: center;
    text-align: right;
    margin-bottom: 56px;
  }
  .formTitle {
    color: $formTitle;
    font-size: 1rem;
    line-height: 150%;
    display: flex;
    align-items: center;
    text-align: right;
    margin-bottom: 16px;
  }
  .inputContainer {
    position: relative;
    height: fit-content;
    margin-bottom: 56px;
  }
  .iconInput {
    position: absolute;
    right: 0;
    top: 5px;
  }
  .iconInCorrect {
    color: $errText;
  }
  .iconCorrect {
    color: $iconCorrect;
  }
  .errText {
    color: $errText;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 130%;
    display: flex;
    align-items: center;
    text-align: right;
  }
  .loginInput {
    border: none;
    border-bottom: 1px solid $loginBorder;
    width: 100%;
    text-align: left;
    direction: ltr;
  }
  .p-invalid {
    border: none;
    border-bottom: 1px solid $invalidLogIn;
  }
  .p-valid {
    border: none;
    border-bottom: 1px solid $validInput !important;
    caret-color: $validInput !important;
  }
  .loginInput::placeholder {
    font-size: 1rem;
    line-height: 150%;
    color: $placeholderColor;
  }
  .loginInput:focus {
    border: 0;
    border-bottom: 1px solid $focusInputLog;
    caret-color: $focusInputLog;
    outline: 0;
    box-shadow: 0;
  }
  .sendData {
    background: $sendDataButtonBg !important;
  }

  .loginButton {
    cursor: pointer;
    width: 100%;
    border: none;
    height: 56px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background: $blueButtonBg;
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
    //inner text
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 1.1rem;
      line-height: 162%;
      text-align: right;
    }
    i {
      font-size: 1.1rem;
    }
  }
  .codeTokenInput {
    direction: ltr;
    border: 0;
    border-bottom: 1px solid $loginBorder;
    width: 4em;
    text-align: center;
    caret-color: $focusInputLog;
  }
  .codeTokenInput:focus {
    outline: 0;
    border: 0;
    border-bottom: 1px solid $loginBorder;
  }

  .signUp {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 168%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000;
    i {
      color: $backArrow;
      font-size: 18px;
    }
  }

  .linkSignUp {
    text-decoration-line: underline;
    color: $blueLink;
    text-underline-offset: 3px;
  }
}

::v-deep(.send-code.p-toast) {
  // .p-toast-message {
  //   background: #c8e6c9;
  //   border: solid #439446;
  //   border-width: 0 6px 0 0;
  //   color: #224a23;
  // }
  .sendCodeMessage {
    font-size: 40px;
    background: blue !important;
  }
}

// .p-toast .p-toast-message.p-toast-message-success {
//   background: #c8e6c9;
//   border: solid #439446;
//   border-width: 0 6px 0 0;
//   color: #224a23;
// }
</style>
