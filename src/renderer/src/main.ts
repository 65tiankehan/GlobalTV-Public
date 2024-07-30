/*
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 14:26:28
 * @LastEditTime: 2024-03-21 10:14:18
 * @LastEditors: KeHan
 */
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import 'animate.css'
import store from '../src/store'
import router from '../src/router/index'
import { toggleTheme } from './themeToggle' // 确保这个路径正确

const app = createApp(App)
app.use(naive)
app.use(store)
app.use(router)

// 注册toggleTheme到全局
app.config.globalProperties.$toggleTheme = toggleTheme

app.mount('#app')
