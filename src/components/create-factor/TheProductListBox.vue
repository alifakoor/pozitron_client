<template>
  <div class="productListBox p-ml-2 p-md-ml-0">
    <header class="boxHead">
      <Search mediaWidth="288px" searchType="factorProduct" />
      <i
        class="ri-equalizer-line"
        @click="
          () => {
            displayFilter = !displayFilter;
          }
        "
      ></i>
      <div v-show="displayFilter" class="filterBox">
        <ul class="listBox">
          <li>
            <label class="switch">
              <input type="checkbox" v-model="showZeroStock" />
              <span class="slider round"></span>
            </label>
            <p>نمایش کالاهای ناموجود</p>
          </li>
          <li>
            <label class="switch">
              <input type="checkbox" v-model="showSelectProduct" />
              <span class="slider round"></span>
            </label>
            <p>فقط نمایش کالاهای منتخب</p>
          </li>
          <li>
            <label class="switch">
              <input
                type="checkbox"
                v-model="showProductAsGrid"
                @click="changeShowProductStyle(0)"
              />
              <span class="slider round"></span>
            </label>
            <p>نمایش کالاها به صورت شبکه‌ای</p>
          </li>
          <li>
            <label class="switch">
              <input
                type="checkbox"
                v-model="showProductAsList"
                @click="changeShowProductStyle(1)"
              />
              <span class="slider round"></span>
            </label>
            <p>نمایش کالاها به صورت لیستی</p>
          </li>
        </ul>
        <div class="changeStatusBtn" @click="addFilter()">
          <i class="ri-checkbox-circle-line"></i>
          <p>اعمال</p>
        </div>
      </div>
    </header>
    <div class="emptyMessage" v-if="notValidFactorSearch">
      <p>محصولی با این مشخصات یافت نشد.</p>
    </div>
    <div v-else-if="GridShow" class="productList">
      <div
        v-if="showProduct"
        v-for="product in showFactorProducts"
        key="product.id"
        class="productGridWrapper"
      >
        <div class="imgBox">
          <i class="pi pi-bookmark-fill"></i>
          <img
            v-if="product.images[0]"
            :src="product.images[0].src"
            :alt="product.name"
          />
          <img
            v-else
            src="../../assets/images/usersImg/DefaultImage.jpg"
            class="product-image"
            :alt="product.name"
          />
        </div>
        <p class="productName">{{ product.name }}</p>
        <div class="p-d-flex p-ai-center p-jc-start featureWrapper">
          <p
            class="productFeature"
            v-for="(pMeta, key) in product.meta[
              product.meta
                .map(function (e) {
                  return e.metaKey;
                })
                .indexOf('attributes')
            ].metaValue"
            v-if="product.type == 'variation'"
            style="display: inline"
          >
            {{ pMeta.name + ":" + pMeta.option }}
          </p>
        </div>

        <p :class="product.onlineDiscount > 0 ? 'delPrice' : 'productPrice'">
          {{ product.onlinePrice.toLocaleString() }}
        </p>
        <p v-if="product.onlineDiscount > 0" class="productPrice">
          {{ product.onlineSalePrice.toLocaleString() }}
        </p>
        <p :class="product.onlineStock > 0 ? 'productStock' : 'outOfStock'">
          موجودی:{{ product.onlineStock }}عدد
        </p>
        <div class="btnWrapper">
          <div
            :class="product.onlineStock > 0 ? 'addPRoduct' : 'notAddProduct'"
            @click="
              $emit('addProductToFactor', {
                product: product,
                customerData: {},
              })
            "
          >
            افزودن
          </div>
          <div class="editBtn">ویرایش</div>
        </div>
      </div>
      <div class="productGridWrapper" v-else v-for="i in gridCount">
        <Skeleton width="100%" height="100%" />
      </div>
    </div>
    <div v-else-if="!GridShow" class="productList">
      <div v-if="showProduct" class="listShow">
        <div class="listHeader">
          <p>عکس</p>
          <div class="nameBox">
            <p>نام کالا</p>
            <p>ویژگی</p>
          </div>
          <p>قیمت</p>
          <p>موجودی</p>
          <p></p>
        </div>
        <div class="listBody">
          <div
            v-for="product in showFactorProducts"
            key="product.id"
            class="productListWrapper"
          >
            <div class="imgBox">
              <i class="pi pi-bookmark-fill"></i>
              <img
                v-if="product.images[0]"
                :src="product.images[0].src"
                :alt="product.name"
              />
              <img
                v-else
                src="../../assets/images/usersImg/DefaultImage.jpg"
                class="product-image"
                :alt="product.name"
              />
            </div>
            <div class="nameBox">
              <p class="productName">{{ product.name }}</p>
              <div class="p-d-flex">
                <p
                  class="productFeature"
                  v-for="(pMeta, key) in product.meta[
                    product.meta
                      .map(function (e) {
                        return e.metaKey;
                      })
                      .indexOf('attributes')
                  ].metaValue"
                  v-if="product.type == 'variation'"
                  style="display: inline"
                >
                  {{ pMeta.name + ":" + pMeta.option }}
                </p>
              </div>
            </div>

            <div class="priceBox">
              <p
                :class="
                  product.onlineDiscount > 0 ? 'delPrice' : 'productPrice'
                "
              >
                {{ product.onlinePrice.toLocaleString() }}
              </p>
              <p v-if="product.onlineDiscount > 0" class="productPrice">
                {{ product.onlineSalePrice.toLocaleString() }}
              </p>
            </div>
            <p :class="product.onlineStock > 0 ? 'productStock' : 'outOfStock'">
              {{ product.onlineStock }}
            </p>
            <div class="btnWrapper">
              <div class="editBtn"><i class="fa fa-edit"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="productListWrapper" v-else v-for="i in listCount">
        <Skeleton width="100%" height="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { defineAsyncComponent } from "vue";
