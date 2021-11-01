<template>
    <div class="zi-panel-products-list">
        <div class="title">
            <p>انبار محصولات</p>
        </div>
        <div class="actions p-d-flex">
            <zi-search :width="width"/>
            <zi-bulk-edit />
        </div>
        <div class="table">
            <DataTable :value="cars" responsiveLayout="scroll">
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" headerStyle="text-align: center;" bodyStyle="text-align: center;">
                    <!-- <template v-if="col.field === 'image'">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="product-image" />
                    </template> -->
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
            columns: [
                { field: 'image', header: 'عکس' },
                { field: 'title', header: 'نام محصول' },
                { field: 'barcode', header: 'بارکد' },
                { field: 'stock', header: 'موجودی(تعداد)' },
                { field: 'price', header: 'قیمت(تومان)' },
                { field: 'onlineSell', header: 'فروش آنلاین' }
            ],
            cars: [
                    {"image": "Volkswagen", "title": 2012, "barcode": "Orange", "stock": "dsad231ff", "price": 123, "onlineSell": true }
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
</style>
