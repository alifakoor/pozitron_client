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
		margin-right: 1.937984496124031007751937984496%;
		margin-left: 2.325581395348837209302325581395%;
		.p-button,
		.p-inputgroup-addon {
			width: 2.5rem;
			color: #B4B4B4;
			border: 1px solid $buttonBorderColor;
			background-color: #F6F6F7;
			padding-top: 1.515151515151515151515151515152%;
    		padding-bottom: 1.515151515151515151515151515152%;
		}

		.p-button {
			border-radius: 4px 0px 0px 4px;
		}

		.p-inputgroup-addon {
			border-radius: 0px 4px 4px 0px;
		}

		.p-inputtext {
			padding: 1.515151515151515151515151515152%;
			text-align: right;
			font-family: Vazir;
		}
	}
</style>
