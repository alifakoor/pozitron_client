<template>
  <!-- form steps -->
  <div class="stepsContainer p-d-flex">
    <div class="stepContainer p-d-flex">
      <div class="step">
        <div class="stepCircle" :class="stepClass[0]">
          <i v-if="step >= 1" class="ri-check-line"></i>
          <span v-else>1</span>
        </div>
      </div>
      <small :class="step >= 0 ? 'smallText' : null">تایید شماره موبایل</small>
    </div>
    <div class="stepLine stepLine1" :class="stepClass[0]"></div>
    <div class="stepContainer p-d-flex">
      <div class="step">
        <div
          class="stepCircle"
          :class="stepClass[1]"
          @click="stepBack(1)"
          style="cursor: pointer"
        >
          <i v-if="step >= 2" class="ri-check-line"></i>
          <span v-else>2</span>
        </div>
      </div>
      <small :class="step >= 1 ? 'smallText' : null">ساخت دامنه</small>
    </div>
    <div class="stepLine stepLine2" :class="stepClass[1]"></div>
    <div class="stepContainer p-d-flex">
      <div class="step">
        <div
          class="stepCircle"
          :class="stepClass[2]"
          @click="stepBack(2)"
          style="cursor: pointer"
        >
          <i v-if="step == 3" class="ri-check-line"></i>
          <span v-else>3</span>
        </div>
      </div>
      <small :class="step >= 2 ? 'smallText' : null"
        >اتصال سایت به پوزیترون</small
      >
    </div>
  </div>
  <!-- <div class="container-fluid">
    <br /><br />
    <ul class="list-unstyled multi-steps">
      <li>Start</li>
      <li>First Step</li>
      <li class="is-active">Middle Stage</li>
      <li>Finish</li>
    </ul>
  </div> -->
  <div
    v-if="step == 0"
    class="innerBox innerBox1 p-d-flex p-ai-start p-jc-start p-flex-column"
  >
    <!-- step 1 form -->
    <form>
      <div class="middleBox">
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
      <button
        @click.prevent="timerCounter > 0 ? changeStep() : sendCode()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="!loading" class="pi pi-clock p-ml-1"></i>
        <i
          v-show="loading && timerCounter > 0"
          class="pi pi-spin pi-spinner p-m-1"
        ></i>
        <p v-show="timerCounter > 0">تایید و ادامه</p>
        <p v-show="timerCounter == 0">ارسال مجدد کد</p>
      </button>
      <p class="signUp p-mr-2">
        <a
          @click.prevent="$emit('changingNumber')"
          class="linkSignUp p-mr-1"
          href="#"
          >تغییر شماره موبایل</a
        >
        <i class="ri-arrow-left-line"></i>
      </p>
    </form>
  </div>
  <!-- step 2 form -->
  <div
    v-else-if="step == 1"
    class="innerBox innerBox2 p-d-flex p-ai-start p-jc-start p-flex-column"
  >
    <form>
      <div class="middleBox">
        <p class="formTitle">آدرس سایت فروشگاه ووکامرسی خود را وارد کنید.</p>
        <!-- site url input -->
        <div class="inputContainer">
          <input
            name="siteUrl"
            type="text"
            class="loginInput"
            @blur="validURL($event)"
            v-model="siteUrl"
            :class="{ 'p-invalid': notValidSiteURL, 'p-valid': correctSiteURL }"
            @input="correctURL($event)"
          />
          <span class="floating-label">آدرس سایت فروشگاه(ضروری)</span>
          <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="correctSiteURL"
          ></i>
          <p class="errText" v-show="notValidSiteURL">
            لطفا آدرس فروشگاه را به درستی وارد کنید.
          </p>
          <p class="errText" v-show="urlExist">
            این آدرس فروشگاه قبلا ثبت شده‌است.
          </p>
        </div>
      </div>
      <!-- pozitron url input -->
      <!-- <div class="middleBox1">
        <div class="inputContainer" v-show="correctSiteURL">
          <input
            name="pozUrl"
            type="text"
            class="loginInput"
            @blur="validURL($event)"
            v-model="pozitronUrl"
            :class="{ 'p-invalid': notValidPozURL, 'p-valid': correctPozURL }"
            @input="correctURL($event)"
          />
          <span class="floating-label">آدرس پوزیترون(ضروری)</span>
          <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="correctPozURL"
          ></i>

          <p class="errText" v-show="notValidPozURL">
            لطفا آدرس فروشگاه را به درستی وارد کنید.
          </p>
        </div>
      </div> -->
      <button
        @click.prevent="changeStep()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="!loading" class="ri-checkbox-circle-line p-ml-1"></i>
        <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
        <p>تایید و ادامه</p>
      </button>
    </form>
  </div>
  <!-- step 3 form -->
  <div
    v-else-if="step == 2"
    class="innerBox innerBox3 p-d-flex p-ai-start p-jc-start p-flex-column"
  >
    <form>
      <div class="middleBox">
        <p class="formTitle">
          برای ساخت کلید وارد
          <a
            :href="
              'https://' +
              siteUrl
                .replace('https://', '')
                .replace('http://', '')
                .replace('www.', '') +
              '/wp-login.php?redirect_to=https%3A%2F%2F' +
              siteUrl
                .replace('https://', '')
                .replace('http://', '')
                .replace('www.', '') +
              '/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys&create-key=1'
            "
            target="_blank"
          >
            پیکربندی پنل سایت ووکامرس </a
          >خود شوید.<i class="pi pi-question-circle" @click="modalHandle()"></i>
        </p>
        <div class="inputContainer inputHeight">
          <input
            type="text"
            class="loginInput"
            v-model="useKey"
            :class="{
              'p-invalid': notValidKey === true,
              'p-valid': notValidKey === false,
            }"
            name="useKey"
            @blur="validKey($event)"
          />
          <span class="floating-label">کلید مصرف‌کننده از سایت ووکامرس</span>
          <!-- <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="notValidKey === false"
          ></i> -->
          <i
            class="ri-close-circle-line iconInput iconInCorrect"
            v-show="notValidKey === true"
          ></i>

          <p class="errText" v-show="notValidKey === true">
            لطفا کلید را به درستی وارد کنید.
          </p>
        </div>
        <div class="inputContainer inputHeight">
          <input
            type="text"
            class="loginInput"
            v-model="passKey"
            :class="{
              'p-invalid': notValidPass === true,
              'p-valid': notValidPass === false,
            }"
            name="passKey"
            @blur="validKey($event)"
          />
          <span class="floating-label">رمز مصرف‌کننده از سایت ووکامرس</span>
          <!-- <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="notValidPass === false"
          ></i> -->
          <i
            class="ri-close-circle-line iconInput iconInCorrect"
            v-show="notValidPass === true"
          ></i>
          <p class="errText" v-show="notValidPass === true">
            لطفا رمز را به درستی وارد کنید.
          </p>
        </div>
      </div>
      <div
        class="progressLoading p-d-flex p-flex-column"
        v-if="showProductLoading"
      >
        <p v-if="myColor == '#558b6e'">
          این فرآیند کمی زمانبر است.لطفا صبر کنید.
        </p>
        <p v-else style="color: #e61f10">
          متاسفانه فرآیند بارگزاری محصولات،کامل انجام نشد.لطفا مجددا تلاش کنید.
        </p>
        <ProgressBar :value="progressValue" style="direction: ltr">
          {{ progressValue + "%" }}
        </ProgressBar>
      </div>
      <button
        v-if="myColor == '#558b6e'"
        @click.prevent="changeStep()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="!loading" class="ri-checkbox-circle-line p-ml-1"></i>
        <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
        <p>اتصال به پوزیترون</p>
      </button>
      <button
        v-else
        @click.prevent="createConnection()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
        <p>تلاش مجدد</p>
      </button>
    </form>
  </div>

  <!-- guid modal box -->
  <GuidModal
    v-show="modalShow"
    :modalShow="modalShow"
    @modalHandle="modalHandle"
  ></GuidModal>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import GuidModal from "./TheGuidModal.vue";
