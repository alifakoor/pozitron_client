<template>
  <div class="p-d-flex p-ai-center p-jc-start formContainer p-flex-column">
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
          <i
            v-show="!loading && timerCounter > 0"
            class="ri-checkbox-circle-line p-ml-1"
          ></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
          <p>ورود به پوزیترون</p>
        </button>
      </form>
    </div>

    <!-- enter code of login -->
    <div
      class="innerBox p-d-flex p-ai-start p-jc-start p-flex-column"
      v-else-if="userExist"
    >
      <p class="title">ورود به پنل کاربری پوزیترون</p>
      <form
        @submit.prevent="timerCounter > 0 ? checkKey() : sendToken()"
        class="p-mt-5"
      >
        <p class="formTitle p-mb-5">
          کد ارسال شده به شماره {{ userTelOut }} را وارد کنید.
        </p>
        <div class="middleBox">
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
              @keydown="clearInput($event)"
              class="codeTokenInput"
              :maxlength="key.length"
            />
          </div>
          <p class="errText" v-show="wrongKey">
            لطفا کد تایید را صحیح وارد کنید.
          </p>
        </div>
        <p class="counter">
          0{{ Math.trunc(timerCounter / 60) }}:{{
            Math.ceil((timerCounter % (60 * 60)) % 60) > 9
              ? Math.ceil((timerCounter % (60 * 60)) % 60)
              : "0" + Math.ceil((timerCounter % (60 * 60)) % 60)
          }}
        </p>
        <button class="loginButton" :class="loading ? 'sendData' : ''">
          <i v-show="!loading" class="pi pi-clock p-ml-1"></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
          <p v-show="timerCounter > 0">تایید و ادامه</p>
          <p v-show="timerCounter == 0">ارسال مجدد کد</p>
        </button>
        <p class="signUp p-mr-2">
          <a
            @click.prevent="
              () => {
                changeNumber = true;
                loading = false;
                timerCounter = 180;
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
    <Register
      v-else
      :userTelOut="userTelOut"
      @changingNumber="changingNumber"
      @sendCode="sendToken"
    ></Register>
  </div>
</template>

<script>
import { ref, computed, defineComponent, watchEffect, watch } from "vue";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Register from "./TheRegister.vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const { cookies } = useCookies();
    // userToken
    const userToken = ref(null);
    // timerCounte
    const timerCounter = ref(180);

    const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    const inputs = ref([]);
    const userTel = ref("");
    const notValidData = ref(false);
    const correctPhone = ref(false);
    const loading = ref(false);
    const sendCode = ref(false);
    const changeNumber = ref(false);
    const userExist = ref(false);
    const wrongKey = ref(false);
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
    //function from vuex store
    function changeUserToken(token) {
      store.commit("changeUserToken", token);
    }
    //functions
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
    async function sendToken() {
      if (userTelOut.value == "" || correctPhone.value == false) {
        notValidData.value = true;
      } else if (correctPhone.value) {
        notValidData.value = false;
        loading.value = true;
        if (timerCounter.value == 0) {
          timerCounter.value = 180;
        }

        await axios
          .post("https://api-dev.pozitronet.ir/auth", {
            phone: userTelOut.value,
          })
          .then((response) => {
            if (response.data.success) {
              userExist.value =
                response.data.data.existed && response.data.data.hasBusiness;
            }
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
              // closeButtonColor: "#065143",
            });
            loading.value = false;
            sendCode.value = true;
            changeNumber.value = false;
          })
          .catch((err) => {
            console.log(err);
            loading.value = false;
          });
      }
    }

    watch(userExist, () => {
      if (userExist.value) {
        let interval = setInterval(() => {
          if (timerCounter.value > 0) {
            timerCounter.value -= 1;
          }
        }, 1000);
        watchEffect(
          () => {
            inputs.value[0].focus();
          },
          {
            flush: "post",
          }
        );
      }
    });

    function checkKey() {
      if (activationKey.value != "" && timerCounter.value > 0) {
        loading.value = true;
        axios
          .post("https://api-dev.pozitronet.ir/auth/verify", {
            phone: userTelOut.value,
            code: parseInt(activationKey.value),
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200 && response.data.success) {
              userToken.value = response.data.data.token;
              loading.value = false;
              wrongKey.value = false;
              cookies.set("uToken", userToken.value, "1d");
              cookies.set("uzit", response.data.data.id, "1d");
              router.push({
                name: "panel",
                params: { userId: response.data.data.id },
              });
            }
          })
          .catch((err) => {
            console.log(err);
            wrongKey.value = true;
            loading.value = false;
          });
      } else {
        wrongKey.value = true;
      }
    }

    function clearInput(e) {
      let index = parseInt(e.target.dataset.index);
      if (e.code == "Backspace" && e.target.value.length == 0) {
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
          checkKey();
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

    function changingNumber() {
      changeNumber.value = true;
      sendCode.value = false;
    }

    return {
      cookies,
      userToken,
      userTel,
      notValidData,
      validData,
      userTelOut,
      correctPhone,
      timerCounter,
      phoneIsCorrect,
      sendToken,
      loading,
      inputs,
      sendCode,
      activationKeyFields,
      handleActivationInput,
      clearInput,
      changingNumber,
      checkKey,
      wrongKey,
      activationKey,
      changeNumber,
      userExist,
    };
  },
  beforeUnmount() {
    // this.cookies.set("myCoooookie", this.userToken);
    // console.log(this.cookies.get("myCoooookie"));
  },
  components: { Register },
});
</script>

<style lang="scss">
@import "../../assets/styles/variablesOfLogin";
@media (max-width: 1010px) {
  .formContainer {
    border-radius: 0px 0px 32px 32px;
    width: 90%;
    order: 1;
  }

  .blueSideBar {
    border-radius: 32px 32px 0px 0px;
    width: 90%;
    order: 0;
  }
}

@media (min-width: 1010px) {
  .formContainer {
    border-radius: 0px 32px 32px 0px;
    width: 504px !important;
    order: 0;
  }

  .blueSideBar {
    background: $sideBarBackground;
    border-radius: 32px 0px 0px 32px;
    min-height: 348px;
    width: 504px !important;
    order: 1;
  }
}

.formContainer {
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);

  height: 648px;
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
    // left: 88px;
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
    margin: 8px 0px;
    // height: 78px;
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
  top: -15px;
  right: 5px;
  font-size: 12px;
}

.floating-label {
  position: absolute;
  pointer-events: none;
  right: 0;
  top: 0;
  transition: 0.2s ease all;
}
</style>
