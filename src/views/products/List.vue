<template>
    <div class="zi-panel-products-list">
        <div class="title">
            <p>انبار محصولات</p>
        </div>
        <div class="actions p-d-flex">
            <zi-search :width="width"/>
            <zi-bulk-edit />
        </div>
        <div class="table zi-table">
            <DataTable
                :value="cars"
                responsiveLayout="scroll"
                :paginator="true"
                :rows="3"
                :rowsPerPageOptions="[3, 5, 10, 15, 20]"
                
            >
                <ColumnGroup type="header">
                    <Row>
                        <Column header="عکس" headerClass="zi-table-header" :rowspan="2" />
                        <Column headerClass="zi-table-header" :rowspan="2">
                            <template #header>
                                <div class="zi-table-header-has-sub">
                                    <p>نام محصول</p>
                                    <p class="zi-table-header-sub">ویژگی</p>
                                </div>
                            </template>
                        </Column> 
                        <Column header="بارکد" headerClass="zi-table-header" :rowspan="2" /> 
                        <Column header="موجودی (تعداد)" headerClass="zi-table-header" :colspan="2" />
                        <Column header="قیمت (تومان)" headerClass="zi-table-header" :colspan="2" />
                        <Column header="فروش آنلاین" headerClass="zi-table-header" :rowspan="2" />
                    </Row>
                    <Row>
                        <Column header="کل" headerClass="zi-table-header" /> 
                        <Column header="آنلاین" headerClass="zi-table-header" />
                        <Column header="حضوری" headerClass="zi-table-header" /> 
                        <Column header="آنلاین" headerClass="zi-table-header" />
                    </Row>
                </ColumnGroup>
                <Column field="image" bodyClass="zi-table-body" :rowspan="2">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <img :src="slotProps.data.image" class="product-image" :alt="slotProps.data.title"/>
                        </div>
                    </template>
                </Column>
                <Column field="title" bodyClass="zi-table-body">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <div class="zi-table-content-has-sub">
                                <p>{{ slotProps.data.title }}</p>
                                <p class="zi-table-product-prop">{{ slotProps.data.prop }}</p>
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="barcode" bodyClass="zi-table-body">
                    <template #body="slotProps">
                        <div class="zi-table-content">
                            <Chip :label="slotProps.data.barcode" />
                        </div>
                    </template>
                </Column>
                <Column field="generalStock" bodyClass="zi-table-body"></Column>
                <Column field="onlineStock" bodyClass="zi-table-body"></Column>
                <Column field="regularPrice" bodyClass="zi-table-body">
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
                <Column field="onlinePrice" bodyClass="zi-table-body">
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
                            <InputSwitch v-model="slotProps.data.onlineSell" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            width: "40%",
            cars: [
                    {
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
            padding: .25rem 1.25rem;
            text-align: right;
            border-bottom: 1px solid #C4C4C466;
        }

        .actions {
            padding: 1.5rem 0;
        }
    }

    ::v-deep(.zi-table) {
        tr:first-of-type .zi-table-header:first-of-type {
            padding-right: 5rem;
        }

        tr:first-of-type .zi-table-header:last-of-type {
            padding-left: 5rem;
        }

        .zi-table-header {
            padding: 0 .5rem .25rem .5rem;
            background: unset;

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
            color: black;
            text-align: center;
            border: unset;

            .zi-table-content {
                display: flex;
                justify-content: center;
                align-items: center;
                
                img {
                    width: 4rem;
                    height: 3rem;
                }

                .p-chip {
                    padding: 0 .375rem;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                    background: unset;

                    .p-chip-text {
                        margin: unset;
                    }
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

            &:first-of-type {
                padding-right: 5rem;
            }
            &:last-of-type {
                padding-left: 5rem;
            }
        }

        .p-paginator-bottom {
            direction: ltr;
            border: unset;

            button,
            .p-dropdown .p-dropdown-label {
                font-family: Vazir;
            }
        }
    }

</style>
