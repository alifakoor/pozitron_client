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
      <small>تایید شماره موبایل</small>
    </div>
    <div class="stepLine stepLine1" :class="stepClass[0]"></div>
    <div class="stepContainer p-d-flex">
      <div class="step">
        <div class="stepCircle" :class="stepClass[1]" @click="stepBack(1)">
          <i v-if="step >= 2" class="ri-check-line"></i>
          <span v-else>2</span>
        </div>
      </div>
      <small>ساخت دامنه</small>
    </div>
    <div class="stepLine stepLine2" :class="stepClass[1]"></div>
    <div class="stepContainer p-d-flex">
      <div class="step">
        <div class="stepCircle" :class="stepClass[2]" @click="stepBack(2)">
          <i v-if="step == 3" class="ri-check-line"></i>
          <span v-else>3</span>
        </div>
      </div>
      <small>اتصال سایت به پوزیترون</small>
    </div>
  </div>

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
            class="codeTokenInput"
            :maxlength="key.length"
          />
        </div>
      </div>
      <button
        @click.prevent="changeStep()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="!loading" class="pi pi-clock p-ml-1"></i>
        <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
        <p>تایید و ادامه</p>
      </button>
      <!-- <p class="signUp p-mr-2">
        <a
          @click.prevent="
            () => {
              changeNumber = true;
              loading = false;
            }
          "
          class="linkSignUp p-mr-1"
          href="#"
          >تغییر شماره موبایل</a
        >
        <i class="ri-arrow-left-line"></i>
      </p> -->
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
        </div>
      </div>
      <!-- pozitron url input -->
      <div class="middleBox1">
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
      </div>
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
          برای ساخت کلید وارد <a href="#"> پیکربندی پنل سایت ووکامرس </a>خود
          شوید.<i
            class="pi pi-question-circle"
            @click="
              () => {
                modalShow = !modalShow;
              }
            "
          ></i>
        </p>
        <div class="inputContainer">
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
          <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="notValidKey === false"
          ></i>

          <p class="errText" v-show="notValidKey === true">
            لطفا کلید را به درستی وارد کنید.
          </p>
        </div>
        <div class="inputContainer">
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
          <i
            class="ri-checkbox-circle-line iconInput iconCorrect"
            v-show="notValidPass === false"
          ></i>
          <!-- <i
          class="ri-close-circle-line iconInput iconInCorrect"
          v-show="notValidPass === true"
        ></i> -->
          <p class="errText" v-show="notValidPass === true">
            لطفا رمز را به درستی وارد کنید.
          </p>
        </div>
      </div>
      <button
        @click.prevent="changeStep()"
        class="loginButton"
        :class="loading ? 'sendData' : ''"
      >
        <i v-show="!loading" class="ri-checkbox-circle-line p-ml-1"></i>
        <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
        <p>اتصال به پوزیترون</p>
      </button>
    </form>
  </div>

  <!-- guid modal box -->
  <GuidModal v-show="modalShow" :modalShow="modalShow"></GuidModal>
</template>

<script>
import { ref, computed, defineComponent, watchEffect } from "vue";
import GuidModal from "./GuidModal.vue";

export default {
  props: {
    userTelOut: {
      require: true,
      type: String,
    },
  },
  setup() {
    // ------------------variables-----------------------
    const urlRegex = new RegExp(
      "(?:www.|(?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
    );
    const loading = ref(false);
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
    const modalShow = ref(false);
    const useKey = ref("");
    const passKey = ref("");
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
    // ----------------------functions-------------------------
    function changeStep() {
      switch (step.value) {
        case 0:
          {
            if (activationKey.value != "") {
              loading.value = true;
              setTimeout(() => {
                step.value += 1;
                loading.value = false;
              }, 2000);
            }
          }
          break;
        case 1:
          {
            if (correctSiteURL.value && correctPozURL.value) {
              loading.value = true;
              setTimeout(() => {
                step.value += 1;
                loading.value = false;
              }, 2000);
            } else {
              notValidPozURL.value = !correctPozURL.value;
              notValidSiteURL.value = !correctSiteURL.value;
            }
          }
          break;
        case 2:
          {
            if (!notValidKey.value && !notValidPass.value) {
              loading.value = true;
              setTimeout(() => {
                step.value += 1;
                loading.value = false;
              }, 2000);
            }
          }
          break;
      }
    }
    function stepBack(prevStep) {
      if (activationKey.value != "") {
        step.value = prevStep;
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
            if (
              urlRegex.test(siteUrl.value) &&
              siteUrl.value.split(".").length - 1 == 2 &&
              siteUrl.value.slice(-1) != "."
            ) {
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
            if (useKey.value != "" && useKey.value.length > 10) {
              notValidKey.value = false;
            } else {
              notValidKey.value = true;
            }
          }
          break;
        case "passKey":
          {
            if (passKey.value != "" && passKey.value.length > 10) {
              notValidPass.value = false;
            } else {
              notValidPass.value = true;
            }
          }
          break;
      }
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
      notValidPass,
      notValidKey,
      correctURL,
      validURL,
      validKey,
      handleActivationInput,
      changeStep,
      stepBack,
    };
  },
  components: { GuidModal },
};
</script>

<style lang="scss">
@import "../assets/styles/variables";

.stepsContainer {
  min-width: 479px;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin: 16px 0px;
  .stepContainer {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .step {
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
