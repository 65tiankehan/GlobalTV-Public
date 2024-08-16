export default [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/Load.vue')
  },
  {
    path: '/load',
    name: 'load',
    component: () => import('../components/Layout.vue')
  },
  {
    path: '/Update',
    name: 'Update',
    component: () => import('../components/ProductUpdatePage.vue')
  }
]
