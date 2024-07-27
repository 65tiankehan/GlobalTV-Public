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

import axios from 'axios'
import * as cheerio from 'cheerio'

import { computed, ref, watch } from 'vue'

interface Notice {
  title: string,
  message: string
}

//定义线路
interface EpisodeCollection {
  title?: string,
  url?: string
}

//定义线路集合接口
interface streamingSources {
  name?: string,
  EpisodeCollection: EpisodeCollection[]
}

//定义标签接口
interface tag {
  name?: string,
  color?: string
}

//定义详情接口
interface tvDrama {
  title?: string,
  imgUrl?: string,
  tags?: tag[],
  Scenario?: string,
  streamingSources?: streamingSources[]
}

// 创建一个 tvDrama 类型的变量
const dramaDetails = ref<tvDrama>({
  title: '',
  imgUrl: '',
  tags: [],
  Scenario: '',
  streamingSources: []
})

// 重置 dramaDetails 的函数
function resetDramaDetails() {
  dramaDetails.value = {
    title: '',
    imgUrl: '',
    tags: [],
    Scenario: '',
    streamingSources: []
  }
}

const showModel = ref(false)
const store = useStore()
// 使用computed属性来访问getter
const breadcrumbs = computed(() => store.getters.getBreadcrumbs)


// 使用computed属性来访问getter
const payVideoUrl = computed(() => store.getters.getPayVideoUrl)

// 直接从 store 访问状态，这个是分类起始地址，当改变时，会触发计算属性的 getter
const playVideoType = computed(() => store.state.playVideoType)

// 使用computed属性来访问getter
const videoDetailsLoading = computed(() => store.getters.getVideoDetailsLoading)

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

// 使用computed属性来访问getter
const PlayStarted = computed(() => store.getters.getPlayStarted)


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

// 使用store.commit来调用mutation
const setPlayStarted = (PlayStarted: boolean) => {
  store.commit('SET_PLAYSTARTED', PlayStarted)
}


// 使用store.commit来调用mutation
const setStreamSource = (StreamSource: string) => {
  store.commit('SET_STREAMSOURCE', StreamSource)
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

//得到详情地址，去除地址中的${及其后面的字符串，返回剩于字符串
function extractBeforeDollarBrace(str: string): string {
  const index = str.indexOf('${')
  if (index !== -1) {
    return str.slice(0, index)
  }
  return str // 如果没有找到 '${'，返回原始字符串
}

//随机返回标签颜色
function getRandomType(): 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error' {
  const types: ('default' | 'primary' | 'info' | 'success' | 'warning' | 'error')[] = ['default', 'primary', 'info', 'success', 'warning', 'error']
  const randomIndex = Math.floor(Math.random() * types.length)
  return types[randomIndex]
}

//监听是否需要展开详情
watch(videoDetailsLoading, (newVal, oldVal) => {
  console.log('videoDetailsLoading changed from', oldVal, 'to', newVal)
  resetDramaDetails()
  axios
    .get(payVideoUrl.value.slice(0, payVideoUrl.value.length - 1) + extractBeforeDollarBrace(newVal))
    .then((resp) => {
      const $ = cheerio.load(resp.data)


      const tagLength = $($('div.video-info').children('div.video-info-main')).children('div.video-info-items').length
      //得到详情和tag
      $($('div.video-info').children('div.video-info-main')).children('div.video-info-items').each(function(n, m) {
        console.log('第' + (n + 1) + '条')


        //不找最后一条，因为最后一条是剧情
        if (n < tagLength - 1) {
          if (dramaDetails.value.tags)
            dramaDetails.value.tags.push({
              name: $(m).children('span.video-info-itemtitle').text() +
                ($(m).children('div.video-info-item').text().length > 20
                  ? $(m).children('div.video-info-item').text().slice(0, 20) + '...'
                  : $(m).children('div.video-info-item').text()), color: getRandomType()
            })
        } else {
          dramaDetails.value.Scenario = $(m).children('div.video-info-item').text()
        }

      })

      dramaDetails.value.title = $($($('div.video-cover').children('div.module-item-cover')).children('div.module-item-pic')).children('img').attr('alt')

      dramaDetails.value.imgUrl = $($($('div.video-cover').children('div.module-item-cover')).children('div.module-item-pic')).children('img').attr('data-src')

      //得到线路
      $($($($($('div.module').children('div.module-heading')).children('div.module-tab')).children('div.module-tab-items')).children('div.module-tab-content')).children('div.module-tab-item').each(function(n, m) {
        console.log('线路第' + (n + 1) + '条')

        if (dramaDetails.value.streamingSources) {
          dramaDetails.value.streamingSources.push({
            name: $(m).children('span').text(),
            EpisodeCollection: []
          })
        }

      })
      //得到选集
      $($('div.module').children('div.module-list')).each(function(n, m) {
        console.log('线路选集盒第' + (n + 1) + '条')
        $($($(m).children('div.module-blocklist')).children('div.scroll-content')).children('a').each(function(i, b) {
          console.log('集第' + (i + 1) + '条')
          if (dramaDetails.value.streamingSources) {

            dramaDetails.value.streamingSources[n].EpisodeCollection.push({
              title: $($(b).children('span')).text(),
              url: $(b).attr('href')
            })
          }


        })

      })

      console.log(dramaDetails.value.streamingSources)
      //当上方数据加载完成后，展开窗口
      showModel.value = true
    }).catch((err) => {
    console.log(err)
  })

})


//点击集，播放
const PlayBack = (url: string) => {
  if (url != '') {
    showModel.value = false
    // 获取当前时间的时间戳
    const timestamp = Date.now()
    setPlayStarted(true)
    //填写播放地址
    setStreamSource(url + '${' + `${timestamp}`
    )

  }
}
</script>

<template>
  <div style="height: 100%; width: 100%">
    <Taskbar />
    <!-- home -->
    <div style="width: 100%; height: 100%" v-show="PlayStarted == false">
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
    <!--    播放页面-->
    <div style="width: 100%; height: 100%" v-if="PlayStarted == true">
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
      :title="dramaDetails.title"
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
                 :src="dramaDetails.imgUrl" />
          </div>

          <div style="height: 300px;width: 350px">
            <n-space vertical>
              <n-breadcrumb>
                <n-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index"> {{ item }}</n-breadcrumb-item>
              </n-breadcrumb>
              <div style="width: 100%;height: 100px;overflow-x:auto" class="NeworldscroE">
                <n-space>

                  <n-tag v-for="(item,index) in dramaDetails.tags" :key="index" round :type="item.color">
                    {{ item.name }}
                  </n-tag>

                </n-space>
              </div>

              <p>剧情：</p>
              <div style="width: 100%;height: 130px;" class="NeworldscroE">
                {{ dramaDetails.Scenario }}
              </div>

            </n-space>

          </div>


        </n-space>
        <n-space>

          <div style="width: 570px;height: 300px">
            <n-tabs type="segment" animated>
              <n-tab-pane v-for="(item,index) in dramaDetails.streamingSources" :key="index" :name="item.name"
                          :tab="item.name">
                <div style="width: 100%;height: 250px" class="NeworldscroE">
                  <n-space>
                    <n-button @click="PlayBack(item2.url)" strong secondary
                              v-for="(item2,index2) in item.EpisodeCollection "
                              :key="index2">
                      {{ item2.title }}
                    </n-button>

                  </n-space>
                </div>

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
