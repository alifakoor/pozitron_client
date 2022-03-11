<template>
  <div class="zi-panel-products-list">
    <div class="p-d-flex p-jc-between">
      <div class="actions p-d-flex">
        <Search :width="width" searchType="factors" searchStore="factors" />
        <CahangeFactorStatus />
        <showDetail
          :Factor="factors[showDetailFlag]"
          :showDetail="showDetailFlag != null"
        />
      </div>
    </div>
    <!-- selected product message -->
    <div
      class="selectMessage p-d-flex p-jc-center"
      v-if="factorSelections.length > 0"
    >
      <p>
        {{
          factorSelections.length == factors.length
            ? `همه‌ی ${factors.length} محصول انتخاب شدند.`
            : `${factorSelections.length} محصول از ${factors.length} محصول موجود در انبار انتخاب شد .`
        }}
      </p>

      <Button
        v-show="
          factorSelections.length > 0 &&
          factorSelections.length != factors.length
        "
        label="انتخاب همه  محصولات"
        class="p-button-text p-mx-1"
        @click="addFactorSelections(factors)"
      />
      <Button
        v-show="factorSelections.length == factors.length"
        label="از انتخاب خارج کردن محصولات"
        class="p-button-text p-mx-1"
        @click="() => (selectedProducts = [])"
      />
    </div>
    <DataTable
      v-if="loadingFactorTable"
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
          <Column
            header="مرجع فاکتور"
            headerClass="zi-table-header"
            :rowspan="2"
          />
          <Column
            headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div class="zi-table-header-has-sub firstSort sortTable">
                <p class="sortCursor">نام خریدار</p>
                <p class="zi-table-header-sub">شماره فاکتور</p>
              </div>
            </template>
          </Column>
          <Column
            header="وضعیت"
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
          ></Column>
          <Column
            header="زمان ثبت فاکتور"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <Column
            header="زمان ارسال"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />

          <Column
            header="مبلغ فاکتور  (تومان)"
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
              <i class="fa fa-trash" @click="multiDeletesortFactor()"></i>
            </template>
          </Column>
        </Row>
        <Row>
          <Column
            header="تاریخ"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
            :sortable="true"
          >
          </Column>
          <Column
            header="ساعت"
            headerClass="zi-table-header zi-table-header-second-row"
          />
          <Column
            header="تاریخ"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
            :sortable="true"
          />
          <Column
            header="ساعت"
            headerClass="zi-table-header zi-table-header-second-row"
          />
        </Row>
      </ColumnGroup>

      <template #empty>
        <Skeleton
          v-for="i in showPageCount"
          role="row"
          height="65px"
          width="100%"
          class="loadingSkeleton"
        ></Skeleton>
      </template>
    </DataTable>
    <DataTable
      v-else
      :rows="showPageCount"
      :value="factors"
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
        <p v-show="notValidFactorSearch">محصولی با این مشخصات یافت نشد.</p>
        <p
          v-show="
            factors.length == 0 && !loadingFactorTable && !notValidFactorSearch
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
          <Column
            header="مرجع فاکتور"
            headerClass="zi-table-header"
            :rowspan="2"
          />
          <Column
            headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start"
            :rowspan="2"
            :colspan="2"
          >
            <template #header>
              <div class="zi-table-header-has-sub firstSort sortTable">
                <p class="sortCursor">نام خریدار</p>
                <p class="zi-table-header-sub">شماره فاکتور</p>
              </div>
            </template>
          </Column>
          <Column
            header="وضعیت"
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
          ></Column>
          <Column
            header="زمان ثبت فاکتور"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />
          <Column
            header="زمان ارسال"
            headerClass="zi-table-header zi-table-header-lg"
            :colspan="2"
          />

          <Column
            header="مبلغ فاکتور  (تومان)"
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
              <i class="fa fa-trash" @click="multiDeleteFactor()"></i>
            </template>
          </Column>
        </Row>
        <Row>
          <Column
            header="تاریخ"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
            :sortable="true"
          >
          </Column>
          <Column
            header="ساعت"
            headerClass="zi-table-header zi-table-header-second-row"
          />
          <Column
            header="تاریخ"
            headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
            :sortable="true"
          />
          <Column
            header="ساعت"
            headerClass="zi-table-header zi-table-header-second-row"
          />
        </Row>
      </ColumnGroup>
      <Column
        selectionMode="multiple"
        bodyClass="zi-table-body zi-table-selection"
      >
      </Column>
      <Column field="src" bodyClass="zi-table-body" :rowspan="2">
        <template #body="slotProps">
          <div class="zi-table-content">
            <i
              v-if="slotProps.data.src == 'online'"
              class="ri-global-line sourceFactor"
            ></i>
          </div>
        </template>
      </Column>
      <Column
        field="name"
        bodyClass="zi-table-body zi-table-body-lg zi-table-justify-flex-start"
        :colspan="2"
      >
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-table-content-has-sub">
              <p class="factorName" @click="showDetail(slotProps.data.id)">
                {{ slotProps.data.name || "نامشخص" }}
              </p>
              <span class="zi-table-product-prop">
                #{{ slotProps.data.id }}
              </span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="status" bodyClass="zi-table-body zi-table-body-lg">
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-status">
              <Chip
                v-if="slotProps.data.status == 'completed'"
                label="کامل شده"
                class="completed"
              />
              <Chip
                v-if="slotProps.data.status == 'on-hold'"
                label="در انتظار بررسی"
                class="onHold"
              />
              <Chip
                v-if="slotProps.data.status == 'cancelled'"
                label="لغو شده"
                class="cancelled"
              />
              <Chip
                v-if="slotProps.data.status == 'processing'"
                label="در حال انجام"
                class="processing"
              />
              <Chip
                v-if="slotProps.data.status == 'failed'"
                label="ناموفق"
                class="failed"
              />
              <Chip
                v-if="slotProps.data.status == 'refunded'"
                label="مرجوعی"
                class="refunded"
              />
            </div>
          </div>
        </template>
      </Column>
      <Column field="createDate" bodyClass="zi-table-body " :sortable="true">
        <template #body="slotProps">
          <div>
            <p>
              {{
                slotProps.data.createdAt
                  ? new Date(
                      new Date(slotProps.data.createdAt)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[0]
                    ).toLocaleDateString("fa-IR")
                  : "----"
              }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="createTime" bodyClass="zi-table-body " :sortable="true">
        <template #body="slotProps">
          <div>
            <p>
              {{
                slotProps.data.createdAt
                  ? new Date(slotProps.data.createdAt)
                      .toISOString()
                      .slice(0, 19)
                      .split("T")[1]
                  : "----"
              }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="deliveryDate" bodyClass="zi-table-body" :sortable="true">
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-table-content-has-sub">
              <p>
                {{
                  slotProps.data.deliveryDate
                    ? new Date(
                        new Date(slotProps.data.deliveryDate)
                          .toISOString()
                          .slice(0, 19)
                          .split("T")[0]
                      ).toLocaleDateString("fa-IR")
                    : "----"
                }}
              </p>
            </div>
          </div>
        </template>
      </Column>
      <Column field="deliveryTime" bodyClass="zi-table-body" :sortable="true">
        <template #body="slotProps">
          <div class="zi-table-content">
            <div class="zi-table-content-has-sub">
              <p>
                {{
                  slotProps.data.deliveryDate
                    ? new Date(slotProps.data.deliveryDate)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[1]
                    : "----"
                }}
              </p>
            </div>
          </div>
        </template>
      </Column>
      <Column bodyClass="zi-table-body">
        <template #body="slotProps">
          <div class="zi-table-content">
            {{ slotProps.data.totalPrice }}
          </div>
        </template>
      </Column>
      <Column field="delete" bodyClass="zi-table-body zi-table-delete">
        <template #body="slotProps">
          <div class="zi-table-content">
            <i
              class="fa fa-trash"
              @click="deleteFactor([slotProps.data.id])"
            ></i>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      width: "38.372093023255813953488372093023%",
      selectedProducts: [],
      selectValue: null,
      showPage: 1,
      showPerPage: 5,
      pageShowCount: 5,
      pageProduct: [],
      showDetailFlag: null,
    };
  },
  computed: {
    ...mapState("factors", [
      "factors",
      "factorSelections",
      "loadingFactorTable",
      "notValidFactorSearch",
      "stockSort",
      "priceSort",
      "nameSort",
    ]),
  },
  methods: {
    ...mapMutations("factors", [
      "addFactorSelections",
      "sortFactors",
      "onlineSell",
      "deleteFactor",
      "multiDeleteFactor",
      "setFactors",
      "changeUserToken",
      "emptyFactorSelection",
      "deSelectFactorItem",
    ]),
    showDetail(Fid) {
      this.showDetailFlag = Fid;
    },
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
      this.pageProduct = this.factors.slice(start, start + this.showPerPage);
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
      this.addFactorSelections(this.selectedProducts);
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
          this.deSelectFactorItem(product.id);
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
    factorSelections: function () {
      this.selectedProducts = this.factorSelections;
    },
  },
  created() {
    // if (this.products.length === 0) {
    //   this.setProducts();
    // }
    this.setFactors();
    this.showPerPage = Math.floor((window.innerHeight - 250) / 70);
    this.showPageCount = Math.floor((window.innerHeight - 250) / 70);
  },
  updated() {
    let start = (this.showPage - 1) * this.showPerPage;
    this.pageProduct = this.factors.slice(start, start + this.showPerPage);

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
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/app.scss";

.loadingSkeleton {
  border-bottom: 1px solid rgba(196, 196, 196, 0.4);
}

.fa-trash {
  color: #7b84b2;
  font-size: 20px;
  cursor: pointer;
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
    font-size: 12px;
    line-height: 150%;
    text-align: right;
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
        font-size: 14px;
        line-height: 150%;
      }
    }

    .zi-table-header-has-sub {
      text-align: right;

      .zi-table-header-sub {
        color: #9ba2c5;
        font-size: 14px;
      }
    }
  }

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
      .sourceFactor {
        color: #048ba8;
        font-size: 20px;
      }

      .zi-status {
        .p-chip {
          margin: 10px 0px;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 2px 12px;
          width: 105px;
          height: 24px;
          .p-chip-text {
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #065143;
            margin: 3px 0px;
            text-align: center;
            width: 100%;
          }
        }
        .p-chip.completed {
          background: #c5dacf;
          border: 1px solid #065143;
        }
        .p-chip.onHold {
          background: #fff1eb;
          border: 1px solid #eb4b00;
        }
        .p-chip.cancelled {
          background: #dcdeea;
          border: 1px solid #7b84b2;
        }
        .p-chip.processing {
          background: #bfd2ef;
          border: 1px solid #2c6ecb;
        }
        .p-chip.failed {
          background: #ecc2bf;
          border: 1px solid #891a29;
        }
        .p-chip.refunded {
          background: #d2d5d8;
          border: 1px solid #6c6c6c;
        }
      }

      img {
        width: 4rem;
        height: 4rem;
      }
    }
    .zi-table-content-has-sub {
      text-align: center;
      .factorName {
        cursor: pointer;
      }

      .zi-table-product-prop {
        color: #bbc0d8;
      }
    }
    .zi-table-content-has-sub.zi-has-discount {
      p:first-child {
        text-decoration: line-through;
        text-decoration-color: red;
      }
      p:last-child {
        color: #065143;
      }
    }
  }

  .zi-direction-ltr {
    direction: ltr;

    .p-sortable-column-icon {
      margin-left: 0;
      margin-right: 0.5rem;
      font-size: 14px;
      color: #131520;
    }
  }

  .zi-table-header-lg,
  .zi-table-body-lg {
    width: 11rem;
  }

  .zi-table-header-second-row {
    width: 4.75rem;
    border-top: 1px solid #7b84b2 !important;
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

  .p-datatable-thead > tr > th {
    border: none;
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
      margin-top: -25px;
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
    border: solid 0.125rem #6c6c6c;
    background: transparent;
  }
  .p-inputswitch-slider:before {
    background: transparent;
    border: solid 0.125rem #6c6c6c;
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
    border: solid 0.125rem #6c6c6c;
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
  color: #49527e;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
}
</style>
