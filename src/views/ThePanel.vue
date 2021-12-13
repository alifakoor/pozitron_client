<template>
  <div class="zi-navbar">
    <zi-rtl-breadcrumb :home="home" :model="items" />
  </div>
  <div class="p-d-flex">
    <zi-sidebar />
    <div class="zi-main">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: { icon: "pi pi-home", to: "/" },
      items: [{ label: "محصولات" }],
    };
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
