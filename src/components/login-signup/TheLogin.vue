<template>
  <div class="p-d-flex p-ai-center p-jc-start formContainer p-flex-column">
    <!-- enter code of login -->
    <div
      v-if="!choosenSite"
      class="innerBox p-d-flex p-ai-start p-jc-start p-flex-column"
    >
      <p class="title">ورود به پنل کاربری پوزیترون</p>
      <form
        @submit.prevent="timerCounter > 0 ? checkKey() : sendCode()"
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
        <button
          id="loginBut"
          class="loginButton"
          :class="loading ? 'sendData' : ''"
        >
          <i v-show="!loading" class="pi pi-clock p-ml-1"></i>
          <i v-show="loading" class="pi pi-spin pi-spinner p-m-1"></i>
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
    <div v-else class="chooseSiteBox" style="top: 50px">
      <div class="titleDomain">
        <p class="header">سایت‌های موجود</p>
        <p class="text">پنل کاربری دلخواه خود را انتخاب کنید.</p>
      </div>
      <div class="DomainCards">
        <DomainCard
          DomainCardClass="boldDomainCard"
          @addDomainLink="redirectUser"
          domainLink="userExist"
        ></DomainCard>
        <DomainCard
          :Demo="true"
          :register="false"
          DomainCardClass="grayDomainCard"
        ></DomainCard>
      </div>
      <div class="helpConnect">
        <div class="helpConnectText">
          <i class="pi pi-question-circle"></i>
          <p class="p-text-right">
            در صورتی که سایت اختصاصی خود را برای فروش محصول ندارید،با ما تماس
            بگیرید.
          </p>
        </div>
        <div class="helpPhone">
          <a
            href="tel:09010922933"
            onclick="ga('send', 'event', { eventCategory: 'Contact', eventAction: 'Call', eventLabel: 'Mobile Button'});"
            ><p class="phoneConnect">
              <i class="fa fa-phone"></i>933 0922 0901
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, watchEffect, watch } from "vue";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import DomainCard from "../common/components/DomainCard.vue";
export default defineComponent({
  emits: ["changingNumber", "sendCode"],
  props: {
    userTelOut: {
      require: true,
      type: String,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();
    const { cookies } = useCookies();
    // timerCounter
    const timerCounter = ref(180);

    const inputs = ref([]);
    const loading = ref(false);
    const wrongKey = ref(false);
    const choosenSite = ref(false);
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

    if (cookies.get("keepU") === "llll") {
      choosenSite.value = true;
      cookies.remove("keepU");
    }

    if (choosenSite.value === false) {
      watchEffect(
        () => {
          inputs.value[0].focus();
        },
        {
          flush: "post",
        }
      );
    }
    let interval = setInterval(() => {
      if (timerCounter.value > 0) {
        timerCounter.value -= 1;
      }
    }, 1000);

    // ---------------------------function -------------------
    function sendCode() {
      context.emit("sendCode");
      timerCounter.value = 180;
    }

    function redirectUser() {
      cookies.set("uToken", cookies.get("btu"), "1d");
      cookies.remove("btu");
      router.push({
        name: "products",
        params: { userId: cookies.get("uzit") },
      });
    }

    function checkKey() {
      if (activationKey.value != "" && timerCounter.value > 0) {
        loading.value = true;
        axios
          .post(`${store.state.apiURL}/auth/verify`, {
            phone: props.userTelOut,
            code: parseInt(activationKey.value),
          })
          .then((response) => {
            if (response.status == 200 && response.data.success) {
              loading.value = false;
              wrongKey.value = false;
              cookies.set("uzit", response.data.data.id, "1d");
              cookies.set("btu", response.data.data.token, "1d");
              clearInterval(interval);
              choosenSite.value = true;
            } else {
              wrongKey.value = true;
              loading.value = false;
              activationKeyFields.value.forEach((input) => {
                input.value = "";
              });
              inputs.value[0].focus();
            }
          })
          .catch((err) => {
            console.log(err);
            wrongKey.value = true;
            loading.value = false;
            activationKeyFields.value.forEach((input) => {
              input.value = "";
            });
            inputs.value[0].focus();
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

    return {
      cookies,
      timerCounter,
      loading,
      inputs,
      activationKeyFields,
      handleActivationInput,
      clearInput,
      checkKey,
      redirectUser,
      sendCode,
      wrongKey,
      activationKey,
      choosenSite,
    };
  },
  components: { DomainCard },
});
</script>
