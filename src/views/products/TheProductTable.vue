<template>
  <div class="zi-panel-products-list">
    <div class="p-d-flex p-jc-between">
      <div class="actions p-d-flex">
        <Search :width="width" searchType="product" searchStore="products" />
        <zi-bulk-edit />
      </div>
      <div @click="createProduct()">
        <div class="addMessage">
          <p class="message">افزودن محصول</p>
          <div class="buttonAdd">
            <i class="svgIcon" :innerHTML="plusIcon"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- selected product message -->
    <div
      class="selectMessage p-d-flex p-jc-center"
      v-if="productsSelections.length > 0"
    >
      <p>
        {{
          productsSelections.length == products.length
            ? `همه‌ی ${products.length} محصول انتخاب شدند.`
            : `${productsSelections.length} محصول از ${products.length} محصول موجود در انبار انتخاب شد .`
        }}
      </p>

      <Button
        v-show="
          productsSelections.length > 0 &&
          productsSelections.length != products.length
        "
        label="انتخاب همه  محصولات"
        class="p-button-text p-mx-1"
        @click="addProductSelections(products)"
      />
      <Button
        v-show="productsSelections.length == products.length"
        label="از انتخاب خارج کردن محصولات"
        class="p-button-text p-mx-1"
        @click="() => (selectedProducts = [])"
      />
    </div>
    <!-- <div v-if="loadingTable" class="table-loading">
      <div class="lds-hourglass"></div>
    </div> -->
    <DataTable
      v-if="loadingProductTable"
      :rows="showPageCount"
      :rowHover="true"
      :paginator="true"
      :scrollable="true"
      :rowsPerPageOptions="[
        showPageCount,
        showPageCount * 2,
        showPageCount * 3,
        showPageCount * 4,
      ]"
      dataKey="id"
      tableClass="zi-table "
      :scrollHeight="`${Math.ceil((showPageCount * 70 + 70) / 16)}rem`"
      responsiveLayout="scroll"
    >
      <ColumnGroup type="header">
        <Row>
          <Column
            :headerClass="[
              'zi-table-header zi-table-selection-all',
              selectedProducts && selectedProducts.length
                ? 'p-highlight'
                : null,
            ]"
            :rowspan="2"
          >
            <template #header>
              <TriStateCheckbox v-model="selectValue" />
            </template>
          </Column>
          <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
          <Column
            headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div class="zi-table-header-has-sub firstSort sortTable">
                <p class="sortCursor">نام محصول</p>
                <p class="zi-table-header-sub">ویژگی</p>
              </div>
            </template>
          </Column>
          <Column
            header="بارکد"
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
          ></Column>
          <Column
            header="موجودی (تعداد)"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <Column
            header="قیمت (تومان)"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <!-- <Column headerClass="zi-table-header zi-table-header-lg" :rowspan="2">
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
              >
                <p class="sortCursor">موجودی (تعداد)</p>
              </div>
            </template>
          </Column>
          <Column
            headerClass="zi-table-header
					zi-table-header-lg"
            :rowspan="2"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
              >
                <p class="sortCursor">قیمت (تومان)</p>
              </div>
            </template>
          </Column> -->
          <Column
            header="فروش آنلاین"
            headerClass="zi-table-header"
            :rowspan="2"
          />
          <Column
            :headerClass="[
              'zi-table-header zi-table-delete-all',
              selectedProducts && selectedProducts.length
                ? 'p-highlight'
                : null,
            ]"
            :rowspan="2"
          >
            <template
              #header
              v-if="selectedProducts && selectedProducts.length > 1"
            >
              <i
                class="svgIcon cursorPointer"
                :innerHTML="trashFill"
                @click="multiDeleteProduct()"
              ></i>
            </template>
          </Column>
        </Row>
        <Row>
          <Column
            header="کل"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
          >
          </Column>
          <Column
            header="آنلاین"
            headerClass="zi-table-header zi-table-header-second-row"
          />
          <Column
            header="حضوری"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
          />
          <Column
            header="آنلاین"
            headerClass="zi-table-header zi-table-header-second-row"
          />
        </Row>
      </ColumnGroup>

      <template #empty>
        <Skeleton
          v-for="i in showPageCount"
          role="row"
          height="70px"
          width="100%"
          class="loadingSkeleton"
        ></Skeleton>
      </template>
    </DataTable>

    <DataTable
      v-else
      :rows="showPageCount"
      :value="products"
      :rowHover="true"
      :paginator="true"
      :scrollable="true"
      :rowsPerPageOptions="[
        showPageCount,
        showPageCount * 2,
        showPageCount * 3,
        showPageCount * 4,
      ]"
      v-model:selection="selectedProducts"
      dataKey="id"
      tableClass="zi-table "
      :scrollHeight="`${Math.ceil((showPageCount * 70 + 70) / 16)}rem`"
      responsiveLayout="scroll"
      :globalFilterFields="['name', 'barcode']"
    >
      <template #empty>
        <p v-show="notValidProductSearch">محصولی با این مشخصات یافت نشد.</p>
        <p
          v-show="
            products.length == 0 &&
            !loadingProductTable &&
            !notValidProductSearch
          "
        >
          محصولی برای نماش وجود ندارد.لطفا از پنل سایت خود،محصولات را تعریف
          کنید.
        </p>
      </template>

      <ColumnGroup type="header">
        <Row>
          <Column
            :headerClass="[
              'zi-table-header zi-table-selection-all',
              selectedProducts && selectedProducts.length
                ? 'p-highlight'
                : null,
            ]"
            :rowspan="2"
          >
            <template #header>
              <TriStateCheckbox v-model="selectValue" />
            </template>
          </Column>
          <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
          <Column
            headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub firstSort sortTable"
                @click="sortProducts(['name'])"
              >
                <p class="sortCursor">نام محصول</p>
                <p class="zi-table-header-sub">ویژگی</p>
              </div>
              <i
                @click="sortProducts(['name'])"
                :innerHTML="sortIcon"
                v-if="nameSort == null"
                class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
              ></i>
              <i
                @click="sortProducts(['name'])"
                v-else-if="!nameSort"
                :innerHTML="sortUp"
                class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
              ></i>
              <i
                @click="sortProducts(['name'])"
                v-else-if="nameSort"
                :innerHTML="sortDown"
                class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
              ></i>
            </template>
          </Column>
          <Column
            header="بارکد"
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
          ></Column>
          <Column
            header="موجودی (تعداد)"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <Column
            header="قیمت (تومان)"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <!-- <Column
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['onlineStock'])"
              >
                <p class="sortCursor">موجودی (تعداد)</p>
                <i
                  v-if="stockSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!stockSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="stockSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column>
          <Column
            headerClass="zi-table-header
					zi-table-header-lg"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['onlinePrice'])"
              >
                <p class="sortCursor">قیمت (تومان)</p>
                <i
                  v-if="priceSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!priceSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="priceSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column> -->
          <Column
            header="فروش آنلاین"
            headerClass="zi-table-header"
            :rowspan="2"
          />
          <Column
            :headerClass="[
              'zi-table-header zi-table-delete-all',
              selectedProducts && selectedProducts.length
                ? 'p-highlight'
                : null,
            ]"
            :rowspan="2"
          >
            <template
              #header
              v-if="selectedProducts && selectedProducts.length > 1"
            >
              <i
                class="svgIcon cursorPointer"
                :innerHTML="trashFill"
                @click="multiDeleteProduct()"
              ></i>
            </template>
          </Column>
        </Row>
        <Row>
          <Column
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['stock'])"
              >
                <p class="sortCursor">کل</p>
                <i
                  v-if="stockSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!stockSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="stockSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column>
          <Column headerClass="zi-table-header zi-table-header-second-row">
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['onlineStock'])"
              >
                <p class="sortCursor">آنلاین</p>
                <i
                  v-if="onlineStockSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!onlineStockSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="onlineStockSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column>
          <Column
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
          >
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['onlinePrice'])"
              >
                <p class="sortCursor">آنلاین</p>
                <i
                  v-if="onlinePriceSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!onlinePriceSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="onlinePriceSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column>
          <Column headerClass="zi-table-header zi-table-header-second-row">
            <template #header>
              <div
                class="zi-table-header-has-sub table-sort p-d-flex p-ai-center"
                @click="sortProducts(['price'])"
              >
                <p class="sortCursor">حضوری</p>
                <i
                  v-if="priceSort == null"
                  :innerHTML="sortIcon"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="!priceSort"
                  :innerHTML="sortUp"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
                <i
                  v-else-if="priceSort"
                  :innerHTML="sortDown"
                  class="p-sortable-column-icon sortCursor svgIcon p-mr-1"
                ></i>
              </div>
            </template>
          </Column>
        </Row>
      </ColumnGroup>
      <Column
        selectionMode="multiple"
        bodyClass="zi-table-body zi-table-selection"
      >
      </Column>

      <Column field="image" bodyClass="zi-table-body" :rowspan="2">
        <template #body="slotProps">
          <div class="zi-table-content">
            <img
              v-if="slotProps.data.images.length == 0"
              src="../../assets/images/usersImg/DefaultImage.jpg"
              class="product-image"
              :alt="slotProps.data.name"
            />
            <img
              v-else
              :src="slotProps.data.images[0].src"
              class="product-image"
              :alt="slotProps.data.name"
            />
          </div>
        </template>
      </Column>
      <Column
        field="name"
        bodyClass="zi-table-body zi-table-body-lg zi-table-justify-flex-start"
        :colspan="2"
        :sortable="true"
      >
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-table-content-has-sub">
              <p>
                {{ slotProps.data.name }}
              </p>
              <span
                class="zi-table-product-prop"
                v-for="(pMeta, key) in slotProps.data.meta[
                  slotProps.data.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue"
                v-if="slotProps.data.type == 'variation'"
                style="display: inline"
              >
                {{ pMeta.name + ":" + pMeta.option }}
                <p
                  v-if="
                    key !=
                    slotProps.data.meta[
                      slotProps.data.meta
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
                </p>
              </span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="barcode" bodyClass="zi-table-body zi-table-body-lg">
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-bracode">
              <Chip :label="slotProps.data.barcode" />
            </div>
          </div>
        </template>
      </Column>
      <Column field="stock" bodyClass="zi-table-body " :sortable="true">
        <template #body="slotProps">
          <div v-if="slotProps.data.infiniteStock">
            <i class="svgIcon" :innerHTML="infinityIcon"></i>
          </div>
          <div v-else>
            <p :class="slotProps.data.stock == 0 ? 'zeroStock' : 'stock'">
              {{ slotProps.data.stock }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="onlineStock" bodyClass="zi-table-body" :sortable="true">
        <template #body="slotProps">
          <div v-if="slotProps.data.infiniteStock">
            <i class="svgIcon" :innerHTML="infinityIcon"></i>
          </div>
          <div v-else>
            <p :class="slotProps.data.onlineStock == 0 ? 'zeroStock' : 'stock'">
              {{ slotProps.data.onlineStock }}
            </p>
          </div>
        </template>
      </Column>
      <Column
        field="onlinePrice"
        bodyClass="zi-table-body"
        bodyStyle="padding-right: 0;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div class="zi-table-content">
            <div
              :class="[
                'zi-table-content-has-sub',
                slotProps.data.onlineDiscount > 0 ? 'zi-has-discount' : null,
              ]"
            >
              <p>
                {{ slotProps.data.onlinePrice.toLocaleString() }}
              </p>
              <p v-if="slotProps.data.onlineDiscount > 0">
                {{ slotProps.data.onlineSalePrice.toLocaleString() }}
              </p>
            </div>
          </div>
        </template>
      </Column>
      <Column
        field="price"
        bodyClass="zi-table-body "
        bodyStyle="padding-right: 0;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div class="zi-table-content">
            <div
              :class="[
                'zi-table-content-has-sub',
                slotProps.data.discount > 0 ? 'zi-has-discount' : null,
              ]"
            >
              <p>
                {{ slotProps.data.price.toLocaleString() }}
              </p>
              <p v-if="slotProps.data.discount > 0">
                {{ slotProps.data.salePrice.toLocaleString() }}
              </p>
            </div>
          </div>
        </template>
      </Column>
      <Column bodyClass="zi-table-body">
        <template #body="slotProps">
          <div class="zi-table-content">
            <InputSwitch
              class="zi-switch-input"
              @click="onlineSell([slotProps.data.id])"
              v-model="slotProps.data.onlineSell"
            />
          </div>
        </template>
      </Column>
      <Column field="delete" bodyClass="zi-table-body zi-table-delete">
        <template #body="slotProps">
          <div class="zi-table-content">
            <i
              class="svgIcon cursorPointer"
              :innerHTML="trashLine"
              @click="deleteProduct([slotProps.data.id])"
            ></i>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Search from "../../components/common/components/Search.vue";
