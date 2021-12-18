<template>
  <div class="zi-panel-products-list">
    <div class="p-d-flex p-jc-between">
      <div class="actions p-d-flex">
        <zi-search :width="width" />
        <zi-bulk-edit />
      </div>
      <div>
        <div
          class="addMessage"
          v-tooltip.bottom="{
            value: 'این ویژگی به زودی فعال می‌گردد.',
            class: 'myTooltip',
          }"
        >
          <p class="message">افزودن محصول</p>
          <div class="buttonAdd">
            <i class="ri-add-line"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- selected product message -->
    <!-- <div
			class="selectMessage p-d-flex p-jc-center"
			v-if="selections.length > 0"
		>
			<p>
				{{
					selections.length == products.length
						? `همه‌ی ${products.length} محصول انتخاب شدند.`
						: `${selections.length} محصول از ${products.length} محصول انتخاب شد .`
				}}
			</p>

			<Button
				v-show="
					selections.length > 0 &&
					selections.length != products.length
				"
				label="انتخاب همه ی محصولات"
				class="p-button-text p-mx-1"
				@click="addSelections(products)"
			/>
			<Button
				v-show="selections.length == products.length"
				label="از انتخاب خارج کردن محصولات"
				class="p-button-text p-mx-1"
				@click="() => (selectedProducts = [])"
			/>
		</div> -->
    <div v-if="loadingTable" class="table-loading">
      <div class="lds-hourglass"></div>
    </div>
    <DataTable
      :rows="5"
      :value="products"
      :rowHover="true"
      :paginator="true"
      :scrollable="true"
      :rowsPerPageOptions="[5, 10, 15, 20]"
      v-model:selection="selectedProducts"
      dataKey="id"
      tableClass="zi-table "
      scrollHeight="27rem"
      responsiveLayout="scroll"
      :globalFilterFields="['name', 'barcode']"
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
            selectionMode="multiple"
          >
            <!-- <template #header>
							<TriStateCheckbox v-model="value" /> </template
					> -->
          </Column>
          <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
          <Column
            headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start"
            :rowspan="2"
            :colspan="2"
            :sortable="true"
            field="name"
          >
            <template #header>
              <div class="zi-table-header-has-sub firstSort">
                <p>نام محصول</p>
                <p class="zi-table-header-sub">ویژگی</p>
              </div>
            </template>
          </Column>
          <Column
            header="بارکد"
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
          ></Column>
          <!-- <Column
						header="موجودی (تعداد)"
						headerClass="zi-table-header zi-table-header-lg"
						:colspan="2"
					/>
					<Column
						header="قیمت (تومان)"
						headerClass="zi-table-header zi-table-header-lg"
						:colspan="2"
					/> -->
          <Column
            headerClass="zi-table-header zi-table-header-lg"
            :rowspan="2"
            :sortable="true"
            field="onlineStock"
          >
            <template #header>
              <div class="zi-table-header-has-sub">
                <p>موجودی (تعداد)</p>
              </div>
            </template>
          </Column>
          <Column
            headerClass="zi-table-header
					zi-table-header-lg"
            :rowspan="2"
            :sortable="true"
            field="onlinePrice"
          >
            <template #header>
              <div class="zi-table-header-has-sub">
                <p>قیمت (تومان)</p>
              </div>
            </template>
          </Column>
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
              <i class="fa fa-trash" @click="multiDeleteProduct()"></i>
            </template>
          </Column>
        </Row>
        <Row>
          <!-- <Column
						header="کل"
						headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
						:sortable="true"
					>
					</Column>
					<Column
						header="آنلاین"
						headerClass="zi-table-header zi-table-header-second-row"
						:sortable="true"
					/>
					<Column
						header="حضوری"
						headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"
						:sortable="true"
					/> -->
          <!-- <Column
						header="آنلاین"
						headerClass="zi-table-header zi-table-header-second-row"
						:sortable="true"
					/> -->
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
              :src="
                slotProps.data.images == ''
                  ? '../../../../public/images/usersImg/Default Image.jpg'
                  : slotProps.data.images[0].src
              "
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
              <p
                class="zi-table-product-prop"
                v-for="(pMeta,key) in slotProps.data.meta[
                  slotProps.data.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue"
                v-if="slotProps.data.type == 'variation'"
                style="display: inline"
              >
                {{  pMeta.name + ":" + pMeta.option }}
                <p v-if="key != slotProps.data.meta[
                  slotProps.data.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue.length-1" style="display: inline;">{{ "/" }}</p>
              </p>
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
      <Column
        field="onlineStock"
        bodyClass="zi-table-body zi-table-body-lg"
        :sortable="true"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.infiniteStock">
            <i class="fas fa-infinity" style="color: #048ba8"></i>
          </div>
          <div v-else>
            <p>{{ slotProps.data.onlineStock }}</p>
          </div>
        </template>
      </Column>
      <!-- <Column field="onlineStock" bodyClass="zi-table-body"></Column> -->
      <Column
        field="onlinePrice"
        bodyClass="zi-table-body zi-table-body-lg"
        bodyStyle="padding-right: 0;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div class="zi-table-content">
            <div
              :class="[
                'zi-table-content-has-sub',
                slotProps.data.onlineSalePrice > 0 ? 'zi-has-discount' : null,
              ]"
            >
              <p>
                {{ slotProps.data.onlinePrice.toLocaleString() }}
              </p>
              <p v-if="slotProps.data.onlineSalePrice > 0">
                {{ slotProps.data.onlineSalePrice.toLocaleString() }}
              </p>
            </div>
          </div>
        </template>
      </Column>
      <!-- <Column
				field="onlinePrice"
				bodyClass="zi-table-body"
				bodyStyle="padding-right: 0;"
			>
				<template #body="slotProps">
					<div
						:class="[
							'zi-table-content-has-sub',
							slotProps.data.onlineDiscount
								? 'zi-has-discount'
								: null,
						]"
					>
						<p>{{ slotProps.data.onlinePrice.toLocaleString() }}</p>
						<p v-if="slotProps.data.onlineDiscount">
							{{ slotProps.data.onlinePrice.toLocaleString() }}
							<Tag
								:value="`${slotProps.data.onlineDiscount}%`"
							></Tag>
						</p>
					</div>
				</template>
			</Column> -->
      <Column field="onlineSell" bodyClass="zi-table-body">
        <template #body="slotProps">
          <div class="zi-table-content">
            <InputSwitch
              v-model="slotProps.data.onlineSell"
              class="zi-switch-input"
              @click="onlineSell([slotProps.data.id])"
            />
          </div>
        </template>
      </Column>
      <Column field="delete" bodyClass="zi-table-body zi-table-delete">
        <template #body="slotProps">
          <div class="zi-table-content">
            <i
              class="fa fa-trash"
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
export default {
  data() {
    return {
      width: "38.372093023255813953488372093023%",
      selectedProducts: null,
      value: null,
    };
  },
  computed: {
    ...mapState(["products", "selections", "loadingTable"]),
  },
  methods: {
    ...mapMutations([
      "addSelections",
      "sortProducts",
      "onlineSell",
      "deleteProduct",
      "multiDeleteProduct",
      "setProducts",
      "changeUserToken",
    ]),
  },
  watch: {
    selectedProducts: function () {
      this.addSelections(this.selectedProducts);
    },
    selections: function () {
      this.selectedProducts = this.selections;
    },
  },
  created() {
    this.changeUserToken();
    this.setProducts();
  },
};
</script>

