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

createApp(App).use(naive).use(store).use(router).mount('#app')