export default {
  data() {
    return {
      width: "38.372093023255813953488372093023%",
      selectedProducts: [],
      selectValue: null,
      showPage: 1,
      showPerPage: 5,
      showPageCount: 5,
      pageProduct: [],
    };
  },
  computed: {
    ...mapState("products", [
      "products",
      "productsSelections",
      "loadingProductTable",
      "notValidProductSearch",
      "stockSort",
      "priceSort",
      "nameSort",
      "onlineStockSort",
      "onlinePriceSort",
    ]),
    ...mapState("iconSVG", [
      "plusIcon",
      "trashLine",
      "infinityIcon",
      "trashFill",
      "sortIcon",
      "sortUp",
      "sortDown",
    ]),
  },
  methods: {
    ...mapMutations("products", [
      "addProductSelections",
      "sortProducts",
      "onlineSell",
      "deleteProduct",
      "multiDeleteProduct",
      "setProducts",
      "setUserTokenForProducts",
      "emptyProductSelection",
      "deSelectProductItem",
    ]),
    ...mapMutations(["changeUserToken"]),
    checkState() {
      let trueSelection = 0;
      this.pageProduct.forEach((product) => {
        this.selectedProducts.find((select) => {
          if (select.id == product.id) {
            trueSelection++;
            return;
          }
        });
      });
      return trueSelection;
    },
    setPageProducts() {
      let start = (this.showPage - 1) * this.showPerPage;
      this.pageProduct = this.products.slice(start, start + this.showPerPage);
      let trueSelection = this.checkState();
      trueSelection == 0
        ? (this.selectValue = null)
        : (this.selectValue = trueSelection == this.showPerPage);
    },
    createProduct() {
      this.$router.push({
        name: "createProduct",
        params: { userId: this.$cookies.get("uzit") },
      });
    },
  },
  watch: {
    selectedProducts: function () {
      this.addProductSelections(this.selectedProducts);
      let trueSelection = this.checkState();
      trueSelection == 0
        ? (this.selectValue = null)
        : (this.selectValue = trueSelection == this.showPerPage);
    },
    selectValue: function (newVal, oldVal) {
      let trueSelection = this.checkState();
      if (
        newVal === false &&
        oldVal === true &&
        trueSelection == this.showPerPage
      ) {
        this.selectValue = null;
      } else if (newVal === null) {
        this.pageProduct.forEach((product) => {
          this.deSelectProductItem(product.id);
        });
      } else if (newVal === true && trueSelection != this.showPerPage) {
        let newSelection = this.selectedProducts;
        this.selectedProducts = newSelection.concat(this.pageProduct);
      }
    },
    showPage: function () {
      this.setPageProducts();
    },
    showPerPage: function () {
      this.setPageProducts();
    },
    productsSelections: function () {
      this.selectedProducts = this.productsSelections;
    },
  },
  created() {
    this.showPerPage =
      Math.floor((window.innerHeight - 300) / 70) < 0
        ? 5
        : Math.floor((window.innerHeight - 300) / 70);
    this.showPageCount =
      Math.floor((window.innerHeight - 300) / 70) < 0
        ? 5
        : Math.floor((window.innerHeight - 300) / 70);
    if (this.products.length === 0) {
      this.setProducts();
    }
  },
  updated() {
    let start = (this.showPage - 1) * this.showPerPage;
    this.pageProduct = this.products.slice(start, start + this.showPerPage);
    document
      .querySelectorAll(".p-paginator-page.p-paginator-element.p-link")
      .forEach((element) => {
        element.addEventListener("click", () => {
          this.showPage = parseInt(element.innerHTML);
        });
      });
    document.querySelectorAll(".table-sort").forEach((element) => {
      element.addEventListener("click", () => {
        this.setPageProducts();
      });
    });
    document
      .querySelector(".p-dropdown-label.p-inputtext")
      .addEventListener("DOMCharacterDataModified", () => {
        this.showPerPage = parseInt(
          document.querySelector(".p-dropdown-label.p-inputtext").innerHTML
        );
      });
  },
  components: { Search },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/app.scss";

.loadingSkeleton {
  border-bottom: 1px solid rgba(196, 196, 196, 0.4);
}

.addMessage {
  height: 32px;
  position: relative;
  background-color: #e1f9fe;
  margin: 16px;
  margin-left: 23px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  .message {
    width: 0;
    visibility: hidden;
    transition: width 0.1s linear;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 150%;
    text-align: right;
    color: #023a46;
  }
}
.buttonAdd {
  width: 32px;
  height: 32px;
  background: #048ba8;
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

.addMessage:hover .message {
  padding-right: 7px;
  width: 114px;
  visibility: visible;
  transition: width 0.5s linear, visibility 0.01s 0.5s ease-in;
}
.zi-panel-products-list {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;

  .title {
    padding: 0.242248062015503875968992248062% 1.937984496124031007751937984496%;
    text-align: right;
    border-bottom: 1px solid #c4c4c466;
  }

  .actions {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.table-loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999999999999999;
  .lds-hourglass {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #7b84b2 transparent #23273c transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
}

::v-deep(.zi-table) {
  border-spacing: 0;
  background-color: #fff;

  .p-sortable-column.p-highlight {
    color: #048ba8;
  }
  .p-sortable-column.p-highlight .p-sortable-column-icon {
    color: #048ba8;
  }

  .p-datatable-thead .p-sortable-column-icon:first-child {
    margin-top: -20px !important;
  }

  .p-datatable-thead {
    display: inline-table !important;
    background-color: #dcdeea !important;
  }

  .p-checkbox .p-checkbox-box {
    border-color: #7b84b2;
    border-radius: 4px;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
    border-color: #7b84b2;
    outline: 0;
    box-shadow: none;
  }

  .p-checkbox .p-checkbox-box.p-highlight {
    border-color: #7b84b2;
    background: #7b84b2;
    outline: 0;
    box-shadow: none;
  }
  .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-focus {
    border-color: #7b84b2;
    outline: 0;
    box-shadow: none;
  }

  .zi-table-header {
    width: 5.5rem;
    padding: 0.5rem 0.75rem;
    text-align: center;
    background-color: #dcdeea !important;
    position: sticky !important;

    .p-column-header-content {
      justify-content: center;
      .p-column-title {
        color: #49527e;
        font-weight: bold;
        font-size: 0.875rem;
        line-height: 150%;
      }
    }

    .zi-table-header-has-sub {
      text-align: right;

      .zi-table-header-sub {
        color: #7b84b2;
        font-size: 0.875rem;
      }
    }
  }
  // .zi-table-selection-all {
  // 	.p-column-header-content {
  // 		justify-content: right;
  // 		margin-right: 16px;
  // 	}
  // }

  .zi-table-body {
    width: 5.5rem;
    padding: 0.2rem;
    display: table-cell;
    color: black;
    text-align: center;
    border: unset;
    border-bottom: 1px solid rgba(196, 196, 196, 0.4);

    .zi-table-content {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        border-radius: 4px;
      }

      .zi-bracode {
        .p-chip {
          padding: 0 0.375rem;
          border: 1px solid #7b84b2;
          border-radius: 0.25rem;
          background: unset;

          .p-chip-text {
            font-weight: 500;
            font-size: 0.75rem;
            line-height: 20px;
            color: #131520;
            margin: unset;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
        }
      }

      img {
        width: 4rem;
        height: 4rem;
      }
    }
    .zi-table-content-has-sub {
      text-align: right;

      .zi-table-product-prop {
        color: #7b84b2;
      }
    }
    .zi-table-content-has-sub.zi-has-discount {
      p:first-child {
        text-decoration: line-through;
        text-decoration-color: #e61f10;
        color: #131520;
      }
      p:last-child {
        color: #036378;
      }
    }
  }

  .zi-direction-ltr {
    direction: ltr;

    .p-sortable-column-icon {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }

  .zi-table-header-lg,
  .zi-table-body-lg {
    width: 11rem;

    .stock {
      color: #131520;
    }

    .zeroStock {
      color: #eb4b00;
    }
  }

  .zi-table-header-second-row {
    width: 4.75rem;
  }

  .zi-table-justify-flex-start {
    .p-column-header-content,
    .zi-table-content {
      justify-content: flex-start;
    }
  }

  .zi-table-selection-all,
  .zi-table-selection {
    width: 4.75rem;
    // padding-right: 10px;
  }

  .zi-table-delete-all,
  .zi-table-delete {
    width: 4.75rem;
    padding-left: 0;
    color: #2563eb;
    font-size: 1.5rem;
  }

  .p-datatable-thead th {
    background-color: #dcdeea;
    transition: all 0.5s;
  }

  .p-datatable-thead .zi-table-selection-all:not(.p-highlight),
  .p-datatable-thead .zi-table-delete-all:not(.p-highlight),
  .p-datatable-tbody tr:not(.p-highlight) .zi-table-body.zi-table-selection,
  .p-datatable-tbody tr:not(.p-highlight) .zi-table-body.zi-table-delete {
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
  }

  .p-datatable-thead:hover th,
  .p-datatable-tbody > tr:not(.p-highlight):hover {
    background-color: #f6f6f7;
    transition: all 0.5s;
  }

  .p-datatable-thead:hover .zi-table-selection-all:not(.p-highlight),
  .p-datatable-thead:hover .zi-table-delete-all:not(.p-highlight),
  .p-datatable-thead:hover .p-sortable-column-icon,
  .p-datatable-tbody tr:not(.p-highlight):hover > .zi-table-selection,
  .p-datatable-tbody tr:not(.p-highlight):hover > .zi-table-delete {
    opacity: 1;
    visibility: visible;
    transition: all 0.5s;
  }

  .p-datatable-thead {
    display: block;

    .p-sortable-column-icon {
      margin: 0;
      margin-right: 5px;
    }
  }

  .p-sortable-column:focus {
    box-shadow: none !important;
  }

  .p-datatable-thead {
    .firstSort ~ .p-sortable-column-icon {
      margin-top: -25px !important;
    }
  }

  .p-datatable-tbody {
    tr {
      display: inline-table !important;
      height: 64px;
    }
    .p-datatable-emptymessage {
      td {
        flex-direction: column;
        justify-content: center;
        padding: 0;
      }
    }
  }
}

// Paginator
::v-deep(.p-paginator) {
  direction: ltr;
  border: unset;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  font-family: "VazirFD" !important;

  .p-paginator-pages .p-paginator-page {
    border-radius: 4px;
    font-family: "VazirFD" !important;
  }

  button,
  .p-dropdown .p-dropdown-label {
    font-family: "VazirFD" !important;
    color: #048ba8;
  }

  .p-paginator-page.p-highlight {
    background: #048ba8;
    border-color: #048ba8;
    color: #ffffff;
  }
}

::v-deep(.p-dropdown-panel) {
  .p-dropdown-items .p-dropdown-item {
    color: #048ba8 !important;
    text-align: center !important;
  }
}

// Switch input
.zi-switch-input {
  width: 1.5rem;
  height: 1rem;
}
::v-deep(.zi-switch-input.p-inputswitch) {
  .p-inputswitch-slider {
    border: solid 0.125rem #048ba8;
    background: transparent;
  }
  .p-inputswitch-slider:before {
    background: transparent;
    border: solid 0.125rem #048ba8;
    width: 0.75rem;
    height: 0.75rem;
    top: 0.4rem;
    left: -0.1rem;
    margin-top: -0.5rem;
    border-radius: 50%;
    transition-duration: 0.2s;
  }
  .p-inputswitch-slider:hover {
    background: transparent !important;
    border: solid 0.125rem #048ba8;
  }

  .p-inputswitch-slider:focus {
    background: transparent;
    border: solid 0.125rem #6c6c6c;
  }
}
::v-deep(.zi-switch-input.p-inputswitch-checked) {
  .p-inputswitch-slider {
    border-color: #048ba8;
    background: #048ba8;
  }
  .p-inputswitch-slider:hover {
    background: #048ba8 !important;
    border-color: #048ba8;
  }
  .p-inputswitch-slider:before {
    left: 1.3rem;
    transform: translateX(-95%) scale(0.8);
    background: #fff;
    border-color: #fff;
  }
}
::v-deep(.zi-switch-input.p-focus) {
  .p-inputswitch-slider {
    box-shadow: none;
  }
}

.sortCursor {
  cursor: pointer;
  color: #49527e;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 150%;
}

.selectMessage {
  p {
    color: #000;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 130%;
  }
  .p-button-text {
    color: #2c6ecb;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 130%;
  }
  .p-button-text:hover {
    background: transparent;
  }

  .p-button-text:focus {
    border: none;
    box-shadow: none;
  }
}
</style>
