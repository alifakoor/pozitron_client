<template>
  <div class="p-jc-center p-ai-center p-grid p-mx-0" style="margin-top: 36px">
    <FormContainer></FormContainer>
    <SideBar></SideBar>
  </div>
</template>

<script>
import SideBar from "../components/login-signup/TheSideBar.vue";
import FormContainer from "../components/login-signup/TheFormContainer.vue";
export default {
  components: {
    SideBar,
    FormContainer,
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Vazir";
  src: local("Vazir"),
    url("../assets/fonts/Vazir/Vazir-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "VazirFD";
  src: local("Vazir"),
    url("../assets/fonts/Vazir/Vazir-Regular-FD-WOL.ttf") format("truetype");
}
* {
  font-family: "VazirFD";
}
*::placeholder {
  font-family: "VazirFD";
  text-align: right;
  margin-right: 4px;
}
textarea,
input {
  font-family: "VazirFD" !important;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: #e5e5e5;
}

input::-internal-autofill-selected {
  background-color: transparent !important;
}
</style>
