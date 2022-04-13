<template>
  <Dialog
    v-model:visible="showDetail"
    :style="{
      width: '1040px',
      direction: 'rtl',
    }"
    class="modalBox"
    :modal="true"
  >
    <template #header>
      <div
        class="p-d-flex p-flex-column p-ai-start p-jc-center"
        style="width: 100%"
      >
        <div class="p-d-flex p-jc-between" style="width: 100%">
          <div class="p-d-flex">
            <div class="p-d-flex p-ai-center p-jc-between p-flex-reverse">
              <i
                v-if="src == 'online'"
                class="svgIcon p-d-flex"
                :innerHTML="globalIcon"
              ></i>
              <i v-else class="svgIcon p-d-flex" :innerHTML="offlineICon"></i>
              <p class="factorNum">جزئیات فاکتور 21371#</p>
              <p class="userName">(هدی احمدی)</p>
              <p class="factorStatus">تکمیل شده</p>
            </div>
          </div>
          <div class="p-d-flex p-ai-center">
            <i
              class="svgIcon p-d-flex p-ml-3 p-ai-center"
              :innerHTML="printIcon"
            ></i>
            <Button
              v-if="src != 'online'"
              class="p-button-outlined p-button-secondary p-ml-5"
              label="ویرایش"
              :icon="
                !editLoading
                  ? 'pi pi-check-circle zi-button-icon'
                  : 'pi pi-spin pi-spinner zi-button-icon'
              "
              iconPos="left"
              @click="showEdit()"
            />
          </div>
        </div>
        <div class="p-d-flex p-mr-2">
          <p class="dateStyle">
            {{
              new Date(
                new Date(Factor.createdAt)
                  .toISOString()
                  .slice(0, 19)
                  .split("T")[0]
              )
                .toLocaleDateString("fa-IR")
                .split("/")[2]
            }}
          </p>
          <p>/</p>
          <p class="dateStyle">
            {{
              new Date(
                new Date(Factor.createdAt)
                  .toISOString()
                  .slice(0, 19)
                  .split("T")[0]
              )
                .toLocaleDateString("fa-IR")
                .split("/")[1]
            }}
          </p>
          <p>/</p>
          <p class="dateStyle">
            {{
              new Date(
                new Date(Factor.createdAt)
                  .toISOString()
                  .slice(0, 19)
                  .split("T")[0]
              )
                .toLocaleDateString("fa-IR")
                .split("/")[0]
            }}
          </p>
        </div>
      </div>
    </template>
    <div class="p-d-flex p-ai-start p-jc-between">
      <div class="p-d-flex p-ai-center p-flex-column p-jc-center p-col-7">
        <DataTable
          :rows="4"
          :value="Factor.items"
          :scrollable="true"
          dataKey="id"
          tableClass="zi-table "
          scrollHeight="21rem"
          responsiveLayout="scroll"
          stripedRows
        >
          <template #empty>
            <p v-show="products.length == 0">
              محصولی برای نماش وجود ندارد.لطفا از پنل سایت خود،محصولات را تعریف
              کنید.
            </p>
          </template>

          <ColumnGroup type="header">
            <Row>
              <Column
                header="ردیف"
                :headerClass="['zi-table-header']"
                :rowspan="2"
              />
              <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
              <Column
                header="نام کالا"
                headerClass="zi-table-header zi-table-header-lg table-header-name"
                :rowspan="2"
                :colspan="2"
              />
              <Column
                header="قیمت واحد"
                headerClass="zi-table-header zi-table-header-lg"
                :rowspan="2"
              />
              <Column
                header="تعداد"
                headerClass="zi-table-header"
                :colspan="2"
              />
              <Column
                header="مجموع قیمت"
                headerClass="zi-table-header zi-table-header-lg"
                :colspan="2"
              />
            </Row>
          </ColumnGroup>
          <Column bodyClass="zi-table-body" :rowspan="2">
            <template #body="slotProps">
              <p>{{ slotProps.index + 1 }}</p>
            </template>
          </Column>
          <Column field="image" bodyClass="zi-table-body" :rowspan="2">
            <template #body="slotProps">
              <div class="zi-table-content">
                <img
                  v-if="!slotProps.data.images"
                  src="../../../assets/images/usersImg/DefaultImage.jpg"
                  class="product-image"
                  :alt="slotProps.data.id"
                />
                <img
                  v-else
                  :src="slotProps.data.images[0].src"
                  class="product-image"
                  :alt="slotProps.data.id"
                />
              </div>
            </template>
          </Column>
          <Column
            field="name"
            bodyClass="zi-table-body zi-table-body-lg zi-table-justify-flex-start"
            :colspan="2"
            :rowspan="2"
          >
            <template #body="slotProps">
              <div class="zi-table-content">
                <div class="zi-table-content-has-sub">
                  <p class="factorName">
                    {{ slotProps.data.name }}
                  </p>
                </div>
              </div>
            </template>
          </Column>
          <Column field="price" bodyClass="zi-table-body zi-table-body-lg">
            <template #body="slotProps">
              <div class="zi-table-content">
                <p>{{ slotProps.data.price.toLocaleString() }}</p>
              </div>
            </template>
          </Column>
          <Column field="quantity" bodyClass="zi-table-body " :colspan="2">
            <template #body="slotProps">
              <div class="zi-table-content">
                <p>{{ slotProps.data.quantity }}</p>
              </div>
            </template>
          </Column>
          <Column field="quantity" bodyClass="zi-table-body " :colspan="2">
            <template #body="slotProps">
              <div class="zi-table-content">
                <p>
                  {{
                    (
                      slotProps.data.quantity * slotProps.data.price
                    ).toLocaleString()
                  }}
                </p>
              </div>
            </template>
          </Column>
        </DataTable>
        <div class="tableFooter">
          <div class="footerDetail p-d-flex p-ai-center p-jc-between">
            <p>جمع اقلام</p>
            <p>{{ Factor.totalPrice.toLocaleString() }}</p>
          </div>
          <div class="footerDetail p-d-flex p-ai-center p-jc-between">
            <p>هزینه حمل و نقل</p>
            <p>
              {{ Factor.shippingTotal.toLocaleString() }}
              <span class="redTxt p-mr-1">+</span>
            </p>
          </div>
          <div class="footerDetail p-d-flex p-ai-center p-jc-between">
            <p>تخفیف</p>
            <p>
              {{ Factor.discountTotal.toLocaleString() }}
              <span class="redTxt p-mr-1">-</span>
            </p>
          </div>
          <div class="footerDetailAll p-d-flex p-ai-center p-jc-between">
            <p>مجموع هزینه ها</p>
            <p class="redTxt">
              {{
                (
                  parseFloat(Factor.totalPrice) +
                  parseFloat(Factor.shippingTotal) -
                  parseFloat(Factor.discountTotal)
                ).toLocaleString()
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="p-d-flex p-ai-start p-jc-center p-col-5">
        <div class="card">
          <TabView ref="tabview1" class="tabview-custom" v-if="src == 'online'">
            <TabPanel header="صورت حساب">
              <ul>
                <li>هدی احمدی</li>
                <li>تهران</li>
                <li>تهران</li>
                <li>سعادت آباد-کوی فردوس</li>
                <li>7978 788 0930</li>
                <li>14322662277</li>
                <li>hoda@gmail.com</li>
                <li>لطفا پیش از ارسال هماهنگ شود.</li>
                <li>تولدت مبارک عزیزم</li>
              </ul>
            </TabPanel>
            <TabPanel header="حمل و نقل">
              <ul>
                <li>هدی احمدی</li>
                <li>تهران</li>
                <li>تهران</li>
                <li>سعادت آباد-کوی فردوس</li>
                <li>7978 788 0930</li>
                <li>14322662277</li>
                <li>hoda@gmail.com</li>
                <li>لطفا پیش از ارسال هماهنگ شود.</li>
                <li>تولدت مبارک عزیزم</li>
              </ul>
            </TabPanel>
          </TabView>

          <TabView ref="tabview1" class="tabview-custom" v-else>
            <TabPanel header="اطلاعات مشتری">
              <ul>
                <li>هدی احمدی</li>
                <li>تهران</li>
                <li>تهران</li>
                <li>سعادت آباد-کوی فردوس</li>
                <li>7978 788 0930</li>
                <li>14322662277</li>
                <li>hoda@gmail.com</li>
                <li>لطفا پیش از ارسال هماهنگ شود.</li>
                <li>تولدت مبارک عزیزم</li>
              </ul>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      months: {
        "01": "فروردین",
        "02": "اردیبهشت",
        "03": "خرداد",
        "04": "تیر",
        "05": "مرداد",
        "06": "شهریور",
        "07": "مهر",
        "08": "آبان",
        "09": "آذز",
        10: "دی",
        11: "بهمن",
        12: "اسفند",
      },
    };
  },
  props: {
    Factor: {
      require: true,
    },
    showDetail: {
      require: true,
    },
    src: {
      require: true,
    },
  },
  computed: {
    ...mapState("iconSVG", ["globalIcon", "offlineICon", "printIcon"]),
  },
  methods: {
    // showEdit() {
    //   if (this.selections.length > 0) {
    //     this.editLoading = true;
    //     setTimeout(() => {
    //       this.display = true;
    //       this.editLoading = false;
    //     }, 1500);
    //   }
    // },
  },
  watch: {
    editDisplay: function (newVal) {
      if (!newVal) {
        this.display = false;
        this.sendEdit = false;
        this.onlinePrice = null;
        this.OnlineDiscountPercent = null;
        this.onlineStock = null;
        this.onlineSell = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";

::v-deep(.p-button.p-button-secondary) {
  width: 77px;
  height: 32px;
  border-radius: 4px;
  padding: 8px;
  border: none !important;
  box-shadow: none !important;
  background-color: #048ba8 !important;
  text-align: center;

  .p-button-label {
    font-size: 14px;
    color: #fff;
    line-height: 168%;
  }
}

.dateStyle {
  text-decoration: underline;
}
.factorNum {
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: right;
  color: #048ba8;
  margin: 0px 8px;
}

.userName {
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: right;
  color: #7b84b2;
  margin: 0px 8px;
}

.factorStatus {
  width: 105px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 12px;
  background: #c5dacf;
  border: 1px solid #065143;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0px 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #065143;
}

// ::v-deep(.p-dialog-header) {
//   .p-dialog-header-icon {
//     color: red;
//   }
// }

::v-deep(.zi-table) {
  border-spacing: 0;
  background-color: #fff;
  width: 524px;

  .p-sortable-column.p-highlight {
    color: #048ba8;
  }
  .p-sortable-column.p-highlight .p-sortable-column-icon {
    color: #048ba8;
  }

  .p-datatable-thead {
    display: inline-table !important;
    background-color: #dcdeea !important;
    border-radius: 8px 8px 0px 0px;
  }

  .zi-table-header {
    width: 3rem;
    height: 40px;
    padding: 0.5rem 0.75rem;
    text-align: center;
    background-color: #dcdeea !important;
    position: sticky !important;

    .p-column-header-content {
      justify-content: center;
      .p-column-title {
        color: #363d5d;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        padding: 8px;
      }
    }

    .zi-table-header-has-sub {
      text-align: right;

      .zi-table-header-sub {
        color: #9ba2c5;
      }
    }
  }

  .table-header-name {
    padding-right: 0;
    .p-column-header-content:first-child {
      justify-content: start;
    }
  }
  // .zi-table-selection-all {
  // 	.p-column-header-content {
  // 		justify-content: right;
  // 		margin-right: 16px;
  // 	}
  // }

  .zi-table-body {
    width: 3rem;
    padding: 0.2rem;
    margin: 0 15px;
    display: table-cell;
    color: #49527e;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 171%;
    text-align: right;
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
            font-size: 12px;
            line-height: 20px;
            color: #131520;
            margin: unset;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
    .zi-table-content-has-sub {
      text-align: right;

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
    }
  }

  .zi-table-header-lg,
  .zi-table-body-lg {
    width: 8rem;
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
        justify-content: center;
      }
    }
  }
}

.tableFooter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 544px;
  height: 124px;
  background: #dcdeea;
  border-radius: 0px 0px 8px 8px;
  margin: 24px 0px;
  padding-top: 10px;
  .footerDetail,
  .footerDetailAll {
    width: 100%;
    padding: 0 16px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      display: flex;
      align-items: center;
      text-align: right;
      color: #363d5d;
      margin: 0px 10px;
    }
    .redTxt {
      color: #eb4b00;
      font-size: 16px;
    }
  }
  .footerDetailAll {
    padding: 16px;
    .redTxt {
      padding: 5px 15px 0;
      border-top: solid 1px #eb4b00;
      margin: 0;
    }
  }
}

