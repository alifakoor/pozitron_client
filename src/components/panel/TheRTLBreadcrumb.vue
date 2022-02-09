<template>
  <nav class="p-breadcrumb p-component" aria-label="Breadcrumb">
    <!-- <div class="pozitronBrand">
      <p>POZITRON</p>
    </div> -->
    <div class="p-d-flex p-ai-center p-jc-between navbarBox">
      <div class="p-d-flex p-ai-center p-jc-around navbarInfo">
        <div class="navbarBurger">
          <i
            class="pi pi-bars"
            type="button"
            label="Toggle"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          ></i>
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
        <i
          v-if="notifCount > 0"
          class="pi pi-bell"
          v-badge.info="notifCount"
          @click="
            () => {
              showNotif = true;
            }
          "
        ></i>
        <i
          v-else
          @click="
            () => {
              showNotif = true;
            }
          "
          class="pi pi-bell"
        ></i>
        <a href="#">انبار محصولات</a>
        <a href="#" v-show="createTab">محصول</a>

        <div class="notif p-ai-center p-jc-center" v-show="showNotif">
          <div class="triangle2"></div>
          <i
            v-if="showNotif"
            class="ri-close-line p-mr-1"
            @click="
              () => {
                showNotif = false;
                if (notifCount > 0) {
                  notifCount--;
                }
              }
            "
          ></i>
          <p v-if="notifCount == 1 && showNotif" class="exitText">
            به پوزیترون خوش آمدین !
          </p>
          <p v-else-if="notifCount == 0 && showNotif" class="exitText">
            هیچ پیغامی ندارید.
          </p>
        </div>
      </div>
      <!-- show user website -->
      <div
        class="p-ai-center p-jc-around userInfo"
        :class="!createTab ? 'p-d-flex' : 'p-d-none'"
      >
        <div class="welcomeText p-d-flex">
          <span>شماره پشتیبانی&nbsp;:&nbsp;&nbsp;</span>
          <a
            href="tel:09010922933"
            onclick="ga('send', 'event', { eventCategory: 'Contact', eventAction: 'Call', eventLabel: 'Mobile Button'});"
            ><p class="call-button">0901-0922-933</p>
          </a>
        </div>
        <a
          :href="userDomain"
          target="_blank"
          class="p-d-flex p-ai-center p-jc-between showSiteBtn"
          ><i class="pi pi-eye"></i> مشاهده سایت</a
        >
      </div>
      <!-- button for save product -->
      <div
        class="p-ai-center p-jc-around userInfo p-pl-3"
        :class="createTab ? 'p-d-flex' : 'p-d-none'"
      >
        <button class="productBtnCancel" @click="backToTable">لغو</button>
        <button class="productBtnSave" @click="createProduct('simple')">
          <i class="ri-checkbox-circle-line p-mx-1"></i>ذخیره
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { useCookies } from "vue3-cookies";

