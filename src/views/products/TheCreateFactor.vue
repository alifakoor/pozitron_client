<template>
  <div
    class="factorWrapper p-d-flex p-flex-column p-flex-lg-row p-ai-start p-jc-center"
  >
    <div
      class="p-col-12 p-lg-4 p-d-flex p-flex-column p-ai-center p-jc-center p-pt-3"
    >
      <TheProductList
        @addProductToFactor="addProductToFactors"
      ></TheProductList>
    </div>

    <!-- fator box -->
    <div class="addNewFactor" @click="addFactor()" v-if="factors.length == 0">
      <button>
        <i class="ri-checkbox-circle-line p-mx-1"></i>افزودن فاکتور جدید
      </button>
    </div>
    <div
      v-else
      class="p-col-12 p-lg-8 p-d-flex p-flex-column p-ai-center p-jc-center factorDataBox"
    >
      <header class="headerFactor p-col-12">
        <i class="pi pi-plus" @click="addFactor()"></i>
        <TabView v-model:activeIndex="active" class="tabview-custom">
          <TabPanel v-for="(factor, index) in factors" :key="index">
            <template #header>
              <span></span>
              <i class="pi pi-times"></i>
            </template>
            <div
              class="p-col-12 p-d-flex p-flex-column p-flex-md-row p-ai-start p-jc-center p-px-0"
            >
              <TheFactorCart
                :selectedFactorProducts="factor.selectedFactorProducts"
                @changeCountProduct="changeCountProduct"
              ></TheFactorCart>
              <TheCustomerData></TheCustomerData>
            </div>
          </TabPanel>
        </TabView>
      </header>

      <!-- <TheNewFactor></TheNewFactor> -->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { T } from "../../../dist/assets/vendor.b532806b";

export default {
  components: {
    TheCustomerData: defineAsyncComponent(() =>
      import("../../components/create-factor/TheCustomerData.vue")
    ),
    TheFactorCart: defineAsyncComponent(() =>
      import("../../components/create-factor/TheFactorCart.vue")
    ),
    TheProductList: defineAsyncComponent(() =>
      import("../../components/create-factor/TheProductListBox.vue")
    ),
    TheCustomerData: defineAsyncComponent(() =>
      import("../../components/create-factor/TheCustomerData.vue")
    ),
    TheFactorCart: defineAsyncComponent(() =>
      import("../../components/create-factor/TheFactorCart.vue")
    ),
  },
  data() {
    return {
      active: 0,
      factorIndex: -1,
      factors: [],
    };
  },
  computed: {
    ...mapState(["onHoldFactors", "factorId"]),
  },
  methods: {
    ...mapMutations(["addProductToFactor", "chageFactorIndex"]),
    addFactor() {
      this.factors.push({
        id: null,
        customerData: {},
        selectedFactorProducts: [],
      });
    },
    changeCountProduct(data) {
      let remove = null;
      this.factors[this.active].selectedFactorProducts.map((product, index) => {
        if (product.data.id == data.id) {
          product.count += data.count;
          product.count == 0 ? (remove = index) : "";
        }
      });
      remove !== null
        ? this.factors[this.active].selectedFactorProducts.splice(remove, 1)
        : "";
    },
    addProductToFactors(dataFactor) {
      let exist = null;
      this.factors[this.active].selectedFactorProducts.forEach(
        (product, index) => {
          if (product.data.id == dataFactor.product.id) {
            exist = index;
          }
        }
      );
      if (exist !== null) {
        this.factors[this.active].selectedFactorProducts[exist].count++;
      } else {
        this.factors[this.active].selectedFactorProducts.push({
          count: 1,
          data: dataFactor.product,
        });
      }
      this.updateOnHoldFactor();
    },
    updateOnHoldFactor() {
      if (this.factors[this.active].id === null) {
        this.factors[this.active].id = this.factorId;
        this.factorIndex = -1;
      } else {
        this.factorIndex = this.factors[this.active].id;
      }
      this.chageFactorIndex(this.factorIndex);
      this.addProductToFactor(this.factors[this.active]);
    },
  },
};
</script>

<style lang="scss" scoped>
.factorWrapper {
  width: 100%;
}
.factorDataBox {
  transition: 0.5s all;

  .headerFactor {
    height: 42px;
    background: #dcdeea;
    border-radius: 8px 8px 0px 0px;
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
    padding: 0;
    position: relative;

    .pi.pi-plus {
      position: absolute;
      bottom: 5px;
      z-index: 99999999999999999999999;
    }
  }
}

.addNewFactor {
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 328px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    background: #048ba8;
    border-radius: 16px;
    margin: 0px;
    border: 0;
    color: #fff;
    font-weight: 500;
    font-size: 24px;
    line-height: 162%;
    cursor: pointer;
  }
}

::v-deep(.p-tabview) {
  .p-tabview-panels {
    background-color: transparent;
    padding: 0;
  }

  .p-tabview-nav-container {
    background-color: transparent;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: flex-end;
    padding: 0 5px;

    .p-tabview-nav-content {
      width: 100%;
    }

    .p-tabview-nav {
      // width: 166px;
      background-color: transparent;
      height: 26px;
      background-color: transparent;
      color: #49527e;

      li {
        height: 26px;
        width: 166px;
        padding: 0;
        background: #bbc0d8;
        border-radius: 10px 10px 0px 0px;
        margin: 0 2px;
      }

      li:hover {
        border-radius: 10px 10px 0px 0px;
      }

      .p-highlight {
        background-color: #fff;
      }

      li a:focus {
        box-shadow: none;
      }
      li a:hover {
        border-radius: 10px 10px 0px 0px;
      }
      .p-tabview-nav-link {
        height: 26px;
        color: #49527e;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        background-color: red;
        width: 100%;
        background-color: transparent;
        padding: 0 16px 0 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 0;
        margin: 0;
      }
    }
  }
}
</style>
