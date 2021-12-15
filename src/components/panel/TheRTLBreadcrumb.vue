<template>
  <nav class="p-breadcrumb p-component" aria-label="Breadcrumb">
    <div class="pozitronBrand">
      <p>POZITRON</p>
    </div>
    <!-- <ul>
			<BreadcrumbItem
				v-if="home"
				:item="home"
				class="p-breadcrumb-home"
				:template="$slots.item"
				:exact="exact"
			/>
			<template v-for="item of model" :key="item.label">
				<li class="p-breadcrumb-chevron pi pi-chevron-left"></li>
				<BreadcrumbItem
					:item="item"
					:template="$slots.item"
					:exact="exact"
				/>
			</template>
		</ul> -->
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
          class="pi pi-bell"
          v-badge.info="notifCount"
          @click="
            () => {
              if (notifCount > 0) {
                showNotif = !showNotif;
                notifCount--;
              } else {
                showNotif = false;
              }
            }
          "
        ></i>
        <a href="#">انبار محصولات</a>

        <div
          class="notif p-d-flex p-ai-center p-jc-center"
          :class="showNotif && 'showNotif'"
        >
          <div class="triangle2"></div>
          <p class="exitText">به پوزیترون خوش آمدین !</p>
        </div>
      </div>

      <div class="p-d-flex p-ai-center p-jc-around userInfo">
        <div class="welcomeText p-d-flex">
          <span>شماره پشتیبانی&nbsp;:&nbsp;&nbsp;</span>
          <a
            href="tel:5558920234"
            onclick="ga('send', 'event', { eventCategory: 'Contact', eventAction: 'Call', eventLabel: 'Mobile Button'});"
            ><p class="call-button">0901-933-0922</p>
          </a>
        </div>
        <div class="userImg">
          <img
            src="../../../public/images/usersImg/Group-12584.jpg"
            alt="عکس کاربر"
          />
          <div class="triangle"></div>
          <div class="exitAccount p-d-flex p-ai-center p-jc-center">
            <i class="ri-logout-box-r-line"></i>
            <p class="exitText">خروج از پوزیترون</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import BreadcrumbItem from 'primevue/breadcrumb/BreadcrumbItem.vue'

export default {
  name: "zi-rtl-breadcrumb",
  props: {
    model: {
      type: Array,
      default: null,
    },
    home: {
      type: null,
      default: null,
    },
    exact: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showNotif: false,
      notifCount: 1,
      items: [
        {
          icon: "ri-store-2-line",
          // to: "/panel",
        },
        {
          icon: "pi pi-box",
          to: "/panel/1/products",
        },
        {
          icon: "ri-file-list-line",
          // to: "/panel",
        },
        {
          icon: "ri-group-line",
          // to: "/panel",
        },
        {
          icon: "ri-settings-3-line",
          // to: "/panel/1",
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
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
  overflow-x: visible;
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
    font-size: 16px;
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

.userImg {
  width: 50px;
  height: 50px;
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
  width: 190px;
  height: 58.33px;
  background: #fff;
  border-radius: 7px;
  z-index: 9999999999999;
  transform: translateX(-20%);
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 3.35593px 1.67797px rgba(0, 0, 0, 0.05),
    0px 0px 1.67797px rgba(0, 0, 0, 0.25);
  .exitText {
    font-size: 17px;
    line-height: 164%;
    text-align: right;
    color: #5c679e;
  }
  i {
    color: #5c679e;
    font-size: 17px;
  }
}

.notif {
  position: absolute;
  top: 100%;
  left: 0;
  width: 190px;
  height: 58.33px;
  background: #fff;
  border-radius: 7px;
  z-index: 9999999999999;
  transform: translateX(18%);
  visibility: hidden;
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

.showNotif {
  visibility: visible !important;
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

.triangle {
  display: block;
  height: 0px;
  width: 0px;
  border: 15px solid transparent;
  border-bottom-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: calc(50% - 15px);
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 3.35593px 1.67797px rgba(0, 0, 0, 0.05);
}

.userImg:hover .exitAccount,
.userImg:hover .triangle {
  visibility: visible;
}

// .userImg:hover .exitAccount,
// .userImg:hover .triangle {
// 	visibility: visible;
// }

// .p-badge-dot {
// 	padding: 0.5rem !important;
// }

.p-badge-dot {
  width: 1.5rem !important;
  line-height: 1.25rem !important;
  height: inherit !important;
  // min-width: 0.5rem;
  // height: 0.5rem;
  // border-radius: 50%;
  // padding: 0;
}

.p-badge {
  width: 21px !important;
  height: 21px !important;
  border-radius: 50% !important;
  min-width: 21px !important;
  line-height: 1.25rem !important;
}

.p-badge.p-badge-info {
  background-color: #048ba8 !important;
}

// .pi-bell:hover ~ .notif,
// .pi-bell:hover ~ .triangle2 {
// 	visibility: visible;
// }
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
  z-index: 999999999999999999999999999999999999999999999 !important;
  width: fit-content !important;
  .p-menuitem-link:not(.p-disabled):hover {
    background: transparent !important;
    outline: none;
    border: none;
  }

  .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon {
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
