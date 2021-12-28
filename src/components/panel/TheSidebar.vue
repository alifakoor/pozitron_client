<template>
  <div class="zi-sidebar">
    <div class="pozitronText">
      <p>POZITRON</p>
    </div>
    <ul>
      <li class="notHand">
        <router-link :to="{ name: 'dashboard', params: { userId: userID } }">
          <i class="notHand ri-store-2-line"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'products', params: { userId: userID } }">
          <i class="pi pi-box"></i>
        </router-link>
      </li>
      <li class="notHand">
        <router-link :to="{ name: 'home', params: { userId: userID } }">
          <i class="notHand ri-file-list-line"></i>
        </router-link>
      </li>
      <li class="notHand">
        <router-link :to="{ name: 'about', params: { userId: userID } }">
          <i class="notHand ri-group-line"></i>
        </router-link>
      </li>
      <li class="notHand">
        <router-link :to="{ name: 'setting', params: { userId: userID } }">
          <i class="notHand ri-settings-3-line"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default {
  data() {
    return {
      userID: this.$cookies.get("uzit"),
      items: [
        {
          icon: "ri-store-2-line",
        },
        {
          icon: "pi pi-hom",
        },
        {
          icon: "ri-file-list-line",
        },
        {
          icon: "ri-group-lin",
        },
        {
          icon: "ri-settings-3-line",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variablesOfTable";

.notHand {
  cursor: auto;
}
.zi-sidebar {
  display: none;
}

@media (min-width: 680px) {
  .zi-sidebar {
    min-height: 100vh;
    position: sticky;
    background: #23273c;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 16px 30px 0;
    width: 96px;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column wrap;
      list-style: none;
      margin-top: 30px;
    }

    a {
      width: 100%;
      color: #ffffff;
      display: block;
      padding: 1.3125rem 0;
      text-decoration: none;
      &.router-link-exact-active {
        color: #7de6fc;
      }
    }

    .notHand > a {
      cursor: auto !important;
    }

    i {
      font-size: 1.5rem;
    }
  }
}
</style>
