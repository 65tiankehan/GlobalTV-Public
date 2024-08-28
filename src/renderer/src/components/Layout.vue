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
import { useMessage } from 'naive-ui'
import axios from 'axios'
import * as cheerio from 'cheerio'

import { computed, ref, watch, onBeforeMount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import IndexedDBManager from '../indexedDB.js'

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

interface RemoteStartStop {
  switch?: boolean
}

interface CaseServiceAgreement {
  switch?: boolean,
  CaseServiceAgreementTime?: string
}

const dbManager = new IndexedDBManager()

const message = useMessage()

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
const router = useRouter()
const CaseServiceAgreementTime = ref('')

const paginationState = ref(false)

const breadcrumbState = ref(false)
const TVDramaCanvasHeight = ref('height: 70%;')

// 使用computed属性来访问getter
const breadcrumbs = computed(() => store.getters.getBreadcrumbs)


// 使用computed属性来访问getter
const payVideoUrl = computed(() => store.getters.getPayVideoUrl)


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


// 使用computed属性来访问getter
const versionDescriptions = computed(() => store.getters.getVersionDescriptions)

// 直接从 store 访问状态，这个是分类起始地址，当改变时，会触发计算属性的 getter
const playRoute = computed(() => store.state.playRoute)

// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)

const protocol18 = computed(() => store.getters.getProtocol18)

const caseServiceAgreement = computed(() => store.getters.getCaseServiceAgreement)

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
const setPlayStarted = (PlayStarted: boolean) => {
  store.commit('SET_PLAYSTARTED', PlayStarted)
}


// 使用store.commit来调用mutation
const setStreamSource = (StreamSource: string) => {
  store.commit('SET_STREAMSOURCE', StreamSource)
}
const setskin = (skin: string) => {
  store.commit('SET_SKIN', skin)
}

const setisToggLed = (isToggLed: string) => {
  store.commit('SET_TOGGLED', isToggLed)
}

const setProtocol18 = (protocol18: boolean) => {
  store.commit('SET_PROTOCOL18', protocol18)
}

const setCaseServiceAgreement = (CaseServiceAgreement: boolean) => {
  store.commit('SET_CASE_SERVICE_AGREEMENT', CaseServiceAgreement)
}

//发生了分页行为
const pagination = (page: number) => {
  setpage(page)//改变vuex中页码
  //得到playVideoType和page结合的url重新赋值给playVideoType
  setplayVideoType(PaginationUrl.value.replace(/\$\{0\}/, page.toString()))
}

//取消更新
const cancelUpdate = () => {
  message.error('取消更新')
  setshowUpdate(false)
}

//开始更新
const startUpdate = () => {
  setshowUpdate(false)
  //先，通知主进程，修改窗口大小，变成更新窗口所需大小
  window.electron.ipcRenderer.send('openUpdate')
  //在切换页面
  router.push({ path: '/Update' })
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

      //tag
      $('div.ewave-content__detail').children('p.data').each(function(_n, m) {
        if (dramaDetails.value.tags)
          dramaDetails.value.tags.push({
            name:
              ($(m).text().length > 20
                ? $(m).text().slice(0, 20) + '...'
                : $(m).text()), color: getRandomType()
          })
      })

      //详情
      dramaDetails.value.Scenario = $('div.ewave-content__detail').children('p.desc.hidden-xs').text()

      dramaDetails.value.title = $('div.ewave-content__thumb').children('a').attr('title')

      dramaDetails.value.imgUrl = $($('div.ewave-content__thumb').children('a')).children('img').attr('data-original')

      //得到线路
      $('ul.nav.nav-tabs.pull-right.swiper-wrapper').children('li').each(function(_n, m) {
        if (dramaDetails.value.streamingSources) {
          dramaDetails.value.streamingSources.push({
            name: $(m).text(),
            EpisodeCollection: []
          })
        }
      })

      //得到选集
      $($('ul.ewave-content__playlist.clearfix.column8.overflow').children('li')).each(function(_n, m) {
        if (dramaDetails.value.streamingSources) {
          dramaDetails.value.streamingSources[0].EpisodeCollection.push({
            title: $($(m).children('a')).text(),
            url: $($(m).children('a')).attr('href')
          })
        }
      })


      console.log(dramaDetails.value.streamingSources)
      //当上方数据加载完成后，展开窗口
      showModel.value = true
    }).catch((err) => {
    console.log(err)
  })

})


