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
              class="iconInput iconCorrect svgIcon"
              :innerHTML="iconSVGs.checkCircleLine"
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
        <button
          id="getPhoneBut"
          class="loginButton"
          :class="loading ? 'sendData' : ''"
        >
          <i
            v-show="!loading && timerCounter > 0"
            class="svgIcon"
            v-bind:innerHTML="iconSVGs.checkCircleLine"
          ></i>
          <i
            v-show="loading"
            class="svgIcon"
            v-bind:innerHTML="iconSVGs.loadingCircle"
          ></i>
          <p>ورود به پوزیترون</p>
        </button>
      </form>
    </div>

    <!-- enter code of login -->
    <Login
      v-else-if="userExist"
      :userTelOut="userTelOut"
      @changingNumber="changingNumber"
      @sendCode="sendToken"
    ></Login>

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
import Login from "./TheLogin.vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const { cookies } = useCookies();
    const iconSVGs = store.state.iconSVG;
    // userToken
    const userToken = ref(null);

    //timerCounter
    const timerCounter = ref(180);

    const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    const userTel = ref("");
    const notValidData = ref(false);
    const correctPhone = ref(false);
    const loading = ref(false);
    const sendCode = ref(false);
    const changeNumber = ref(false);
    const userExist = ref(false);
    const userTelOut = computed(() => {
      return userTel.value.replace(/\s/g, "");
    });
    //check cookie
    if (cookies.get("keepU") === "rrrr") {
      sendCode.value = true;
      userExist.value = false;
    } else if (cookies.get("keepU") === "llll") {
      sendCode.value = true;
      userExist.value = true;
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
          .post(`${store.state.apiURL}/auth`, {
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
              timerProgressBar: true,
              showCloseButton: true,
              timer: 5000,
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

    function changingNumber() {
      changeNumber.value = true;
      sendCode.value = false;
    }

    return {
      iconSVGs,
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
      sendCode,
      changingNumber,
      changeNumber,
      userExist,
    };
  },
  components: { Register, Login },
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
  direction: rtl;

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
    left: 5px;
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
