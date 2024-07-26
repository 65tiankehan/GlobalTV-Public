<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 14:36:21
 * @LastEditTime: 2024-03-27 12:07:52
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import { useStore } from 'vuex'
import OptionList from './OptionList.vue'
import TVDramaCanvas from './TVDramaCanvas.vue'
import OptionListSub from './OptionListSub.vue'
import Taskbar from './Taskbar.vue'
import Play from './Play.vue'

import { computed, ref } from 'vue'

interface Notice {
  title: string,
  message: string
}

const showModel = ref(true)
const store = useStore()
// 使用computed属性来访问getter
const breadcrumbs = computed(() => store.getters.getBreadcrumbs)


// 使用computed属性来访问getter
const payVideoUrl = computed(() => store.getters.getPayVideoUrl)

// 直接从 store 访问状态，这个是分类起始地址，当改变时，会触发计算属性的 getter
const playVideoType = computed(() => store.state.playVideoType)


// 使用computed属性来访问getter
const page = computed(() => store.state.page)

// 使用computed属性来访问getter
const total = computed(() => store.state.total)

// 使用computed属性来访问getter
const PaginationUrl = computed(() => store.getters.getPaginationUrl)


// 使用computed属性来访问getter
const showUpdate = computed(() => store.getters.getShowUpdate)

// 使用computed属性来访问getter
const notices = computed(() => store.getters.getNotices)

// 使用store.commit来调用mutation
const setplayVideoType = (url: string) => {
  store.commit('SET_PAYVIDEOTYPE', url)
}

// 使用store.commit来调用mutation
const setpage = (url: number) => {
  store.commit('SET_PAGE', url)
}

// 使用store.commit来调用mutation
const setshowUpdate = (showUpdate: boolean) => {
  store.commit('SET_SHOWUPDATE', showUpdate)
}
// 使用store.commit来调用mutation
const setNotices = (notices: Notice[]) => {
  store.commit('SET_NOTICES', notices)
}

//发生了分页行为
const pagination = (page: number) => {
  setpage(page)//改变vuex中页码
  //得到playVideoType和page结合的url重新赋值给playVideoType
  setplayVideoType(PaginationUrl.value.replace(/\$\{0\}/, page.toString()))
}

//取消更新
const cancelUpdate = () => {

  setshowUpdate(false)
}

