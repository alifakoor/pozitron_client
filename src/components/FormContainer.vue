<template>
  <div
    class="p-col-5 p-d-flex p-ai-center p-jc-start formContainer p-flex-column"
  >
    <!-- enter phone number -->
    <div
      class="innerBox p-d-flex p-ai-center p-jc-start p-flex-column"
      v-if="!sendCode || changeNumber"
    >
      <p class="title">ثبت‌نام / ورود به پنل کاربری پوزیترون</p>
      <form @submit.prevent="sendToken()">
        <div class="middleBox">
          <p class="formTitle">لطفا شماره موبایل خود را وارد کنید.</p>
          <div class="inputContainer">
            <input
              type="text"
              class="loginInput inputText"
              v-model="userTel"
              @blur="validData()"
              :class="{ 'p-invalid': notValidData, 'p-valid': correctPhone }"
              maxlength="15"
              v-mask="['####  ###  ####']"
              @input="phoneIsCorrect()"
            />
            <span class="floating-label">شماره موبایل(ضروری)</span>
            <i
              class="ri-checkbox-circle-line iconInput iconCorrect"
              v-show="correctPhone"
            ></i>
            <!-- <i
            class="ri-close-circle-line iconInput iconInCorrect"
            v-show="notValidData"
          ></i> -->
            <p class="errText" v-show="notValidData">
              لطفا شماره تلفن را به درستی وارد کنید.
            </p>
          </div>
        </div>
        <button class="loginButton" :class="loading ? 'sendData' : ''">
          <i v-show="!loading" class="ri-checkbox-circle-line p-ml-1"></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
          <p>ورود به پوزیترون</p>
        </button>
      </form>
    </div>

    <!-- enter code of login -->
    <div
      class="innerBox p-d-flex p-ai-start p-jc-start p-flex-column"
      v-else-if="phoneIsExist"
    >
      <p class="title">ثبت‌نام / ورود به پنل کاربری پوزیترون</p>
      <form @submit.prevent="sendToken()">
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

    <!-- enter sign up information -->
    <Register v-else :userTelOut="userTelOut"></Register>
  </div>
</template>

<script>
import { ref, computed, defineComponent, watchEffect } from "vue";
import Register from "./Register.vue";

export default defineComponent({
  setup() {
    const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    const inputs = ref([]);
    const userTel = ref("");
    const notValidData = ref(false);
    const correctPhone = ref(false);
    const loading = ref(false);
    const sendCode = ref(false);
    const changeNumber = ref(false);
    const phoneIsExist = ref(false);
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
      if (userTel.value === "" || !regex.test(userTelOut.value)) {
        notValidData.value = true;
      } else {
        notValidData.value = false;
      }
    }
    function phoneIsCorrect() {
      if (userTelOut.value.length == 11 && regex.test(userTelOut.value)) {
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
          Swal.fire({
            icon: "success",
            title: "کد تایید ارسال شد",
            toast: true,
            position: "top-right",
            iconColor: "#065143",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            showCloseButton: true,
            closeButtonColor: "#065143",
          });
          loading.value = false;
          sendCode.value = true;
          changeNumber.value = false;
          if (inputs.value.length > 0) {
            watchEffect(
              () => {
                inputs.value[0].focus();
              },
              {
                flush: "post",
              }
            );
          }
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
      phoneIsExist,
    };
  },
  components: { Register },
});
</script>

<style lang="scss">
@import "../assets/styles/variables";
.formContainer {
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 0px 32px 32px 0px;
  min-height: 648px;
  min-width: 504px;
  position: relative;
  .innerBox {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 328px;
    min-height: 354px;
    position: absolute;
    left: 88px;
    top: 80px;
  }
  form {
    width: 100%;
  }
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 162%;
    display: flex;
    color: $Green;
    align-items: center;
    text-align: right;
    margin-bottom: 56px;
  }
  .formTitle {
    color: $formTitle;
    font-size: 0.9rem;
    line-height: 150%;
    align-items: center;
    text-align: right;
    margin-bottom: 16px;
  }
  .inputContainer {
    position: relative;
    margin: 16px 0px;
    height: 78px;
  }
  .middleBox {
    margin: 72px 0px;
    min-width: 328px;
    min-height: 122px;
    display: flex;
    flex-direction: column;
    justify-content: start;
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
    margin: 4px 0px;
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
    margin: 8px 0;

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
    height: fit-content;
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

.colored-toast.swal2-icon-success {
  width: 227px !important;
  height: 48px;
  background: #c5dacf !important;
  border-radius: 8px;
  border-right: 7px solid #558b6e;
  align-items: center !important;
  justify-content: right;
  display: flex !important;
  padding: 20px 10px;
  // padding-top: 0 !important;

  .swal2-title {
    font-size: 16px;
    color: #065143;
    margin: 0.5em 0 0.5em 1em;
  }

  .swal2-success-ring,
  .swal2-success-fix {
    visibility: hidden !important;
    background: #558b6e;
  }

  .swal2-icon-show {
    margin: -5px 0 0 0 !important;
  }

  .swal2-close {
    position: absolute;
    left: 0;
    color: #065143;
    margin-top: -5px;
  }
}
input:focus ~ .floating-label,
.p-valid ~ .floating-label {
  top: -15px;
  right: 5px;
  font-size: 12px;
  opacity: 1;
}

.p-invalid ~ .floating-label {
  right: 5px;
}

.floating-label {
  position: absolute;
  pointer-events: none;
  right: 0;
  top: 0;
  transition: 0.2s ease all;
}
</style>
