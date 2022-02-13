<template>
  <div
    class="generalWrapper p-mt-2 p-col-12 p-m-0 p-pr-md-0 p-md-7"
    style="min-height: 584px"
  >
    <div
      class="p-d-flex p-flex-column p-jc-start p-ai-start generalBoxWrapper p-mr-md-0"
      style="min-height: 584px"
    >
      <p class="p-px-3 p-py-2">سبد خرید</p>
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
              <p v-if="product.data.onlineDiscount > 0" class="price">
                {{ product.data.onlineSalePrice.toLocaleString() }} تومان
              </p>
              <p
                :class="product.data.onlineDiscount > 0 ? 'delPrice' : 'price'"
              >
                {{ product.data.onlinePrice.toLocaleString() }} تومان
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
  props: ["selectedFactorProducts"],
  emits: ["changeCountProduct"],
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
  > p {
    width: 100%;
    background: #dcdeea;
    border-radius: 8px 8px 0px 0px;
    color: #49527e;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    text-align: right;
  }
  .p-divider {
    width: 100%;
    border: 1px solid #e1e3e5;
    background: #e1e3e5;
  }
}
</style>