//开始更新
const startUpdate = () => {
  setshowUpdate(false)
  notices.value.push({
    title: '版本更新',
    message: '版本更新完成！'
  })
  setNotices(notices.value)
}

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
            <n-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index"> {{ item }}</n-breadcrumb-item>

          </n-breadcrumb>
          <!--  表达排除首页 -->
          <n-pagination @update:page="pagination" v-if="(playVideoType != '' && playVideoType != payVideoUrl)"
                        v-model:page="page"
                        :page-count="total" show-quick-jumper>

            <template #goto>
              跳转至
            </template>
          </n-pagination>

        </div>
        <TVDramaCanvas />
      </div>
    </div>
    <div style="width: 100%; height: 100%" v-if="false">
      <div style="padding-top: 39px; height: 100%; width: 100%">
        <Play />
      </div>
    </div>
  </div>
  <n-modal v-model:show="showUpdate" :mask-closable="false">
    <n-card
      style="width: 600px"
      title="Global TV Update 通知"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-badge :value="1" :max="99">
          <div>
            <svg t="1710925326942" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="8472" width="15" height="15">
              <path
                d="M889.828994 749.637494c-1.204099-1.720141-119.205779-165.821603-119.205779-287.435579 0-168.401814-76.202251-254.752898-162.725349-286.919536L607.897867 159.973123c0-52.980346-43.175542-95.983874-95.983874-95.983874S415.930119 107.164791 415.930119 159.973123l0 15.309256c-86.523098 32.166639-162.725349 118.517722-162.725349 286.919536 0 121.269948-118.00168 285.199395-119.205779 286.919536-5.332437 7.568621-7.396607 16.857383-5.332437 25.974131 2.064169 8.944734 7.912649 16.685369 15.997312 20.985721 5.676466 3.096254 107.336805 57.280699 233.423148 84.458928 21.32975 66.397447 73.966068 111.29313 133.654964 111.29313s112.325214-44.895683 133.654964-111.29313c126.086343-27.178229 227.746682-81.018646 233.423148-83.942886 8.256677-4.472367 13.933143-12.040988 16.169326-20.985721C897.225601 766.666891 895.333445 757.206115 889.828994 749.637494zM479.919368 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625 17.545439 0 31.994625 14.449185 31.994625 31.994625l0 0.860071c-7.224593-0.516042-14.277171-0.860071-21.32975-0.860071l-21.32975 0c-7.052579 0-14.105157 0.344028-21.32975 0.860071L479.919368 159.973123 479.919368 159.973123zM511.913993 928.016126c-22.361834 0-43.175542-13.417101-57.968755-35.262893 19.26558 2.064169 38.531161 3.268268 57.968755 3.268268s38.875189-1.376113 57.968755-3.268268C555.089535 914.599026 534.275827 928.016126 511.913993 928.016126z"
                fill="#dbdbdb" p-id="8473"></path>
            </svg>
          </div>
        </n-badge>
      </template>
      <div>
        <p>1.更新 v0.0.1</p>
        <p>2.修复 分类在切换的过程中显示错误</p>
        <p>3.修复下载通知，在下载完毕后，无法有效的通知</p>
      </div>
      <template #footer>
        <n-space justify="end">
          <n-button type="error" @click="startUpdate">
            更新
          </n-button>
          <n-button type="primary" @click="cancelUpdate">
            取消
          </n-button>
        </n-space>

      </template>
    </n-card>
  </n-modal>
  <!-- 影片详情 -->
  <n-modal v-model:show="showModel">
    <n-card
      style="width: 650px"
      title="邪恶第四季"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>

        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <n-badge :value="1" :max="99">
              <div>
                <svg t="1710925326942" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="8472" width="15" height="15">
                  <path
                    d="M889.828994 749.637494c-1.204099-1.720141-119.205779-165.821603-119.205779-287.435579 0-168.401814-76.202251-254.752898-162.725349-286.919536L607.897867 159.973123c0-52.980346-43.175542-95.983874-95.983874-95.983874S415.930119 107.164791 415.930119 159.973123l0 15.309256c-86.523098 32.166639-162.725349 118.517722-162.725349 286.919536 0 121.269948-118.00168 285.199395-119.205779 286.919536-5.332437 7.568621-7.396607 16.857383-5.332437 25.974131 2.064169 8.944734 7.912649 16.685369 15.997312 20.985721 5.676466 3.096254 107.336805 57.280699 233.423148 84.458928 21.32975 66.397447 73.966068 111.29313 133.654964 111.29313s112.325214-44.895683 133.654964-111.29313c126.086343-27.178229 227.746682-81.018646 233.423148-83.942886 8.256677-4.472367 13.933143-12.040988 16.169326-20.985721C897.225601 766.666891 895.333445 757.206115 889.828994 749.637494zM479.919368 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625 17.545439 0 31.994625 14.449185 31.994625 31.994625l0 0.860071c-7.224593-0.516042-14.277171-0.860071-21.32975-0.860071l-21.32975 0c-7.052579 0-14.105157 0.344028-21.32975 0.860071L479.919368 159.973123 479.919368 159.973123zM511.913993 928.016126c-22.361834 0-43.175542-13.417101-57.968755-35.262893 19.26558 2.064169 38.531161 3.268268 57.968755 3.268268s38.875189-1.376113 57.968755-3.268268C555.089535 914.599026 534.275827 928.016126 511.913993 928.016126z"
                    fill="#dbdbdb" p-id="8473"></path>
                </svg>
              </div>
            </n-badge>
          </template>
          <span>你已经点开详情啦！</span>
        </n-popover>


      </template>
      <!--内容-->
      <n-space justify="flex-start">
        <n-space>

          <div style="height: 300px;width: 200px;padding: 5px;border-radius: 5px;  border: 1px dashed #3f3f44;">
            <img style="width: 100%;height: 100%"
                 src="https://v.376ju.com/upload/vod/20240523-1/2a12d4f8870237e02ce3203819860983.jpg" />
          </div>

          <div style="height: 300px;width: 350px">
            <n-space vertical>
              <n-breadcrumb>
                <n-breadcrumb-item>
                  首页
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  美剧
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  2024
                </n-breadcrumb-item>
              </n-breadcrumb>
              <div style="width: 100%;height: 100px" class="NeworldscroE">
                <n-space>
                  <n-tag round> 连续剧</n-tag>
                  <n-tag round type="success">
                    美国
                  </n-tag>
                  <n-tag round type="warning">
                    2024
                  </n-tag>
                  <n-tag round type="error">
                    麦克·柯尔特/卡佳·赫尔伯斯
                  </n-tag>
                  <n-tag round type="info">
                    更新：07.26
                  </n-tag>
                  <n-tag round type="info">
                    集数：已完结
                  </n-tag>
                  <n-tag round type="info">
                    上映：2024
                  </n-tag>
                </n-space>
              </div>

              <p>剧情：</p>
              <div style="width: 100%;height: 130px;" class="NeworldscroE">
                《邪恶力量第四季》是美国的一部悬疑题材电视剧，由Robert Singer执导，詹森·阿克斯、贾德·帕达里克等主演。
                [1]该剧讲述了进入Ruby体内的Lilith将地狱之犬放入屋内，Dean被拖入黑暗的地狱，而就在Lilith想要消灭Sam的时候，却发现Sam对她的力量免疫。
                《邪恶力量第四季》是美国的一部悬疑题材电视剧，由Robert Singer执导，詹森·阿克斯、贾德·帕达里克等主演。
                [1]该剧讲述了进入Ruby体内的Lilith将地狱之犬放入屋内，Dean被拖入黑暗的地狱，而就在Lilith想要消灭Sam的时候，却发现Sam对她的力量免疫。
                《邪恶力量第四季》是美国的一部悬疑题材电视剧，由Robert Singer执导，詹森·阿克斯、贾德·帕达里克等主演。
                [1]该剧讲述了进入Ruby体内的Lilith将地狱之犬放入屋内，Dean被拖入黑暗的地狱，而就在Lilith想要消灭Sam的时候，却发现Sam对她的力量免疫。
              </div>

            </n-space>

          </div>


        </n-space>
        <n-space>

          <div style="width: 570px;height: 300px" >
            <n-tabs type="segment" animated>
              <n-tab-pane name="chap1" tab="sx1线路">
              <div style="width: 100%;height: 250px" class="NeworldscroE">
                <n-space >
                  <n-button strong secondary style="width: 71px;">
                    第1集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第2集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第3集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第4集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第5集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第6集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第7集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第8集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第9集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第10集
                  </n-button>

                  <n-button strong secondary style="width: 71px;">
                    第11集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第12集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第13集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第14集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第15集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第16集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第17集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第18集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第19集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第20集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第1集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第2集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第3集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第4集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第5集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第6集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第7集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第8集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第9集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第10集
                  </n-button>

                  <n-button strong secondary style="width: 71px;">
                    第11集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第12集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第13集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第14集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第15集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第16集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第17集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第18集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第19集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第20集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第1集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第2集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第3集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第4集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第5集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第6集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第7集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第8集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第9集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第10集
                  </n-button>

                  <n-button strong secondary style="width: 71px;">
                    第11集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第12集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第13集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第14集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第15集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第16集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第17集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第18集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第19集
                  </n-button>
                  <n-button strong secondary style="width: 71px;">
                    第20集
                  </n-button>
                </n-space>
              </div>

              </n-tab-pane>
              <n-tab-pane name="chap2" tab="QRT线路">
                “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
                Amazon 服务，还是救公寓的火。<br><br>
                我的脑海中忽然出现了 Amazon
                著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
                debug 这个线上问题。
              </n-tab-pane>
              <n-tab-pane name="chap3" tab="Yhn线路">
                但是忽然，公寓的烟味消失，火警也停了。我的女朋友走进了房间，让我震惊的是，她摘下了自己的假发，她是
                Jeff Bezos（Amazon 老板）假扮的！<br><br>
                “我对你坚持顾客至上的原则感到十分骄傲”，说完，他递给我一张五美金的亚马逊礼品卡，从我家窗户翻了出去，跳上了一辆
                Amazon 会员服务的小货车，一溜烟离开了。<br><br>虽然现在我已不在 Amazon
                工作，但我还是非常感激在哪里学的到的经验，这些经验我终身难忘。你们同意么？
              </n-tab-pane>
            </n-tabs>
          </div>

        </n-space>
      </n-space>


    </n-card>
  </n-modal>
</template>

<style scoped>
.NeworldscroE {
  /* height: 430px; */
  overflow-y: auto;
}

.NeworldscroE::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 0px;
}

.NeworldscroE::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 5px rgba(235, 238, 240, 0.2);
  background: #ebeef0;
}

.NeworldscroE::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(235, 238, 240, 0.2);
  border-radius: 0px;
  background: #f1f6fa;
}

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
