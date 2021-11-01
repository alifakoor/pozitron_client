<template>
	<div class="zi-navbar">
		<zi-rtl-breadcrumb :home="home" :model="items" />
	</div>
	<div class="p-d-flex">
		<zi-sidebar />
		<div class="zi-main">
			<div class="content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			home: { icon: 'pi pi-home', to: '/' },
			items: [
				{ label: 'انبار' },
				{ label: 'محصولات' }
			]
		}
	}
}
</script>

<style lang="scss">

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	direction: rtl;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
		color: #42b983;
		}
	}
}
</style>
