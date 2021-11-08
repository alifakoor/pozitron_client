<template>
    <div class="zi-bulk-edit">
        <Button class="p-button-outlined p-button-secondary" label="ویرایش" icon="ri-edit-box-line zi-button-icon" iconPos="left"/>
        <Dialog header="Header" :visible="display" >
            Content
        </Dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            display: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .zi-bulk-edit {
        width: 6.201550387596899224806201550388%;

        ::v-deep(.p-button){
            width: 100%;
            padding: 14.84375% 0;
            border: 1px solid $buttonBorderColor !important;

            .p-button-label {
                font-size: .75rem;
                color: black;
            }
        }
        
    }
</style>