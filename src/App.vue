<template>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { mapMutations } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const { cookies } = useCookies();

    if (cookies.get("uToken")) {
      router.push({
        name: "products",
        params: { userId: cookies.get("uzit") },
      });
    } else {
      router.push({
        name: "SignUp",
      });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  direction: rtl;
}
</style>