export default {
  name: "zi-rtl-breadcrumb",
  data() {
    return {
      cookies: useCookies(),
      showNotif: false,
      notifCount: 1,
      exitBox: false,
      items: [
        {
          label: "فروش حضوری",
          icon: "ri-store-2-line",
          command: (event) => {
            this.$router.push({
              name: "dashboard",
              params: { userId: this.cookies.cookies.get("uzit") },
            });
          },
        },
        {
          label: "انبار محصولات",
          icon: "pi pi-box",
          command: (event) => {
            this.$router.push({
              name: "products",
              params: { userId: this.cookies.cookies.get("uzit") },
            });
          },
        },
        {
          label: "لیست فاکتورها",
          icon: "ri-file-list-line",
          command: (event) => {
            this.$router.push({
              name: "factors",
              params: { userId: this.cookies.cookies.get("uzit") },
            });
          },
        },
        {
          label: "مشتریان",
          icon: "ri-group-line",
          class: "p-disabled",
          // to: "/panel",
        },
        {
          label: "تنظیمات",
          icon: "ri-settings-3-line",
          class: "p-disabled",
          // to: "/panel/1",
        },
        {
          label: "خروج از پوزیترون",
          icon: "ri-logout-box-r-line",
          command: (event) => {
            this.logOut();
          },
        },
      ],
      createTab: false,
    };
  },
  computed: {
    ...mapState(["userDomain"]),
    createTab: function () {
      return (
        this.$route.fullPath ==
        `/panel/${this.cookies.cookies.get("uzit")}/create`
      );
    },
  },
  watch: {
    $route(to, from) {
      this.createTab =
        to.fullPath == `/panel/${this.cookies.cookies.get("uzit")}/create`;
    },
  },
  methods: {
    ...mapMutations(["changeUserToken", "createProduct", "createProduct"]),
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    logOut() {
      this.changeUserToken("");
      this.cookies.cookies.remove("uToken");
      this.cookies.cookies.remove("uzit");
      window.location.reload();
    },
    backToTable() {
      this.$router.push({
        name: "products",
        params: { userId: this.cookies.cookies.get("uzit") },
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variablesOfTable";
.pozitronBrand {
  position: absolute;
  top: 0;
  right: 0;
  border-bottom: 3px solid #7de6fc;
  display: none;
  align-items: center;
  justify-content: center;
  color: #7de6fc;
  background: #23273c;
  width: 96px;
  height: 100%;
}
@media (min-width: 680px) {
  .pozitronBrand {
    display: flex;
  }
  .navbarBox {
    margin-right: 3%;
  }
}
.p-breadcrumb {
  overflow-x: visible !important;
  height: 56px;
}

.p-breadcrumb:not(.navbarInfo):focus .notif {
  visibility: hidden !important;
}

.p-breadcrumb ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.p-breadcrumb .p-menuitem-text {
  line-height: 1;
}

.p-breadcrumb .p-menuitem-link {
  text-decoration: none;
}

.p-breadcrumb::-webkit-scrollbar {
  display: none;
}

.navbarBox {
  width: 104%;
}
.navbarInfo {
  min-width: 145px;
  height: 38px;
  cursor: pointer;
  position: relative;
  margin-right: 25px;
  i {
    color: #7b84b2;
    font-size: 20px;
    margin-left: 5px;
  }
  a {
    color: #036378;
    font-weight: bold;
    font-size: 16px;
    line-height: 153%;
    text-decoration: none;
  }
}

.userInfo {
  min-width: 178px;
  height: 50px;
}

.welcomeText {
  font-size: 14px;
  color: #000;
  margin: 0px 8px;
  span {
    display: none;
  }
  a {
    text-decoration: underline;
    color: #38489b;
    font-size: 14px;
  }
}

.showSiteBtn {
  background: #363d5d;
  border-radius: 4px;
  padding: 8px;
  margin: 0px 4px;
  width: 117px;
  height: 32px;
  color: #fff;
  font-family: "VazirFD";
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 168%;
  text-align: right;
}
.showSiteBtn:hover {
  background: #49527e;
}

.productBtnSave,
.productBtnCancel {
  cursor: pointer;
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  background: #048ba8;
  border-radius: 4px;
  margin: 0px 0px;
  outline: none;
  box-shadow: none;
  border: 0;
  color: #fff;
  margin: 0px 8px;
  font-family: "VazirFD";
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
.productBtnCancel {
  width: 80px;
  background: #ffffff;
  border: 1px solid #048ba8;
  color: #036378;
}

.productBtnSave:hover {
  background-color: #036378;
}

.notif {
  position: absolute;
  display: flex;
  top: 100%;
  left: 0;
  min-width: 190px;
  width: max-content;
  height: 58.33px;
  background: #fff;
  border-radius: 7px;
  z-index: 9999999999999;
  transform: translateX(18%);
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 3.35593px 1.67797px rgba(0, 0, 0, 0.05),
    0px 0px 1.67797px rgba(0, 0, 0, 0.25);
  .exitText {
    font-size: 17px;
    line-height: 164%;
    text-align: right;
    color: #5c679e;
    margin: 0px 6.5px;
  }
  i {
    color: #5c679e;
  }
}

.triangle2 {
  display: block;
  height: 0px;
  width: 0px;
  border: 15px solid transparent;
  border-bottom-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 0;
  right: 50%;
  transform: translate(20%, -90%);
  transition: all 0.3s ease-in-out;
}

.p-badge-dot {
  width: 1.5rem !important;
  line-height: 1.25rem !important;
  height: inherit !important;
}

.p-badge {
  width: 21px !important;
  height: 21px !important;
  border-radius: 50% !important;
  min-width: 21px !important;
  line-height: 1.25rem !important;
  z-index: 9000000000000000000000 !important;
}

.p-badge.p-badge-info {
  background-color: #048ba8 !important;
}

.navbarBurger {
  display: inline-block;
  margin: 0 0 0 15px;
}
@media (min-width: 680px) {
  .navbarBurger {
    display: none;
    margin: 0 25px 0 15px;
  }
  .welcomeText {
    span {
      display: inline;
    }
  }
}

.p-menu-overlay {
  z-index: 99999999999999999999999999999999999999999999999999999999 !important;
  width: fit-content !important;
  direction: rtl;

  .p-menuitem-link:not(.p-disabled):hover {
    background: transparent !important;
    outline: none;
    border: none;
  }

  .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon,
  .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text {
    color: #048ba8 !important;
  }
  .p-menuitem-link:focus {
    outline: none;
    border: none;
    box-shadow: none !important;
  }
  .p-menuitem-link {
    justify-content: center;
    .p-menuitem-icon {
      margin: 0;
    }
  }
}
</style>
