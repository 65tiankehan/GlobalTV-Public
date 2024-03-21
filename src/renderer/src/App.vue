<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 14:26:28
 * @LastEditTime: 2024-03-21 10:43:50
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import { darkTheme } from 'naive-ui'
// import Versions from './components/Versions.vue'

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </n-message-provider>
  </n-config-provider>
</template>
<style scoped>
.n-config-provider {
  width: 100% !important;
  height: 100% !important;
}
</style>
