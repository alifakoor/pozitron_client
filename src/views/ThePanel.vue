<template>
  <TheNavbar></TheNavbar>
  <div class="p-d-flex bx" style="background: #f6f6f7">
    <zi-sidebar />
    <div class="zi-main">
      <div class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import TheNavbar from "../components/panel/TheNavbar.vue";
export default {
  components: { TheNavbar },
  methods: {
    ...mapMutations(["changeUserToken"]),
  },
  created() {
    this.changeUserToken();
  },
};
</script>

<style lang="scss">
@import "../assets/styles/app.scss";

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #ffceb7;
    }
  }
}
</style>
