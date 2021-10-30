import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/About.vue')
	},
	{
		path: '/username',
		name: 'user.show',
		component: () => { },
		children: [
			{
				path: 'products',
				name: 'porduct.show',
				component: () => { },
				children: [
					{
						path: 'create',
						name: 'product.create',
						component: () => { }
					},
					{
						path: ':id/update',
						name: 'product.update',
						component: () => { }
					},
					{
						path: ':id/delete',
						name: 'product.delete'
					}
				]
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
