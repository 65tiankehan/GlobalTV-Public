import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './config'

const router = createRouter({
  //这里是路由模式
  //createWebHashHistory为has模式，createWebHistory为history模式
  history: createWebHashHistory(),
  //路由的配置选项，routes为单独引进的
  routes
})

export default router