.p-tabview {
  width: 400px;
  height: 267px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0px;
}

::v-deep(.p-tabview) {
  .p-tabview-nav-container {
    padding: 0px;
    width: 400px;
    height: 42px;
    background: #dcdeea;
    border: solid 1px transparent;
    border-radius: 8px 8px 0px 0px;
    box-sizing: border-box;
    .p-tabview-nav-content {
      width: 100%;
      display: flex;
      justify-content: start;
      height: 42px;
      align-items: center;
      background: #dcdeea;
      border: solid 1px transparent;
      border-radius: 8px 8px 0px 0px;
      .p-tabview-nav {
        background: #dcdeea;
        padding: 0;
        .p-tabview-nav-link {
          background: #dcdeea;
          border-radius: 8px 8px 0px 0px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 150%;
          text-align: right;
          color: #363d5d;
          margin: 0px;
          height: 40px;
        }
        .p-highlight .p-tabview-nav-link {
          border-color: #49527e;
          font-weight: 900;
        }

        li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link {
          background: #dcdeea;
          border-color: transparent;
          color: #363d5d;
        }

        .p-tabview-nav-link:not(.p-disabled):focus {
          outline: 0 none;
          outline-offset: 0;
          box-shadow: none;
        }
      }
    }
  }
  .p-tabview-panels {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 30px 20px 37px;
    width: 400px;
    height: fit-content;
    border: 1px solid #dee2e6;
    box-sizing: border-box;
    border-radius: 0px 0px 8px 8px;
    ul li {
      color: #49527e;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 171%;
      text-align: right;
    }
  }
}
</style>
