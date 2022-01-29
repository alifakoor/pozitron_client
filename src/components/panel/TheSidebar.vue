<template>
  <div class="zi-sidebar">
    <div class="pozitronText">
      <p>POZITRON</p>
    </div>
    <div class="userImg">
      <img
        @click="
          () => {
            exitBox = !exitBox;
          }
        "
        src="../../assets/images/usersImg/Profile.png"
        alt="عکس کاربر"
      />
      <div
        :class="exitBox ? 'p-d-flex' : 'p-d-none'"
        class="exitAccount p-ai-center p-jc-center"
        @click="logOut()"
      >
        <i class="ri-logout-box-r-line"></i>
        <p class="exitText">خروج از پوزیترون</p>
      </div>
    </div>
    <ul>
      <li class="notHand">
        <router-link :to="{ name: 'dashboard', params: { userId: userID } }">
          <i class="notHand ri-store-2-line sideIcon"></i>
          <p class="iconTxt">فروش حضوری</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'products', params: { userId: userID } }">
          <i class="pi pi-box sideIcon"></i>
          <p class="iconTxt">انبار محصولات</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'factors', params: { userId: userID } }">
          <i class="ri-file-list-line sideIcon"></i>
          <p class="iconTxt">لیست فاکتورها</p>
        </router-link>
      </li>
      <li class="notHand">
        <router-link :to="{ name: 'about', params: { userId: userID } }">
          <i class="notHand ri-group-line sideIcon"></i>
          <p class="iconTxt">مشتریان</p>
        </router-link>
      </li>
      <li class="notHand">
        <router-link :to="{ name: 'setting', params: { userId: userID } }">
          <i class="notHand ri-settings-3-line sideIcon"></i>
          <p class="iconTxt">تنظیمات</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      cookies: useCookies(),
      exitBox: false,
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
  methods: {
    ...mapMutations(["changeUserToken"]),
    logOut() {
      this.changeUserToken("");
      this.cookies.cookies.remove("uToken");
      this.cookies.cookies.remove("uzit");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variablesOfTable";
.iconTxt {
  visibility: hidden;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  margin: 4px 0px;
}

.sideIcon:hover ~ .iconTxt {
  visibility: visible;
}
.notHand {
  cursor: auto;
  color: #49527e;
  .iconTxt {
    color: #49527e;
  }
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
    padding: 29px 13px;
    width: 96px;
    position: relative;

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
      padding: 0.75rem 0;
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

.userImg {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    margin-top: 2.5px;
  }
}

.exitAccount {
  position: absolute;
  top: 100%;
  left: 0;
  width: 157.12px;
  height: 44.83px;
  background: #fff;
  border-radius: 7px;
  z-index: 9999999999999;
  transform: translate(-93%, -40%);
  z-index: 999999999999999;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 3.35593px 1.67797px rgba(0, 0, 0, 0.05),
    0px 0px 1.67797px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 0px 9.55556px rgba(0, 0, 0, 0.2));
  .exitText {
    font-size: 16px;
    line-height: 164%;
    text-align: right;
    color: #5c679e;
  }
  i {
    color: #5c679e;
    font-size: 16px;
  }
}
</style>
