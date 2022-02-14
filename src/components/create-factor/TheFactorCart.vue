<template>
  <div
    class="generalWrapper p-mt-2 p-col-12 p-m-0 p-pr-md-0 p-md-7"
    style="min-height: 584px"
  >
    <div
      class="p-d-flex p-flex-column p-jc-start p-ai-start generalBoxWrapper p-mr-md-0"
      style="min-height: 584px"
    >
      <div class="p-px-3 p-py-2 headerBox">
        <p>سبد خرید</p>
        <div class="p-d-flex p-ai-center p-jc-center">
          <div class="p-d-flex p-ai-center p-jc-center p-ml-4">
            <p
              class="extraDataText"
              v-show="extraData.extraPayment && extraData.extraPayment != ''"
              v-tooltip.bottom="{
                value: `تومان${extraData.extraPayment}`,
                class: 'customizeTootip',
              }"
            >
              <i
                class="ri-close-circle-line"
                @click="$emit('modalHandle')"
                style="cursor: pointer"
              ></i>
              اضافات
            </p>
            <p
              class="extraDataText"
              v-show="extraData.shiping && extraData.shiping != ''"
              v-tooltip.bottom="{
                value: `تومان${extraData.shiping}`,
                class: 'customizeTootip',
              }"
            >
              <i
                class="ri-close-circle-line"
                @click="$emit('modalHandle')"
                style="cursor: pointer"
              ></i>
              حمل‌و‌نقل
            </p>
            <p
              class="extraDataText"
              v-show="extraData.discount && extraData.discount != ''"
              v-tooltip.bottom="{
                value: `درصد${extraData.discount}`,
                class: 'customizeTootip',
              }"
            >
              <i
                class="ri-close-circle-line"
                @click="$emit('modalHandle')"
                style="cursor: pointer"
              ></i>
              تخفیف
            </p>
          </div>
          <i
            class="pi pi-ellipsis-v"
            @click="
              () => {
                showExtraDetail =
                  !showExtraDetail && selectedFactorProducts.length > 0;
              }
            "
          ></i>
        </div>

        <div
          class="extraDataBox"
          :class="showExtraDetail ? 'p-d-flex' : 'p-d-none'"
        >
          <InputHasIcon
            iconClass="ri-percent-line"
            inputText="تخفیف"
            InPlaceholder="درصد"
            inType="number"
            inputName="discount"
            InGrid="p-col-12"
            InHeight="32px"
            :MaxValue="100"
            @changeInputValue="setExtraData"
          ></InputHasIcon>
          <InputHasInfo
            inputText="حمل و نقل"
            InGrid="p-col-12"
            InHeight="32px"
            inputName="shiping"
            InPlaceholder="تومان"
            @changeInputValue="setExtraData"
          ></InputHasInfo>
          <InputHasInfo
            inputText="اضافات"
            InGrid="p-col-12"
            InHeight="32px"
            inputName="extraPayment"
            InPlaceholder="تومان"
            @changeInputValue="setExtraData"
          ></InputHasInfo>
          <div class="setChangeBtn" @click="addExtraDataTofactor">
            <i class="ri-checkbox-circle-line"></i>
            <p>اعمال</p>
          </div>
        </div>
      </div>

      <Divider class="p-m-0 p-p-0" type="solid" />
      <div class="productsList">
        <div class="productBox" v-for="product in selectedFactorProducts">
          <div class="productImg">
            <img
              v-if="product.data.images[0]"
              :src="product.data.images[0].src"
              :alt="product.data.name"
            />
            <img
              v-else
              src="../../assets/images/usersImg/DefaultImage.jpg"
              class="product-image"
              :alt="product.data.name"
            />
          </div>
          <div class="productData">
            <div class="productName">
              <p class="name">{{ product.data.name }}</p>
              <p
                class="feature"
                v-for="(pMeta, key) in product.data.meta[
                  product.data.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue"
                v-if="product.data.type == 'variation'"
                style="display: inline"
              >
                (
                {{ pMeta.name + ":" + pMeta.option }}
                <span
                  v-if="
                    key !=
                    product.data.meta[
                      product.data.meta
                        .map(function (e) {
                          return e.metaKey;
                        })
                        .indexOf('attributes')
                    ].metaValue.length -
                      1
                  "
                  style="display: inline"
                >
                  {{ "/" }}
                </span>
                )
              </p>
            </div>
            <div class="productPrice">
              <p v-if="product.data.discount > 0" class="price">
                {{ product.data.salePrice.toLocaleString() }} تومان
              </p>
              <p :class="product.data.discount > 0 ? 'delPrice' : 'price'">
                {{ product.data.price.toLocaleString() }} تومان
              </p>
            </div>
            <div class="counting">
              <i
                class="pi pi-plus"
                @click="
                  $emit('changeCountProduct', {
                    id: product.data.id,
                    count: +1,
                  })
                "
              ></i>
              <p>{{ product.count }}</p>
              <i
                v-if="product.count == 1"
                class="fa fa-trash"
                @click="
                  $emit('changeCountProduct', {
                    id: product.data.id,
                    count: -1,
                  })
                "
              ></i>
              <i
                v-else
                class="pi pi-minus"
                @click="
                  $emit('changeCountProduct', {
                    id: product.data.id,
                    count: -1,
                  })
                "
              ></i>
            </div>
          </div>
        </div>
      </div>

      <div
        class="factorPriceBox"
        :class="selectedFactorProducts.length > 0 ? 'p-d-flex' : 'p-d-none'"
      >
        <p class="factorPrice">مبلغ قابل پرداخت :{{ factorPrice }} تومان</p>
        <button class="recordFactor" @click="addChangestoFactor()">
          <p>ادامه و پرداخت</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
  props: ["selectedFactorProducts", "factorPrice"],
  emits: ["changeCountProduct", "addExtraDataToFactor"],
  data() {
    return {
      showExtraDetail: false,
      extraData: {},
    };
  },
  methods: {
    setExtraData(data) {
      this.extraData[data.name] = data.inValue;
    },
    addExtraDataTofactor() {
      this.$emit("addExtraDataToFactor", this.extraData);
      this.showExtraDetail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.productsList {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 0px;
  width: 100%;
  max-height: 338px;
  .productBox {
    display: flex;
    align-items: center;
    padding: 0px 0px 16px 0px;
    width: 416px;
    height: 112px;
    margin: 16px 0px;
    border-bottom: 0.5px solid #b7b7b7;
    .productImg {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0px;
      width: 80px;
      height: 80px;
      border-radius: 8px;
      margin: 0px 12px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .productData {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      padding: 0px;
      width: 272px;
      height: 96px;
      margin: 0px 12px;
      .productName {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0px;
        width: 272px;
        height: 25px;
        .name,
        .feature {
          position: static;
          height: 25px;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          font-weight: 400;
          line-height: 25px;
          text-align: right;
          color: #363d5d;
        }
        .feature {
          font-size: 14px;
          margin: 0px 4px 0px 0px;
          color: #7b84b2;
        }
      }

      .productPrice {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0px 0px 0px 47px;
        width: 272px;
        height: 25px;
        margin: 8px 0px;
        .delPrice,
        .price {
          width: 79px;
          height: 25px;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 25px;
          text-align: right;
          letter-spacing: -0.32px;
          color: #363d5d;
          margin: 0 0 0 16px;
        }
        .delPrice {
          color: #7b84b2;
          text-decoration: line-through;
          text-decoration-color: #eb4b00;
          margin: 0 16px 0 0;
        }
      }

      .counting {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0px;
        width: 272px;
        height: 30px;
        margin: 8px 0px;
        p {
          font-style: normal;
          font-weight: 900;
          font-size: 12.6px;
          line-height: 17px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: -0.224px;
          color: #000000;
          margin: 0px 30px;
        }

        .pi-plus,
        .pi-minus {
          width: 30px;
          height: 30px;
          background: #23273c;
          border-radius: 2.52px;
          color: #fff;
          display: flex;
          font-size: 16px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .fa-trash {
          color: #7b84b2;
          font-size: 23px;
          cursor: pointer;
        }
      }
    }
  }
}

.generalWrapper {
  direction: rtl;
}
.generalBoxWrapper {
  margin: 0px 10px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 8px;
  position: relative;
  > .headerBox {
    width: 100%;
    background: #dcdeea;
    border-radius: 8px 8px 0px 0px;
    color: #49527e;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    i {
      cursor: pointer;
    }

    .extraDataText {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 4px 0px 8px;
      width: 70px;
      height: 20px;
      background: #5c679e;
      border-radius: 4px;
      margin: 0px 4px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      line-height: 150%;
      i {
        margin-left: 2px;
      }
    }
    .extraDataBox {
      position: absolute;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      width: 152px;
      height: 244px;
      left: 35px;
      top: 35%;
      background: #ffffff;
      box-shadow: 0px 0px 9.55556px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      transition: all 0.5s;
      z-index: 99999999999;
      > div {
        margin: 8px 0px;
      }
      .setChangeBtn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        width: 71px;
        height: 32px;
        background: #048ba8;
        border-radius: 4px;
        color: #fff;
        i {
          margin-left: 4px;
        }
      }
    }
  }
  .p-divider {
    width: 100%;
    border: 1px solid #e1e3e5;
    background: #e1e3e5;
  }
}

.factorPriceBox {
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  bottom: 2.74%;
  .factorPrice {
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 25px;
    text-align: right;
    color: #49527e;
    width: 100%;
    text-align: right;
    padding-right: 12%;
  }
  .recordFactor {
    cursor: pointer;
    width: 80%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #048ba8;
    border-radius: 5px;
    outline: 0;
    border: 0;
    text-align: center;
    p {
      text-align: center;
      letter-spacing: -0.32px;
      color: #ffffff;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
    }
  }
}
</style>
