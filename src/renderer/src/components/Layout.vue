<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 14:36:21
 * @LastEditTime: 2024-03-21 13:19:37
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import OptionList from './OptionList.vue'
import TVDramaCanvas from './TVDramaCanvas.vue'
import OptionListSub from './OptionListSub.vue'
import Taskbar from './Taskbar.vue'

</script>

<template>
  <div style="height: 100%; width: 100%">
    <Taskbar />
    <!-- home -->
    <div style="width: 100%; height: 100%" v-show="true">
      <div class="left_layout" style="padding-top: 39px">
        <OptionList />
      </div>
      <div class="right_layout" style="padding-top: 39px">
        <OptionListSub />
      </div>
      <div class="center_layout" style="padding-top: 39px">
        <div
          style="
            width: 100%;
            height: 5%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
          "
        >
          <n-breadcrumb>
            <n-breadcrumb-item> 电视剧</n-breadcrumb-item>
            <n-breadcrumb-item> 首页</n-breadcrumb-item>
            <!-- <n-breadcrumb-item> 皇朝系</n-breadcrumb-item> -->
          </n-breadcrumb>
        </div>
        <TVDramaCanvas />
      </div>
    </div>

  </div>
</template>

<style scoped>
.left_layout {
  width: 20%;
  height: 100%;
  float: left;
}
.center_layout {
  width: 60%;
  height: 100%;
  float: right;
}
.right_layout {
  width: 20%;
  height: 100%;
  float: right;
}
</style>