export default {
  emits: ["addProductToFactor"],
  data() {
    return {
      displayFilter: false,
      showZeroStock: true,
      showSelectProduct: false,
      showProductAsGrid: true,
      showProductAsList: false,
      GridShow: true,
      showFactorProducts: [],
      listCount: Math.floor((window.innerHeight - 100) / 60),
      gridCount: Math.floor((window.innerHeight - 100) / 160),
    };
  },
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
  computed: {
    ...mapState(["factorProducts", "notValidFactorSearch"]),
    showProduct: function () {
      return this.factorProducts.length > 0;
    },
  },
  methods: {
    ...mapMutations(["setFactorProduct"]),
    changeShowProductStyle(code) {
      switch (code) {
        case 0:
          this.showProductAsList = !this.showProductAsList;
          break;
        case 1:
          this.showProductAsGrid = !this.showProductAsGrid;
          break;
      }
    },
    addFilter() {
      if (this.showZeroStock) {
        this.showFactorProducts = this.factorProducts;
      } else {
        this.showFactorProducts = this.factorProducts.filter(
          (product) => product.onlineStock != 0
        );
      }
      this.GridShow = this.showProductAsGrid;
      this.displayFilter = false;
    },
  },
  watch: {
    factorProducts: function () {
      this.showFactorProducts = this.factorProducts;
    },
  },
  created() {
    if (this.factorProducts.length === 0) {
      this.setFactorProduct();
    }
  },
};
</script>

