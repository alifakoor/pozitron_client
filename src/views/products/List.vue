<template>
    <div class="zi-panel-products-list">
        <div class="title">
            <p>انبار محصولات</p>
        </div>
        <div class="actions p-d-flex">
            <zi-search :width="width"/>
            <zi-bulk-edit />
        </div>
            <DataTable
                :rows="5"
                :value="cars"
                :rowHover="true"
                :paginator="true"
                :scrollable="true"
                :rowsPerPageOptions="[5, 10, 15, 20]"
                v-model:selection="selectedProducts"
                dataKey="id"
                tableClass="zi-table"
                scrollHeight="26.5625rem"
                responsiveLayout="scroll"
            >
                <ColumnGroup type="header">
                    <Row>
                        <Column
                            selectionMode="multiple"
                            :headerClass="[
                                'zi-table-header zi-table-selection-all',
                                selectedProducts && selectedProducts.length ? 'p-highlight' : null
                            ]"
                            :rowspan="2"
                        ></Column>
                        <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
                        <Column headerClass="zi-table-header zi-table-header-lg zi-table-justify-flex-start" :rowspan="2" :colspan="2" :sortable="true">
                            <template #header>
                                <div class="zi-table-header-has-sub">
                                    <p>نام محصول</p>
                                    <p class="zi-table-header-sub">ویژگی</p>
                                </div>
                            </template>
                        </Column>
                        <Column header="بارکد" headerClass="zi-table-header zi-table-header-lg" :rowspan="2"></Column>
                        <Column header="موجودی (تعداد)" headerClass="zi-table-header zi-table-header-lg" :colspan="2" />
                        <Column header="قیمت (تومان)" headerClass="zi-table-header zi-table-header-lg" :colspan="2" />
                        <Column header="فروش آنلاین" headerClass="zi-table-header" :rowspan="2" />
                        <Column 
                            :headerClass="[
                                'zi-table-header zi-table-delete-all',
                                selectedProducts && selectedProducts.length ? 'p-highlight' : null
                            ]"
                            :rowspan="2"
                        >
                            <template #header v-if="selectedProducts && selectedProducts.length > 1">
                                <i class="ri-delete-bin-7-line"></i>
                            </template>
                        </Column>
                    </Row>
                    <Row>
                        <Column header="کل" headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr"  :sortable="true">
                            
                        </Column>
                        <Column header="آنلاین" headerClass="zi-table-header zi-table-header-second-row"  :sortable="true"/>
                        <Column header="حضوری" headerClass="zi-table-header zi-table-header-second-row zi-direction-ltr" :sortable="true"/> 
                        <Column header="آنلاین" headerClass="zi-table-header zi-table-header-second-row"  :sortable="true"/>
                    </Row>
                </ColumnGroup>
                <Column selectionMode="multiple" bodyClass="zi-table-body zi-table-selection"></Column>
                <Column field="image" bodyClass="zi-table-body" :rowspan="2">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <img :src="slotProps.data.image" class="product-image" :alt="slotProps.data.title"/>
                        </div>
                    </template>
                </Column>
                <Column field="title" bodyClass="zi-table-body zi-table-body-lg zi-table-justify-flex-start" :colspan="2">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <div class="zi-table-content-has-sub">
                                <p>{{ slotProps.data.title }}</p>
                                <p class="zi-table-product-prop">{{ slotProps.data.prop }}</p>
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
                <Column field="generalStock" bodyClass="zi-table-body">
                    <template #body="slotProps">
                        <div v-if="slotProps.data.stockStatus === 'infinity'">
                            <p>نامحدود</p>
                        </div>
                        <div v-else>
                            <p>{{ slotProps.data.generalStock }}</p>
                        </div>
                    </template>
                </Column>
                <Column field="onlineStock" bodyClass="zi-table-body"></Column>
                <Column field="regularPrice" bodyClass="zi-table-body" bodyStyle="padding-right: 0;">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <div
                            :class="[
                                'zi-table-content-has-sub',
                                slotProps.data.regularDiscount ? 'zi-has-discount' : null
                            ]">
                                <p>{{ slotProps.data.regularPrice.toLocaleString() }}</p>
                                <p v-if="slotProps.data.regularDiscount">
                                    {{ slotProps.data.regularPrice.toLocaleString() }}
                                    <Tag :value="`${slotProps.data.regularDiscount}%`"></Tag>
                                </p>
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="onlinePrice" bodyClass="zi-table-body" bodyStyle="padding-right: 0;">
                    <template #body="slotProps">
                        <div
                            :class="[
                                'zi-table-content-has-sub',
                                slotProps.data.onlineDiscount ? 'zi-has-discount' : null
                            ]">
                                <p>{{ slotProps.data.onlinePrice.toLocaleString() }}</p>
                                <p v-if="slotProps.data.onlineDiscount">
                                    {{ slotProps.data.onlinePrice.toLocaleString() }}
                                    <Tag :value="`${slotProps.data.onlineDiscount}%`"></Tag>
                                </p>
                            </div>
                    </template>
                </Column>
                <Column field="onlineSell" bodyClass="zi-table-body">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <InputSwitch v-model="slotProps.data.onlineSell" class="zi-switch-input" />
                        </div>
                    </template>
                </Column>
                <Column field="delete" bodyClass="zi-table-body zi-table-delete">
                    <template #body>
                        <div class="zi-table-content">
                            <i class="ri-delete-bin-7-line"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>
    </div>