import axios from "axios";

export default {
  emits: ["changingNumber", "sendCode"],
  props: {
    userTelOut: {
      require: true,
      type: String,
    },
  },
  setup(props, context) {
    const myColor = ref("#558b6e");
    const progressLabelColor = ref("#495057");
    const router = useRouter();
    const store = useStore();
    const { cookies } = useCookies();
    // userToken
    const userToken = ref(null);

    // timerCounte
    const timerCounter = ref(180);
    // ------------------variables-----------------------
    const urlRegex = new RegExp(
      "(?:www.|(?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
    );
    const loading = ref(false);

    // form 1 variables
    const wrongKey = ref(false);
    // form 2 variables
    const siteUrl = ref("");
    const notValidSiteURL = ref(false);
    const correctSiteURL = ref(false);
    const pozitronUrl = ref("");
    const notValidPozURL = ref(false);
    const correctPozURL = ref(false);
    //form 3 variables
    const notValidPass = ref(null);
    const notValidKey = ref(null);
    const urlExist = ref(null);
    const modalShow = ref(false);
    const useKey = ref("");
    const passKey = ref("");
    const showProductLoading = ref(false);
    const step = ref(0);

    const mySteps = ref(["Step 1", "Step 2", "Step 3"]);
    const stepClass = computed(() => {
      let classArr = [];
      switch (step.value) {
        case 0:
          {
            classArr = ["nextStep", "notActiveStep", "notActiveStep"];
          }
          break;
        case 1:
          {
            classArr = ["fullStep", "nextStep", "notActiveStep"];
          }
          break;
        case 2:
          {
            classArr = ["fullStep", "fullStep", "nextStep"];
          }
          break;
        case 3:
          {
            classArr = ["fullStep", "fullStep", "fullStep"];
          }
          break;
      }
      return classArr;
    });
    const inputs = ref([]);
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

    watchEffect(
      () => {
        inputs.value[0].focus();
      },
      {
        flush: "post",
      }
    );

    let interval = setInterval(() => {
      if (timerCounter.value > 0) {
        timerCounter.value -= 1;
      }
    }, 1000);
    // ----------------------functions-------------------------
    function createConnection() {
      progressValue.value = 0;
      myColor.value = "#558b6e";
      progressLabelColor.value = "#495057";
      startProgress(100);
      axios
        .post(
          `${store.state.apiURL}/business/create`,
          {
            domain: siteUrl.value,
            key: useKey.value,
            secret: passKey.value,
          },
          { headers: { "zi-access-token": userToken.value } }
        )
        .then((response) => {
          if (response.status == 200 && response.data.success) {
            endProgress();
          } else {
            myColor.value = "#E61F10";
            loading.value = false;
            progressLabelColor.value = "#E61F10";
            endProgress();
          }
        })
        .catch((err) => {
          myColor.value = "#E61F10";
          progressLabelColor.value = "#E61F10";
          loading.value = false;
          endProgress();
        });
    }
    function changeStep() {
      switch (step.value) {
        case 0:
          {
            if (activationKey.value != "" && timerCounter.value > 0) {
              loading.value = true;
              axios
                .post(`${store.state.apiURL}/auth/verify`, {
                  phone: props.userTelOut,
                  code: parseInt(activationKey.value),
                })
                .then((response) => {
                  if (response.status == 200 && response.data.success) {
                    userToken.value = response.data.data.token;
                    cookies.set("uzit", response.data.data.id, "1d");
                    step.value += 1;
                    clearInterval(interval);
                    loading.value = false;
                    wrongKey.value = false;
                  } else {
                    activationKeyFields.value.forEach((input) => {
                      input.value = "";
                    });
                    inputs.value[0].focus();
                    loading.value = false;
                    wrongKey.value = true;
                  }
                })
                .catch((err) => {
                  loading.value = false;
                  wrongKey.value = true;
                  activationKeyFields.value.forEach((input) => {
                    input.value = "";
                  });
                  inputs.value[0].focus();
                });
            } else {
              wrongKey.value = true;
            }
          }
          break;
        case 1:
          {
            if (correctSiteURL.value) {
              loading.value = true;
              axios
                .post(
                  `${store.state.apiURL}/business/check`,
                  { domain: siteUrl.value },
                  { headers: { "zi-access-token": userToken.value } }
                )
                .then((response) => {
                  if (response.data.success) {
                    if (response.data.existed) {
                      urlExist.value = true;
                      loading.value = false;
                    } else {
                      urlExist.value = false;
                      step.value += 1;
                      loading.value = false;
                    }
                  }
                })
                .catch((err) => {
                  console.log(err);
                  loading.value = false;
                });
            } else {
              // notValidPozURL.value = !correctPozURL.value;
              notValidSiteURL.value = !correctSiteURL.value;
            }
          }
          break;
        case 2:
          {
            if (
              !notValidKey.value &&
              !notValidPass.value &&
              correctSiteURL.value
            ) {
              loading.value = true;
              axios
                .post(
                  `${store.state.apiURL}/business/check_domain`,
                  {
                    domain: siteUrl.value,
                    key: useKey.value,
                    secret: passKey.value,
                  },
                  { headers: { "zi-access-token": userToken.value } }
                )
                .then((response) => {
                  if (response.status == 200 && response.data.success) {
                    showProductLoading.value = true;
                    createConnection();
                  } else {
                    notValidKey.value = true;
                    notValidPass.value = true;
                    loading.value = false;
                  }
                })
                .catch((err) => {
                  loading.value = false;
                  notValidKey.value = true;
                  notValidPass.value = true;
                });
            }
          }
          break;
      }
    }

    function stepBack(prevStep) {
      if (step.value > 0) {
        step.value = prevStep;
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
      } else if (e.target.value.length > 1) {
        if (typeof activationKeyFields.value[index + 1] == "undefined") {
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
    }
    function handleActivationInput(e) {
      // Grab input's value
      let value = e.target.value;
      // console.log(value);
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
          loading.value = false;
          wrongKey.value = false;
          changeStep();
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

    function sendCode() {
      context.emit("sendCode");
      timerCounter.value = 180;
    }
    function validURL(event) {
      switch (event.target.name) {
        case "siteUrl":
          {
            if (urlRegex.test(siteUrl.value)) {
              notValidSiteURL.value = false;
            } else {
              notValidSiteURL.value = true;
            }
          }
          break;
        case "pozUrl":
          {
            if (urlRegex.test(pozitronUrl.value)) {
              notValidPozURL.value = false;
            } else {
              notValidPozURL.value = true;
            }
          }
          break;
      }
    }
    function correctURL(event) {
      switch (event.target.name) {
        case "siteUrl":
          {
            if (siteUrl.value != "" || siteUrl.value != null) {
              correctSiteURL.value = true;
              notValidSiteURL.value = false;
            } else {
              correctSiteURL.value = false;
            }
          }
          break;
        case "pozUrl":
          {
            if (
              urlRegex.test(pozitronUrl.value) &&
              pozitronUrl.value.split(".").length - 1 == 2 &&
              pozitronUrl.value.slice(-1) != "."
            ) {
              correctPozURL.value = true;
              notValidPozURL.value = false;
            } else {
              correctPozURL.value = false;
            }
          }
          break;
      }
    }
    function validKey(event) {
      switch (event.target.name) {
        case "useKey":
          {
            if (
              useKey.value != "" &&
              useKey.value.length > 10 &&
              useKey.value.substr(0, 3) == "ck_"
            ) {
              notValidKey.value = false;
            } else {
              notValidKey.value = true;
            }
          }
          break;
        case "passKey":
          {
            if (
              passKey.value != "" &&
              passKey.value.length > 10 &&
              passKey.value.substr(0, 3) == "cs_"
            ) {
              notValidPass.value = false;
            } else {
              notValidPass.value = true;
            }
          }
          break;
      }
    }

    //set interval for progress bar
    const progressValue = ref(0);

    const interval2 = ref(null);
    const startProgress = (count) => {
      let percent = 0;
      let counter = 0;
      interval2.value = setInterval(() => {
        percent = Math.trunc((counter / count) * 100);
        counter++;
        progressValue.value = percent;
        if (percent >= count) {
          endProgress();
        }
      }, 1000);
    };
    const endProgress = () => {
      clearInterval(interval2.value);
      if (myColor.value == "#558b6e") {
        setTimeout(function () {
          progressValue.value = 100;
          cookies.set("uToken", userToken.value, "1d");
          router.push({
            name: "products",
            params: { userId: cookies.get("uzit") },
          });
        }, 3000);
      }
      interval2.value = null;
    };

    function modalHandle() {
      modalShow.value = !modalShow.value;
    }
    return {
      loading,
      activationKeyFields,
      activationKey,
      inputs,
      step,
      stepClass,
      mySteps,
      siteUrl,
      pozitronUrl,
      useKey,
      passKey,
      modalShow,
      notValidSiteURL,
      correctSiteURL,
      pozitronUrl,
      notValidPozURL,
      correctPozURL,
      timerCounter,
      notValidPass,
      notValidKey,
      userToken,
      wrongKey,
      progressValue,
      showProductLoading,
      urlExist,
      myColor,
      progressLabelColor,
      correctURL,
      validURL,
      validKey,
      handleActivationInput,
      createConnection,
      clearInput,
      changeStep,
      modalHandle,
      stepBack,
      sendCode,
    };
  },
  components: { GuidModal },
};
</script>

<style lang="scss">
@import "../../assets/styles/variablesOfLogin";

@media (max-width: 1008px) {
  .stepLine {
    width: 45% !important;
  }
  .stepLine1 {
    right: 6% !important;
  }

  .stepLine2 {
    right: 45% !important;
  }
}

// @media (max-width: 810px) {
//   .stepLine {
//     width: 43% !important;
//   }
// }

@media (max-width: 700px) {
  .stepLine {
    width: 35% !important;
  }

  .stepLine1 {
    right: 9% !important;
  }

  .stepLine2 {
    right: 49% !important;
  }
}
.inputHeight {
  height: 78px;
  margin: 16px 0px !important;
}

.counter {
  text-align: left;
  color: #131520;
  font-weight: 500;
  font-size: 20px;
  line-height: 162%;
  margin-left: 15px;
}

.stepsContainer {
  min-width: 85%;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin: 16px 0px;
  .stepContainer {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .smallText {
      color: $stepColor;
    }
  }
  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .stepCircle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
      border-width: 2px;
      border-style: solid;
    }
  }
  .stepLine {
    height: 4px;
    width: 30.5%;
    border-radius: 8px;
    position: absolute;
    top: 27%;
  }
  .stepLine1 {
    right: 13%;
  }
  .stepLine2 {
    width: 33.5%;
    right: 50%;
  }
}

.fullStep {
  background-color: $stepColor;
  border-color: $stepColor;
  color: #fff;
}

.nextStep {
  background-color: #fff;
  border-color: $stepColor;
  color: $stepColor;
}

.stepLine.nextStep,
.stepLine.notActiveStep {
  background: $notActiveStep;
  border-color: $notActiveStep;
}

.notActiveStep {
  background-color: #fff;
  border-color: $notActiveStep;
  color: $notActiveStep;
}

.formTitle {
  a {
    font-size: 0.9rem;
    color: cadetblue;
  }
}

.innerBox1 {
  margin: 88px 0px;
  height: 278px;
  .inputContainer {
    height: 20px !important;
  }
}

.innerBox2 {
  margin: 96px 0px;
  height: 315px;
  .inputContainer {
    height: 20px;
  }
  .middleBox {
    margin: 32px 0px 0px !important;
  }
  .middleBox1 {
    margin: 24px 0px;
  }
}

.innerBox3 {
  min-width: 395px !important;
  .middleBox {
    margin: 56px 0px !important;
    height: 251px;
    min-width: 395px !important;
  }
}

.progressLoading {
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  color: #000000;
  margin: 30px 15px;
  p {
    margin: 4px 0px;
  }
}

.p-progressbar {
  border-radius: 4px;
  height: 21px !important;
  font-size: 14px;
  position: relative;
}

.p-progressbar .p-progressbar-value {
  background: v-bind("myColor") !important;
  border-radius: 4px;
  position: static;
}

.p-progressbar .p-progressbar-label {
  font-size: 14px !important;
  color: v-bind("progressLabelColor") !important;
  position: absolute;
  left: 50%;
}
</style>
