import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/catalog'
  },
  {
    path: '/catalog',
    component: () => import('../pages/CatalogPage.vue')
  },
  {
    path: '/add_product',
    component: () => import('../pages/AddProductPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
