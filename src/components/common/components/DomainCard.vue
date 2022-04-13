<template>
  <div v-if="Demo" class="DomainCard" :class="DomainCardClass">
    <a target="_blank" class="domainLink" href="https://demo.pozitronet.ir/"
      >https://demo.pozitronet.ir</a
    >
    <Button class="domainBtn" @click="redirectUser()">ورود به دمو</Button>
  </div>
  <div v-else-if="domainLink" class="DomainCard" :class="DomainCardClass">
    <p class="domainLink" @click="$emit('addDomainLink')">سایت اختصاصی شما</p>
    <Button class="domainBtn" @click="$emit('addDomainLink')"
      >ورود به پنل</Button
    >
  </div>
  <div v-else class="DomainCard" :class="DomainCardClass">
    <p class="domainTxt" @click="$emit('addDomainLink')">سایت اختصاصی شما</p>
    <Button class="domainBtn" @click="$emit('addDomainLink')"
      >افزودن سایت</Button
    >
  </div>
</template>
<script>
import { useCookies } from "vue3-cookies";
export default {
  emits: ["addDomainLink"],
  props: {
    domainLink: {
      require: false,
      default: null,
    },
    DomainCardClass: {
      require: false,
      default: "",
    },
    Demo: {
      require: false,
      default: false,
    },
    register: {
      require: false,
    },
  },
  setup(props) {
    const { cookies } = useCookies();

    function redirectUser() {
      props.register
        ? cookies.set("keepU", "rrrr")
        : cookies.set("keepU", "llll");
      window.location = "https://demo.pozitronet.ir";
    }

    return {
      cookies,
      redirectUser,
    };
  },
};
</script>
<style lang="scss">
.DomainCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 8px 20px;
  width: 200px;
  height: 152px;
  margin: 0px 16px;
  background: #ffffff;
  padding: 50px 8px 20px;
  border-radius: 8px;
  .domainLink,
  .domainTxt {
    color: #49527e;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    text-align: right;
    text-decoration-line: underline;
    text-underline-offset: 5px;
    font-family: "VazirFD";
  }
  .domainBtn {
    font-family: "VazirFD";
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;
    width: 112px;
    height: 32px;
    background: #048ba8;
    border-radius: 4px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 32px 0px;
    font-size: 14px;
    line-height: 168%;
    text-align: right;
    color: #ffffff;
  }
  .domainBtn:hover {
    background: #036378 !important;
  }
}
</style>
