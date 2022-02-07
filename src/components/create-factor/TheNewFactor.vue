<template>
  <div
    class="p-col-12 p-d-flex p-flex-column p-flex-md-row p-ai-start p-jc-center p-px-0"
  >
    <TheFactorCart></TheFactorCart>
    <TheCustomerData></TheCustomerData>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    TheCustomerData: defineAsyncComponent(() =>
      import("../../components/create-factor/TheCustomerData.vue")
    ),
    TheFactorCart: defineAsyncComponent(() =>
      import("../../components/create-factor/TheFactorCart.vue")
    ),
  },
  data() {
    return {};
  },
  computed: {
    // ...mapState["AwaitingPaymentFactor"],
  },
};
</script>