//点击集，播放
const PlayBack = (url: string | undefined, isToggLed: string | undefined) => {
  showModel.value = false
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setStreamSource(url + '${' + `${timestamp}`
  )

  setisToggLed(isToggLed ?? '')
  setPlayStarted(true)
  //填写播放地址
}


/**
 *  检查官方消息通知，这个消息通知虽然可以临时被清空，但是每隔一分钟，就重新请求官方消息
 *  会剔除相同标题的消息，会和原本的消息队列融合
 *  [
 *    {
 *      title:'',
 *      message
 *    }
 *  ]
 */
let intervalId: NodeJS.Timeout | null = null

const checkForUpdates = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/65tiankehan/GlobalTV_profile/main/notifications.json')
    const newNotices: Notice[] = response.data

    const existingTitles = notices.value.map((notice) => notice.title)
    const filteredNewNotices = newNotices.filter(
      (notice) => !existingTitles.includes(notice.title)
    )


    if (filteredNewNotices.length > 0) {
      // 合并现有通知和新通知
      const mergedNotices = [...notices.value, ...filteredNewNotices]

      // 更新Vuex状态
      store.commit('SET_NOTICES', mergedNotices)
    }
  } catch (error) {
    console.error('Failed to fetch notices:', error)
  }
}


let intervalId2: NodeJS.Timeout | null = null



const checkForRemoteStartStop = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/65tiankehan/GlobalTV_profile/main/RemoteStartStop.json')
    const remoteStartStop: RemoteStartStop = response.data
    if (!remoteStartStop.switch) {//关闭窗口
      window.electron.ipcRenderer.send('closeWin')
    }

  } catch (error) {
    //请求远程启停接口，失败，直接关闭应用，不再请求
    window.electron.ipcRenderer.send('closeWin')
    console.error('Failed to fetch notices:', error)
  }
}

//检查是否有停运协议
const checkForCaseServiceAgreement = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/65tiankehan/GlobalTV_profile/main/CaseServiceAgreement.json')
    const caseServiceAgreement: CaseServiceAgreement = response.data
    if (caseServiceAgreement.switch) {//启用停运协议
      setCaseServiceAgreement(caseServiceAgreement.switch)
      CaseServiceAgreementTime.value = caseServiceAgreement?.CaseServiceAgreementTime || ''
    }

  } catch (error) {
    console.error('Failed to fetch notices:', error)
  }
}

//同意协议
async function closeCaseService() {
  setCaseServiceAgreement(false)
}

//往DB插入用户同意或者取消协议
async function setProtocol18DB(value: boolean) {
  let history = await dbManager.get('protocol18')

  // 如果`favorites`不存在，则创建一个新的`favorites`对象
  if (!history) {
    history = { id: 'protocol18', protocol18: false }
    await dbManager.add(history)
  }
  if (!value) {
    window.electron.ipcRenderer.send('closeWin')
  }
  history.protocol18 = value

  setProtocol18(false)
  // 更新`Protocol18`对象
  await dbManager.update(history.id, history)

}

