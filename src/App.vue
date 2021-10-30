<template>
  <div class="zi-navbar">
    <zi-rtl-breadcrumb :home="home" :model="items" />
  </div>
  <div class="p-d-flex">
    <div class="zi-sidebar">
      <Menu :model="menuItems" />
    </div>
    <div class="zi-main">
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      items: [
        { label: 'انبار' },
        { label: 'محصولات' }
      ],
      menuItems: [
        {
          icon: 'pi pi-upload',
          to: '/fileupload'
        },
        {
          icon: 'pi pi-upload',
          to: '/fileupload'
        },
        {
          icon: 'pi pi-upload',
          to: '/fileupload'
        },
        {
          icon: 'pi pi-upload',
          to: '/fileupload'
        }
      ]
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0 !important;
  padding: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  direction: rtl;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.zi-navbar {
  width: 100%;
  height: 10vh;
  position: fixed;
}
.zi-navbar .p-breadcrumb {
  padding-right: 10%;
}

.zi-sidebar {
  width: 10%;
}

.zi-main {
  width: 90%;
  background-color: #F6F6F7;
}

.zi-sidebar, .zi-main {
  height: 100vh;
  padding-top: 55px;
}
</style>