</template>

<script>
export default {
    data () {
        return {
            width: "38.372093023255813953488372093023%",
            selectedProducts: null,
            cars: [
                    {
                        "id": 1,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345abcdfgd",
                        "stockStatus": "infinity",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 2,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونمای سفید سیاه",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 3,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 4,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 5,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 6,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345abcdfgd",
                        "stockStatus": "infinity",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 7,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونمای سفید سیاه",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 8,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 9,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    },
                    {
                        "id": 10,
                        "image": "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
                        "title": "آگلونما",
                        "prop": "سفید",
                        "barcode": "12345",
                        "generalStock": 20,
                        "onlineStock": 15,
                        "regularPrice": 55000,
                        "regularDiscount": 30,
                        "onlinePrice" : 45000,
                        "onlineDiscount": 20,
                        "onlineSell": true 
                    }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

    .zi-panel-products-list {
        width: 100%;
        height: 100%;
        background-color: #ffffff;

        .title {
            padding: 0.242248062015503875968992248062% 1.937984496124031007751937984496%;
            text-align: right;
            border-bottom: 1px solid #C4C4C466;
        }

        .actions {
            padding-top: 3.003875968992248062015503875969%;
            padding-bottom: 4.554263565891472868217054263566%;
        }
    }

    ::v-deep(.zi-table) {
        border-spacing: 0;

        .zi-table-header {
            width: 5.5rem;
            padding: 0.04rem .75rem;
            text-align: center;
            background: white;

            .p-column-header-content{
                justify-content: center;
            }

            .zi-table-header-has-sub {
                text-align: right;

                .zi-table-header-sub {
                    color: #B4B4B4;
                }
            }
        }
 
        .zi-table-body {
            width: 5.5rem;
            padding: 0.75rem;
            display: table-cell;
            color: black;
            text-align: center;
            border: unset;

            .zi-table-content {
                display: flex;
                justify-content: center;
                align-items: center;
                
                .zi-bracode {
                    .p-chip {
                        padding: 0 .375rem;
                        border: 1px solid #ced4da;
                        border-radius: .25rem;
                        background: unset;

                        .p-chip-text {
                            margin: unset;
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        }
                    }
                }

                img {
                    width: 4rem;
                    height: 3rem;
                }
            }
            .zi-table-content-has-sub {
                text-align: right;

                .zi-table-product-prop {
                    color: #B4B4B4;
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
                margin-right: .5rem
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
            color: #2563EB;
            font-size: 1.5rem;
        }

        .p-datatable-thead th {
            background-color: white;
            transition: all .5s;
        }

        .p-datatable-thead .zi-table-selection-all:not(.p-highlight),
        .p-datatable-thead .zi-table-delete-all:not(.p-highlight),
        .p-datatable-thead .p-sortable-column-icon,
        .p-datatable-tbody tr:not(.p-highlight) .zi-table-body.zi-table-selection,
        .p-datatable-tbody tr:not(.p-highlight) .zi-table-body.zi-table-delete {
            opacity: 0;
            visibility: hidden;
            transition: all .5s;
        }

        .p-datatable-thead:hover th,
        .p-datatable-tbody > tr:not(.p-highlight):hover {
            background-color: #F6F6F7;
            transition: all .5s;
        }

        .p-datatable-thead:hover .zi-table-selection-all:not(.p-highlight),
        .p-datatable-thead:hover .zi-table-delete-all:not(.p-highlight),
        .p-datatable-thead:hover .p-sortable-column-icon,
        .p-datatable-tbody tr:not(.p-highlight):hover > .zi-table-selection,
        .p-datatable-tbody tr:not(.p-highlight):hover > .zi-table-delete {
            opacity: 1;
            visibility: visible;
            transition: all .5s;
        }

        .p-datatable-thead {
            display: block;

            .p-sortable-column-icon {
                margin: 0;
            }
        }

        .p-datatable-tbody {
            tr {
                display: table-row;
            }
        }
    }

    // Table container - hide scrollbar
    ::v-deep(.p-datatable-wrapper) {
        &::-webkit-scrollbar {
            display: none;
        }
    }

    // Paginator
    ::v-deep(.p-paginator) {
        direction: ltr;
        border: unset;

        button,
        .p-dropdown .p-dropdown-label {
            font-family: Vazir;
        }

        .p-paginator-page.p-highlight {
            background: #2563eb;
            border-color: #2563eb;
            color: #ffffff;
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
            top: 0.35rem;
            left: -0.1rem;
            margin-top: -0.45rem;
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
            border-color: #2563eb;
            background: #2563eb;
        }
        .p-inputswitch-slider:hover {
            background: #2563eb !important;
            border-color: #2563eb;
        }
        .p-inputswitch-slider:before {
            left: 1.25rem;
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
