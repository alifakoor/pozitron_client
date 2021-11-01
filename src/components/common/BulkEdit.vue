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
        
        .p-button{
            padding: .375rem;
            border: 1px solid $buttonBorderColor !important;
        }
        
    }
</style>