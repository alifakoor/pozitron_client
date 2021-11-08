<template>
  <zi-rtl-breadcrumb :home="home" :model="items" />
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: 'zi-navabr',
  data () {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      items: [
        { label: 'محصولات' }
      ]
    }
  }
}
</script>
