<template>
    <div class="zi-search" :style="{ width }">
		<div class="p-inputgroup">
			<Button class="p-button-secondary" icon="pi pi-search zi-font-size-24"/>
			<InputText placeholder="با بارکد، نام، ویژگی، دسته و برچسب دنبالش بگرد" />
			<span class="p-inputgroup-addon zi-font-size-24">
				<i class="ri-filter-line"></i>
			</span>
		</div>
    </div>
</template>

<script>
export default {
	name: "zi-search",
	props: {
		width: {
			type: String,
			default: '50%'
		}
	},
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
	.zi-search {
		direction: ltr;
		margin: 0 1.25rem;
		.p-button,
		.p-inputgroup-addon {
			width: 2.5rem;
			padding: .375rem 0;
			color: #B4B4B4;
			border: 1px solid $buttonBorderColor;
			background-color: #F6F6F7;
		}

		.p-inputtext {
			padding: .375rem;
			text-align: right;
			font-family: Vazir;
		}
	}
</style>