<style lang="scss" scoped>
.fa-trash {
  color: #7b84b2;
  font-size: 20px;
  cursor: pointer;
}
.addMessage {
  width: 114px;
  height: 32px;
  position: relative;
  background-color: #e1f9fe;
  margin: 16px;
  margin-left: 23px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding-right: 7px;
  .message {
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
    }

    .zi-table-header-has-sub {
      text-align: right;

      .zi-table-header-sub {
        color: #b4b4b4;
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
    padding: 0.75rem;
    display: table-cell;
    color: black;
    text-align: center;
    border: unset;
    border-bottom: 1px solid rgba(196, 196, 196, 0.4);

    .zi-table-content {
      display: flex;
      justify-content: center;
      align-items: center;

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
        width: 4rem;
        height: 4rem;
      }
    }
    .zi-table-content-has-sub {
      text-align: right;

      .zi-table-product-prop {
        color: #b4b4b4;
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
    width: 11rem;
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
    padding-right: 0;
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
      display: table-row;
      width: 11rem;
    }
  }
}

// Table container - hide scrollbar
// ::v-deep(.p-datatable-wrapper) {
//   &::-webkit-scrollbar {
//     // display: none;
//     // background-color: #23273c;
//   }

//   // &::-webkit-scrollbar-thumb {
//   // 	background: #23273c;
//   // }

//   ::-webkit-scrollbar-thumb {
//     background: blue;
//     border-radius: 10px;
//   }

//   /* Handle on hover */
//   ::-webkit-scrollbar-thumb:hover {
//     background: blue;
//   }
// }

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
</style>
