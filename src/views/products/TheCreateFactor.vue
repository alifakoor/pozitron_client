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
    <div class="addNewFactor" v-if="factors.length == 0">
      <button @click="addFactor()">
        <i class="ri-checkbox-circle-line p-mx-1"></i>افزودن فاکتور جدید
      </button>
    </div>
    <div
      v-else
      class="p-col-12 p-lg-8 p-d-flex p-flex-column p-ai-center p-jc-center factorDataBox"
    >
      <header class="headerFactor p-col-12">
        <TabView v-model:activeIndex="active" class="tabview-custom">
          <TabPanel v-for="(factor, index) in factors" :key="index">
            <template v-if="index === factors.length - 1" #header>
              <span v-if="factor.customerData.customerName">{{
                factor.customerData.customerName
              }}</span>
              <span v-else-if="factor.id != null">{{ factor.id }}</span>
              <i class="pi pi-times" @click="removerFactor(index)"></i>
              <i
                class="pi pi-plus"
                v-tooltip.bottom="{
                  value: 'فاکتور جدید',
                  class: 'customizeTootip',
                }"
                @click="addFactor()"
              ></i>
            </template>
            <template v-else #header>
              <span v-if="factor.customerData.customerName">{{
                factor.customerData.customerName
              }}</span>
              <span v-else-if="factor.id != null">{{ factor.id }}</span>
              <i class="pi pi-times" @click="removerFactor(index)"></i>
            </template>
            <div
              class="p-col-12 p-d-flex p-flex-column p-flex-md-row p-ai-start p-jc-center p-px-0"
            >
              <TheFactorCart
                :selectedFactorProducts="factor.selectedFactorProducts"
                @changeCountProduct="changeCountProduct"
                @addExtraDataToFactor="addExtraDataToFactor"
                :factorPrice="factor.discountPrice"
              ></TheFactorCart>
              <TheCustomerData
                @addDataToFactor="addDataToFactor"
                :factorIndex="active"
              ></TheCustomerData>
            </div>
          </TabPanel>
        </TabView>
      </header>
    </div>
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
    ...mapMutations([
      "addProductToFactor",
      "chageFactorIndex",
      "removeAnFactor",
    ]),
    // add new empty factor
    addFactor() {
      this.factors.push({
        id: null,
        customerData: {},
        selectedFactorProducts: [],
        extraData: {},
        price: null,
        discountPrice: null,
      });
    },
    // change count of selectedProduct in factor
    changeCountProduct(data) {
      let remove = null;
      this.factors[this.active].selectedFactorProducts.map((product, index) => {
        if (product.data.id == data.id) {
          product.count += data.count;
          product.count == 0 ? (remove = index) : "";
          product.discount > 0
            ? (this.factors[this.active].price +=
                data.count * product.data.salePrice)
            : (this.factors[this.active].price +=
                data.count * product.data.price);
          product.discountPrice = product.price;
        }
      });
      remove !== null
        ? this.factors[this.active].selectedFactorProducts.splice(remove, 1)
        : "";
    },
    // add a product to factor
    addProductToFactors(dataFactor) {
      let exist = null;
      this.factors[this.active].selectedFactorProducts.forEach(
        (product, index) => {
          if (product.data.id == dataFactor.product.id) {
            exist = index;
          }
        }
      );
      dataFactor.discount > 0
        ? (this.factors[this.active].price += dataFactor.product.salePrice)
        : (this.factors[this.active].price += dataFactor.product.price);
      this.factors[this.active].discountPrice = this.factors[this.active].price;
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
    // add customer data to factor
    addDataToFactor(customerData) {
      this.factors[customerData.index].customerData[customerData.data.name] =
        customerData.data.inValue;
      this.updateOnHoldFactor();
    },
    // add extra data to factor
    addExtraDataToFactor(extraData) {
      for (let newextra in extraData) {
        if (extraData[newextra] != "") {
          this.factors[this.active].extraData[newextra] = extraData[newextra];
        } else {
          delete this.factors[this.active].extraData[newextra];
        }
      }
      this.factors[this.active].discountPrice = this.factors[this.active].price;
      for (let extra in this.factors[this.active].extraData) {
        if (extra === "discount") {
          this.factors[this.active].discountPrice =
            this.factors[this.active].discountPrice -
            this.factors[this.active].price *
              (parseInt(this.factors[this.active].extraData[extra]) / 100);
          console.log(this.factors[this.active].discountPrice + "dd");
        } else {
          this.factors[this.active].discountPrice =
            this.factors[this.active].discountPrice +
            parseInt(this.factors[this.active].extraData[extra]);
          console.log(this.factors[this.active].discountPrice + "ndd");
        }
      }
      this.updateOnHoldFactor();
    },
    // sync factors variable of component with vuex
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
    // remove an factor
    removerFactor(index) {
      this.active > 0 ? this.active-- : "";
      this.factors.splice(index, 1);
      this.removeAnFactor(index);
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
      left: 0;
      transform: translateX(-150%);
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
    display: grid;
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
      overflow: visible;
      display: flex;
      width: 95%;

      li {
        height: 26px;
        width: 166px;
        max-width: 166px;
        min-width: 20px;
        padding: 0;
        background: #bbc0d8;
        border-radius: 10px 10px 0px 0px;
        margin: 0 2px;
        overflow: visible;
      }

      li:hover {
        border-radius: 10px 10px 0px 0px;
      }

      .p-highlight {
        background-color: #fff;
        min-width: 166px;
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
        overflow: visible;
      }
    }
  }
}
</style>
