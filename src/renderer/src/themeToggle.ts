// src/utils/theme.js
import { ref } from 'vue'

const themePreference = ref(localStorage.getItem('theme') || 'dark')


export const toggleTheme = () => {
  themePreference.value = themePreference.value === 'dark' ? 'dark' : 'theme'
  localStorage.setItem('theme', themePreference.value === 'dark' ? 'dark' : 'light')
  // 通知组件更新主题，如果需要的话
}


