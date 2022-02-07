<template>
  <GeneralBox
    title="سبد خرید"
    InHeight="584px"
    InGrid="p-md-7"
    AddClass="p-m-0 p-pr-md-0"
    innerBoxClass="p-mr-md-0"
  >
    <template #InnerHtml></template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
};
</script>
