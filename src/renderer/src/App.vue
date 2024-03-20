<script setup lang="ts">
import Layout from './components/Layout.vue'
import { darkTheme } from 'naive-ui'
// import Versions from './components/Versions.vue'

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <Layout></Layout>
    </n-message-provider>
  </n-config-provider>
</template>
<style scoped>
.n-config-provider {
  width: 100% !important;
  height: 100% !important;
}
</style>