// 监听 playRoute 的变化,禁用分页
watch(playRoute, (newVal, oldVal) => {
  console.log('playRoute changed from', oldVal, 'to', newVal)
  paginationState.value = true


})
//监听 breadcrumbs的变化，启用分页
watch(breadcrumbs, (newVal, oldVal) => {
  console.log('breadcrumbs changed from', oldVal, 'to', newVal)
  paginationState.value = false

  if (newVal.length == 1 && newVal[0] === '首页') {
    breadcrumbState.value = false
    TVDramaCanvasHeight.value = 'height:70%;'
  } else {
    breadcrumbState.value = true
    TVDramaCanvasHeight.value = 'height:95%;'
  }

})

//当应用启动后，2秒后，检查皮肤，如果皮肤不存在，则使用默认皮肤，反之使用设置皮肤
const checkSkin = async () => {
  const skin = await dbManager.get('skin')
  setskin(skin?.inventory || 'darkTheme')
}

//当应用启动后，2秒后，检查用户是否同意过使用协议，如果没同意，则弹出协议，反之不弹窗协议
const checkprotocol18 = async () => {
  const protocol18 = await dbManager.get('protocol18')
  console.log('protocol18')
  console.log(protocol18)

  // 设置相反的布尔值
  setProtocol18(!protocol18?.protocol18)

}
onBeforeMount(() => {
  intervalId = setInterval(checkForUpdates, 60000) // 每分钟检查一次

  intervalId2 = setInterval(checkForRemoteStartStop, 60000)// 每分钟检查一次

  setTimeout(checkForCaseServiceAgreement, 120000)// 2分钟后检查,是否通知停运
  setTimeout(checkSkin, 2000)
  setTimeout(checkprotocol18, 2000)

})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (intervalId2) {
    clearInterval(intervalId2)
  }

})
const active = ref(false)
const showActive = () => {
  active.value = !active.value
}
</script>

