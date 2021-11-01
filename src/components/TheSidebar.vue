<template>
	<div class="zi-sidebar">
		<ul>
			<li>
				<router-link to="/">
					<i class="ri-store-2-line"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/username/products">
					<i class="pi pi-home"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/">
					<i class="ri-file-list-line"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/">
					<i class="ri-group-line"></i>
				</router-link>
			</li>
			<li>
				<router-link to="/">
					<i class="ri-settings-3-line"></i>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.zi-sidebar {
  	width: 10%;
	height: 100vh;
	padding-top: 55px;
	
	ul {
		display: flex;
		flex-flow: column wrap;
		list-style: none;
	}

	a {
		width: 100%;
		color: #11111366;
		display: block;
		padding: 1.3125rem 3.25rem;
		text-decoration: none;
	}

	i {
		font-size: 1.5rem;
	}
}

</style>
