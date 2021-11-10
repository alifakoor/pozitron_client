<template>
  <FormContainer></FormContainer>
  <SideBar></SideBar>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import FormContainer from "./components/FormContainer.vue";
export default {
  components: {
    SideBar,
    FormContainer,
  },
};
</script>

<style>
@font-face {
  font-family: "Vazir";
  src: local("Vazir"),
    url("./assets/fonts/Vazir/Vazir-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "VazirFD";
  src: local("Vazir"),
    url("./assets/fonts/Vazir/Vazir-Regular-FD-WOL.ttf") format("truetype");
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
  text-align: right;
  direction: rtl;
}
body {
  background: #e5e5e5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