<template>
  <div :class="skin == 'darkTheme' ? 'layout' : 'layout_lightTheme' " style="height: 100%; width: 100%">
    <Taskbar />
    <!-- home -->
    <div style="width: 100%; height: 100%" v-show="PlayStarted == false">
      <div class="left_layout" style="padding-top: 39px">
        <OptionList />
      </div>
      <n-drawer style="border-radius: 10px;" v-model:show="active" :width="350" placement="right">
        <n-drawer-content :native-scrollbar="false">
          <OptionListSub />
          <template #header>
            <n-space>
              <svg t="1724637327332" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="5972" width="24" height="24">
                <path
                  d="M186.12224 704.9216s195.70688-346.27584 251.20768-239.32928c0 0 26.86976 131.6864 107.64288-15.11424 0 5.69344 107.7248-250.96192 179.4048-145.08032 0-1.72032 251.24864 455.96672 251.24864 455.96672s-17.94048 93.7984-394.73152 60.29312c-165.4784-25.68192-161.50528-131.8912-394.77248-116.736z"
                  fill="#007EE2" p-id="5973"></path>
                <path
                  d="M63.8976 878.42816l131.19488-102.64576s134.5536-13.43488 206.35648 30.3104c19.37408 11.4688 197.38624 148.02944 574.17728 49.3568-4.5056 0-174.98112 191.0784-610.05824 46.16192-17.6128-4.01408-103.2192-44.2368-301.6704-23.18336z m373.43232-657.77664a94.208 94.208 0 1 1-188.416 0 94.208 94.208 0 0 1 188.416 0z m27.48416-42.3936l73.40032 42.3936-73.40032 42.3936v-84.7872zM401.2032 106.496l82.3296-20.2752-23.59296 81.42848L401.2032 106.496z m58.85952 167.69024l23.47008 81.42848-82.3296-20.39808 58.85952-61.0304zM203.1616 361.92256l23.38816-81.46944L285.4912 341.4016l-82.24768 20.48z m18.18624-183.66464L147.98848 220.65152l73.40032 42.3936v-84.7872zM285.4912 105.30816l-82.61632-18.96448 24.86272 81.01888 57.7536-62.0544z m15.27808-4.42368L343.08096 27.48416l42.3936 73.40032H300.72832z m0 242.4832l42.35264 73.35936 42.3936-73.40032H300.72832z"
                  fill="#007EE2" p-id="5974"></path>
              </svg>
              新闻/更多分类
            </n-space>

          </template>
        </n-drawer-content>
      </n-drawer>

      <!--      <div class="right_layout" style="padding-top: 39px">-->
      <!--        <OptionListSub />-->
      <!--      </div>-->
      <div class="center_layout" style="padding-top: 39px">
        <div
          class="classFexTitle"
          style="
            width: 100%;
            height: 5%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
          "
        >
          <n-space>
            <div class="classFex">
              <n-button size="small" quaternary @click="showActive">
                展开更多
              </n-button>
            </div>
            <n-breadcrumb>
              <n-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index"> {{ item }}</n-breadcrumb-item>

            </n-breadcrumb>
          </n-space>
          <!--  表达排除首页 -->

          <n-pagination :page-slot="7" @update:page="pagination"
                        v-if="breadcrumbState"
                        v-model:page="page"
                        :page-count="total" show-quick-jumper :disabled="paginationState">

            <template #goto>
              跳转至
            </template>
          </n-pagination>

        </div>
        <div class="BreadcrumbStateImg" v-if="!breadcrumbState" style="  width: 100%;padding: 0 16px;">
          <n-carousel autoplay show-arrow>
            <img
              class="carousel-img"
              src="https://pic3.iqiyipic.com/lequ/common/lego/20240827/aeb78ec544c94803bd8e14d7bd682633.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic3.iqiyipic.com/lequ/common/lego/20240826/80687ab5dca14a039d23ee3d5c20f19d.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic3.iqiyipic.com/lequ/common/lego/20240823/a6ba9aa583eb4ec0ad893a5775ec451d.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic1.iqiyipic.com/lequ/common/lego/20240818/4cd7fb7ee85e4ca083493823bf4b7506.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic0.iqiyipic.com/lequ/common/lego/20240819/b397b52791a94947bc9b590df741e36d.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic3.iqiyipic.com/lequ/common/lego/20240816/9f6f06df974341abb10d6fba14ebc62f.jpg"
            >
            <img
              class="carousel-img"
              src="https://pic3.iqiyipic.com/lequ/common/lego/20240822/5851577964ff48b7b0c5d55bf5375e02.jpg"
            >
          </n-carousel>
        </div>
        <TVDramaCanvas :my-prop-height="TVDramaCanvasHeight" />
      </div>
    </div>
    <!--    播放页面-->
    <div style="width: 100%; height: 100%" v-if="PlayStarted == true">
      <div style="padding-top: 39px; height: 100%; width: 100%">
        <Play v-if="PlayStarted" :my-prop-img="dramaDetails.imgUrl" :streamingSource="dramaDetails.streamingSources"
              :my-prop-title="dramaDetails.title" />
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
        <p v-for="(item, index) in versionDescriptions" :key="index">{{ item }}</p>
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
      class="space-card"
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

          <div class="space-Fax_img"
               style="height: 300px;width: 200px;padding: 5px;border-radius: 5px;  border: 1px dashed #3f3f44;">
            <img style="width: 100%;height: 100%"
                 :src="dramaDetails.imgUrl" />
          </div>

          <div class="space-Fax_dcrumb" style="height: 300px;width: 350px">
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

          <div class="space-Fax_stream" style="width: 570px;height: 300px">
            <n-tabs type="segment" animated>
              <n-tab-pane v-for="(item,index) in dramaDetails.streamingSources" :key="index" :name="item.name"
                          :tab="item.name">
                <div style="width: 100%;height: 250px" class="NeworldscroE">
                  <n-space>
                    <n-button @click="PlayBack(item2.url,index+'-'+index2)" strong secondary
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

  <!-- 18+协议 -->
  <n-modal v-model:show="protocol18">

    <n-card
      class="space-card"
      style="width: 650px"
      title="用户使用协议"
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
          <span>请咨询阅读使用协议内容！</span>
        </n-popover>


      </template>
      <!--内容-->
      <n-scrollbar style="max-height: 300px">
        <p>1. 年龄确认<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户必须<strong style="color: red;">年满 18 周岁</strong>或根据所在国家/地区的法律规定达到<strong
            style="color: red;">合法成年年龄</strong>，方可访问本平台提供的内容。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户在访问本平台之前必须确认自己的年龄符合上述要求。</p>

        <p>2. 责任声明<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户需自行确保遵守所在国家/地区有关访问成人内容的所有法律法规。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户需<strong style="color: red;">自行承担</strong>因违反当地法律而可能产生的任何法律责任。
        </p>

        <p>3. 内容免责声明<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台提供的内容仅供成年人<strong style="color: red;">合法使用</strong>。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户需自行判断内容的适用性和合法性，并对使用内容的行为<strong
            style="color: red;">负责</strong>。</p>

        <p>4. 隐私保护<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台承诺保护用户的隐私和个人信息安全，不会非法收集、使用或泄露用户的个人信息。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户应<strong style="color: red;">妥善保管</strong>自己的登录信息，避免他人未经授权使用。
        </p>

        <p>5. 违规处理<br>
          &nbsp;&nbsp;&nbsp;&nbsp;如果发现用户未达到法定年龄或存在其他违规行为，本平台有权<strong style="color: red;">立即终止</strong>其访问权限并采取必要的法律措施。
        </p>

        <p>6. 法律适用与争议解决<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本协议受<strong style="color: red;">中华人民共和国法律管辖</strong>。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;因本协议引起的任何争议，双方应友好协商解决；协商不成时，可向本平台所在地人民法院提起诉讼。
        </p>

        <p>7. 内容更新与变更通知<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台保留随时修改、更新或删除部分内容的权利，无需事先通知用户。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户有责任<strong style="color: red;">定期查看</strong>本协议的最新版本。</p>

        <p>8. 用户行为准则<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户不得利用本平台进行任何非法活动，包括但不限于传播色情内容、侵犯他人隐私权、版权侵权等。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;用户需<strong style="color: red;">遵守</strong>本平台制定的行为准则。</p>

        <p>9. 知识产权声明<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台上所有内容，包括但不限于文字、图片、音频、视频等，均受相关知识产权法律保护。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;未经本平台书面许可，用户<strong style="color: red;">不得复制、转载、传播</strong>等内容。
        </p>

        <p>10. 服务中断与不可抗力<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台不保证服务不会中断或没有错误。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;对于因不可抗力因素（如自然灾害、政府行为等）导致的服务中断，本平台<strong
            style="color: red;">不承担责任</strong>。</p>

        <p>11. 第三方链接免责声明<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台可能包含指向第三方网站的链接，这些链接仅为方便用户而提供。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台<strong style="color: red;">不对第三方网站的内容、安全性或隐私政策负责</strong>。
        </p>

        <p>12. 数据来源与版权说明<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本应用的数据收集自互联网，本应用<strong
            style="color: red;">不参与任何影视资源的制作与存储</strong>。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;如若侵犯了您的权益，请书面告知我们，我们会<strong style="color: red;">及时处理</strong>相关内容。
        </p>

      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <n-button type="error" @click="setProtocol18DB(true)">
            同意
          </n-button>
          <n-button type="primary" @click="setProtocol18DB(false)">
            不同意
          </n-button>
        </n-space>

      </template>
    </n-card>
  </n-modal>
  <!-- 强制停运通告 -->
  <n-modal v-model:show="caseServiceAgreement">

    <n-card
      class="space-card"
      style="width: 650px"
      title="应用停运协议"
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
          <span>请咨询阅读停运协议协议内容！</span>
        </n-popover>


      </template>
      <!--内容-->
      <n-scrollbar style="max-height: 400px">
        <p>1. 停运原因<br>
          &nbsp;&nbsp;&nbsp;&nbsp;由于业务调整和技术升级的需求，我们决定停止本平台的运营。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;经过慎重考虑，我们认为这是为了提供更好的用户体验和服务质量的最佳选择。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;我们感谢您一直以来的支持和理解。</p>

        <p>2. 当前情况<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台将于{{ CaseServiceAgreementTime }}开始逐步关闭各项功能。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;在此期间，我们将逐步停止应用更新、功能修复等服务，并逐步关闭现有服务。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;请您在此期间做好相应的准备和备份工作。</p>

        <p>3. 最终结果<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台将于{{ CaseServiceAgreementTime }}正式停止所有服务。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;到那时，所有用户账户将被永久关闭。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: red;">所有数据将被安全删除。</strong></p>

        <p>4. 用户数据处理<br>
          &nbsp;&nbsp;&nbsp;&nbsp;在运营过程中，我们并没有收集和处理您的个人数据。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;您可以放心于停运期间的数据安全性。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: red;">我们不承担任何因数据导出失败而导致的损失。</strong></p>

        <p>5. 不承担任何责任<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本平台对于停运导致的任何损失或不便概不负责。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;包括但不限于数据丢失、服务中断等问题。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: red;">我们不提供任何补偿措施。</strong></p>

        <p>6. 法律适用与争议解决<br>
          &nbsp;&nbsp;&nbsp;&nbsp;本协议受中华人民共和国法律管辖。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;因本协议引起的任何争议，一切归用户方面的责任。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong
            style="color: red;">双方应友好协商解决；协商不成时，可向本平台所在地人民法院提起诉讼。</strong></p>

        <p>7. 通知与沟通渠道<br>
          &nbsp;&nbsp;&nbsp;&nbsp;所有关于停运的重要通知将通过电子邮件和平台公告的形式发布。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;请确保您的联系信息准确无误，并定期查看官方通知。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: red;">如有任何疑问或建议，请联系我们的客服团队。</strong></p>

        <p>8. 感谢与告别<br>
          &nbsp;&nbsp;&nbsp;&nbsp;我们衷心感谢您一直以来的支持和信任。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;尽管此次停运带来了不便，但我们希望未来能以更好的形式再次为您服务。<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: red;">再次感谢您的理解和支持。</strong></p>


      </n-scrollbar>
      <template #footer>
        <n-space justify="end">
          <n-button type="error" @click="closeCaseService">
            同意
          </n-button>
        </n-space>

      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.BreadcrumbStateImg {

}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 5px;
}

