<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 14:26:28
 * @LastEditTime: 2024-03-21 10:43:50
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { lightTheme, darkTheme } from 'naive-ui'

const store = useStore()
// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)
</script>


<template>
  <n-config-provider
    :theme="skin == 'darkTheme' ? darkTheme: lightTheme"
  >
    <n-notification-provider :placement="'bottom-right'">
      <n-modal-provider>
        <n-loading-bar-provider>
          <n-dialog-provider>
            <n-message-provider>
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </n-message-provider>
          </n-dialog-provider>
        </n-loading-bar-provider>
      </n-modal-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<style scoped>
.n-config-provider {
  width: 100% !important;
  height: 100% !important;
}
</style>