<style lang="scss" scoped>
.boxHead {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0px 24px 24px;
  position: relative;
  .ri-equalizer-line {
    font-size: 20px;
    color: #7b84b2;
    cursor: pointer;
  }

  .filterBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    position: absolute;
    width: 251px;
    height: 184px;
    top: 90%;
    left: 10%;
    background: #ffffff;
    box-shadow: 0px 0px 9.56px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    z-index: 999999999999999;
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 24px;
      height: 15px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border: solid 1px #49527e;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 11.5px;
      width: 11.5px;
      left: -1px;
      bottom: 0px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border: solid 0.5px #49527e;
    }

    input:checked + .slider {
      background-color: #49527e;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #49527e;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(10px);
      -ms-transform: translateX(10px);
      transform: translateX(10px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }

    .listBox {
      list-style-type: none;
    }
    .listBox li {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 0px 8px;
      margin: 6px 0px;
      widows: 100%;
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 164%;
        text-align: right;
        color: #5c679e;
        margin: 0px 8px;
      }
    }

    .changeStatusBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      width: 71px;
      height: 32px;
      margin: 0px 0px;
      background: #048ba8;
      border-radius: 4px;
      margin: 4px 0px;
      cursor: pointer;
      p,
      i {
        color: #fff;
        margin: 0px 2px;
        font-size: 14px;
        line-height: 168%;
      }
    }

    .changeStatusBtn:hover {
      background: #036378;
    }
  }
}
.productListBox {
  width: 100%;
  height: calc(100vh - 100px);
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-right: 12px;
  .emptyMessage {
    width: 100%;
    text-align: center;
    padding-top: 50px;
  }

  .productList {
    width: 98%;
    display: grid;
    grid-template-columns: 50% 50%;
    overflow-y: auto;
    .productGridWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      height: 285px;
      left: 20px;
      top: 0px;
      background: #f6f6f7;
      box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
      border-radius: 8px;
      margin: 16px 12px;

      .imgBox {
        width: 100%;
        height: 132px;
        border-radius: 8px 8px 0px 0px;
        position: relative;
        i {
          position: absolute;
          color: #eb4b00;
          font-size: 22px;
          right: 10px;
          top: 0px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px 8px 0px 0px;
        }
      }
      .productName {
        width: 100%;
        padding: 0px 8px 0px 0px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: right;
        color: #363d5d;
        margin: 5px 10px;
      }
      .featureWrapper {
        width: 100%;
      }

      .productFeature {
        padding: 0px 8px 0px 0px;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        text-align: right;
        color: #7b84b2;
        margin: 5px 0px;
      }

      .productPrice,
      .delPrice {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 150%;
        text-align: left;
        color: #363d5d;
        text-decoration: solid;
        width: 100%;
        padding-left: 8px;
      }

      .delPrice {
        color: #7b84b2;
        text-decoration: line-through;
        text-decoration-color: #eb4b00;
      }

      .productStock,
      .outOfStock {
        width: 100%;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: right;
        letter-spacing: -0.32px;
        color: #7b84b2;
        padding-right: 8px;
        margin-top: 5px;
      }

      .outOfStock {
        color: #eb4b00;
      }

      .btnWrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 8px;
        .editBtn {
          width: 38px;
          height: 15px;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #048ba8;
          margin: 0px 0px 0 22px;
          cursor: pointer;
        }

        .addPRoduct,
        .notAddProduct {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2.5px 16px;
          width: 64px;
          height: 20px;
          background: #048ba8;
          border-radius: 2.5px;
          margin: 0px 8px;
          cursor: pointer;
          color: #ffffff;
          font-weight: 900;
          font-size: 12px;
          line-height: 15px;
        }

        .notAddProduct {
          cursor: auto;
          background: #acbbbe;
        }
      }
    }

    .listShow {
      grid-column: 1/3;
      border: 1px solid #dee2e6;
      border-radius: 8px 8px 0px 0px;
    }

    .listHeader {
      width: 100%;
      grid-column: 1/3;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0px 8px;
      height: 48px;
      background: #dcdeea;
      border-radius: 8px 8px 0px 0px;
      margin: 0;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 9999;
      p {
        width: 48px;
        height: 48px;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 150%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: right;
        color: #363d5d;
        margin: 0px 4px;
      }

      .nameBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px;
        width: 96px;
        height: 48px;
        margin: 0px 4px;
        text-align: right;
        font-style: normal;
        font-weight: normal;
        color: #49527e;
        p:first-child {
          font-size: 14px;
          line-height: 171%;
        }
        p:last-child {
          font-size: 12px;
          line-height: 130%;
          color: #7b84b2;
        }
      }
    }

    .listBody {
      grid-column: 1/3;
    }
    .productListWrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      width: 100%;
      height: 56px;
      background: #f6f6f7;
      margin: 16px 0px;
      grid-column: 1/3;

      .imgBox {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        margin: 0px 4px;
        position: relative;
        i {
          position: absolute;
          color: #eb4b00;
          font-size: 12px;
          right: 5px;
          top: 0px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }

      .nameBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0px;
        width: 96px;
        height: 48px;
        margin: 0px 4px;
        .productName {
          width: 100%;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: right;
          color: #363d5d;
        }

        .productFeature {
          width: 100%;
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 150%;
          text-align: right;
          color: #7b84b2;
        }
      }

      .priceBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        padding: 0px;
        width: 56px;
        height: 48px;
        margin: 0px 4px;
        .productPrice,
        .delPrice {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 150%;
          text-align: left;
          color: #363d5d;
          text-decoration: solid;
          width: 100%;
          padding-left: 8px;
        }

        .delPrice {
          color: #7b84b2;
          text-decoration: line-through;
          text-decoration-color: #eb4b00;
        }
      }

      .productStock,
      .outOfStock {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: right;
        letter-spacing: -0.32px;
        color: #7b84b2;
        padding-right: 8px;
        margin: 5px 4px 0 4px;
        width: 48px;
        height: 48px;
      }

      .outOfStock {
        color: #eb4b00;
      }

      .btnWrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        .editBtn {
          width: 38px;
          height: 15px;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #048ba8;
          cursor: pointer;
        }

        .addPRoduct,
        .notAddProduct {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2.5px 16px;
          width: 64px;
          height: 20px;
          background: #048ba8;
          border-radius: 2.5px;
          margin: 0px 8px;
          cursor: pointer;
          color: #ffffff;
          font-weight: 900;
          font-size: 12px;
          line-height: 15px;
        }

        .notAddProduct {
          cursor: auto;
          background: #acbbbe;
        }
      }
    }
  }

  .productList::-webkit-scrollbar {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    width: 4px !important;
  }

  /* Handle */
  .productList::-webkit-scrollbar-thumb {
    background: #5d40f1;
    border-radius: 8px;
    width: 4px;
    height: 34px;
  }

  /* Handle on hover */
  .productList::-webkit-scrollbar-thumb:hover {
    background: #5d40f1;
    border-radius: 8px;
    width: 4px;
    height: 34px;
  }
}
</style>