.layout_lightTheme {
  background-color: #ffff;

}

.layout {
  background-color: #1b1b1f;
}

.classFexTitle {

}

@media (max-height: 716px) {
  .BreadcrumbStateImg {
    display: none !important;
  }
}

@media (max-height: 480px) {
  .classFexTitle {
    display: none !important;
  }
}

@media (max-width: 409px) {
  .classFex {
    display: none;
  }
}

@media (max-width: 817px) {
  .n-pagination {
    display: none;
  }
}

/* 当屏幕宽度至少为 400px 时 */
@media (max-width: 798px) {

  .space-card {
    width: 200px !important;

  }

  .space-Fax_stream {
    width: 130px !important;
  }

  .space-Fax_dcrumb {
    display: none;
  }

  .space-Fax_img {
    width: 130px !important;
    height: 130px !important;
  }

  .left_layout {
    display: none;
  }

  .right_layout {
    display: none;
  }

  .center_layout {
    width: 100% !important;
    height: 100% !important;
    float: none !important;
  }


}

.classFex {

}

.space-Fax_dcrumb {

}

.space-card {

}

.space-Fax_stream {

}

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
  width: 80%;
  height: 100%;
  float: right;
}

.right_layout {
  width: 20%;
  height: 100%;
  float: right;
}
</style>
