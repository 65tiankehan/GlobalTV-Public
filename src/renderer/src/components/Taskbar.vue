<script setup lang="ts">
import { useDialog, useMessage, useNotification, useLoadingBar } from 'naive-ui'
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { ArrowUndoOutline as CashIcon } from '@vicons/ionicons5'
import axios from 'axios'
import IndexedDBManager from '../indexedDB.js'

import {
  // LogoMarkdown as LogoMarkdown,
  PlayCircleSharp as LogoGooglePlaystore
} from '@vicons/ionicons5'


const loadingBar = useLoadingBar()
const message = useMessage()
const dialog = useDialog()
const notification = useNotification()
const fileInput = ref<HTMLInputElement | null>(null)
const store = useStore()
const dbManager = new IndexedDBManager()

const focusState = ref(false)
const searchInputValue = ref('')

// 使用computed属性来访问getter
const notices = computed(() => store.getters.getNotices)
// 使用computed属性来访问getter


// 使用computed属性来访问getter
const PlayStarted = computed(() => store.getters.getPlayStarted)

// 使用computed属性来访问getter
const isSmartRouteEnabled = computed(() => store.getters.getIsSmartRouteEnabled)

// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)

const ipcHandleMax = () => window.electron.ipcRenderer.send('MaxWin')
const ipcHandleMin = () => window.electron.ipcRenderer.send('MinWin')
const ipcHandleClose = () => {

  //
  dialog.warning({
    title: '提示',
    content: '准备结束娱乐时刻啦？',
    positiveText: '结束',
    negativeText: '不结束',
    closable: false,
    onPositiveClick: () => {
      window.electron.ipcRenderer.send('closeWin')
    },
    onNegativeClick: () => {
      message.success('继续娱乐')
    }
  })
}

interface Notice {
  title: string,
  message: string
}

interface tvDramaCard {
  comment?: number
  Preview?: number
  NexT?: string
  name?: string
  like?: number
  moviesTab?: string
  moviesUrl?: string
  moviesImgUrl?: string
  download?: boolean,
  Progress: number,
  prompt?: string,
  prompt2?: string,
  favorites?: boolean
}

interface searchHistoryInfo {
  name: string
}

// 使用store.commit来调用mutation
const setNotices = (notices: Notice[]) => {
  store.commit('SET_NOTICES', notices)
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
const setversionDescriptions = (versionDescriptions: string[]) => {
  store.commit('SET_VERSIONDESCRIPTIONS', versionDescriptions)
}

// 使用store.commit来调用mutation
const setlocalPlayUrl = (localPlayUrl: string) => {
  store.commit('SET_LOCALPLAYURL', localPlayUrl)
}

// 使用store.commit来调用mutation
const setmimeType = (mimeType: string) => {
  store.commit('SET_MIMETYPE', mimeType)
}

// 使用store.commit来调用mutation
const setisSmartRouteEnabled = (isSmartRouteEnabled: boolean) => {
  store.commit('SET_ISSMARTROUTEENABLED', isSmartRouteEnabled)
}

// 使用store.commit来调用mutation
const setplayRoute = (playRoute: string) => {
  store.commit('SET_PLAYROUTE', playRoute)
}

// 使用store.commit来调用mutation
const setHistory = (History: string) => {
  store.commit('SET_HISTORY', History)
}

const setbreadcrumbs = (setbreadcrumb: string[]) => {
  store.commit('SET_BREADCRUMBS', setbreadcrumb)
}

const setFavorite = (Favorite: string) => {
  store.commit('SET_FAVORITE', Favorite)
}

const setskin = (skin: string) => {
  store.commit('SET_SKIN', skin)
}

const setVideoDetailsLoading = (url: string) => {
  store.commit('SET_VIDEODETAILSLOADING', url)
}


const SearchHistorys = ref<searchHistoryInfo[]>([])
const versionB = ref('')


const threadFun = (value: string) => {

  notification.success({

    content: '多线程',
    meta: '功能状态：' + value,
    duration: 2500,
    keepAliveOnHover: true
  })
}
//用ts编写一个函数，函数的打开本地资源窗口


const intelligenceFun = (value: boolean) => {

  setisSmartRouteEnabled(value)
  notification.success({
    content: '智能线路',
    meta: '功能状态：' + (value == true ? '开启' : '关闭'),
    duration: 2500,
    keepAliveOnHover: true
  })

}
// 假设你有这样一个函数来创建 Blob URL
const createBlobUrl = (file) => {
  const blobUrl = URL.createObjectURL(file)
  // 保存 MIME 类型
  const mimeType = file.type
  return { blobUrl, mimeType }
}


//打开本地视频
const selectFiles = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
const onFileSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement)?.files
  if (files && files.length > 0) {
    console.log('Selected files:', files)
    const file = files[0]
    // 在这里添加处理文件的逻辑
    // 创建 Blob URL 和保存 MIME 类型
    const { blobUrl, mimeType } = createBlobUrl(file)
    setlocalPlayUrl(blobUrl) // 设置播放地址
    setPlayStarted(true) // 打开播放窗口
    setmimeType(mimeType) // 设置类型

    // 清空文件输入框的状态，允许重新选择同一个文件
    if (fileInput.value) {
      fileInput.value.value = '' // 或者使用 dispatchEvent 方法
    }
  }
}


//打开下载视频

//删除vuex中的指定的消息
const removeSpecifiedNotices = (index: number) => {
  notices.value.splice(index, 1)
  setNotices(notices.value)
}

//睡眠
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//检查是否有新版本
async function checkForUpdates() {

  loadingBar.start()
  await sleep(3000) // 等待3秒

  axios.get('https://raw.githubusercontent.com/65tiankehan/GlobalTV_profile/main/version.json').then(res => {
    console.log(res.data.version)

    // 请求版本号
    window.electron.ipcRenderer.send('version-request')
    // 监听版本号的响应
    window.electron.ipcRenderer.on('version-response', (_event, version) => {
      console.log(`Application version: ${version}`)
      if (res.data.version !== `${version}`) {
        message.success('有新版本')

        setversionDescriptions(res.data.versionDescription)
        setshowUpdate(true)
      } else {
        message.success('没有新版本')
      }
    })

  }).catch((err) => {
    console.log(err)
  })

  loadingBar.finish()

}

// 请求版本号
window.electron.ipcRenderer.send('version-request-Y')
// 监听版本号的响应
window.electron.ipcRenderer.on('version-response-Y', (_event, version) => {
  console.log(`Application version: ${version}`)
  versionB.value = version
})
//打开up主关注页面
const openUp = () => {
  window.electron.ipcRenderer.send('OpenExternal', 'https://space.bilibili.com/393402835/video')
}

//往skin，插入一个值
async function SetOnSkin() {
  let history = await dbManager.get('skin')

  // 如果`skin`不存在，则创建一个新的`skin`对象
  if (!history) {
    history = { id: 'skin', inventory: '' }
    await dbManager.add(history)
  } else {
    // 如果`history`已存在，则直接修改`inventory`

    let skinL = ''
    if (skin.value == 'lightTheme') {
      skinL = 'darkTheme'
      setskin('darkTheme')
    } else {
      skinL = 'lightTheme'
      setskin('lightTheme')
    }
    // 如果`skin`已存在，则直接修改`skin`
    history.inventory = skinL

  }
  // 更新`history`对象
  await dbManager.update(history.id, history)

}


//返回，并清空播放地址
const closePlayStarted = () => {
  setPlayStarted(false)
  setlocalPlayUrl('')
  setmimeType('')
}

//输入框的focus状态下css变化
const Onfocus = () => [
  focusState.value = true
]
//输入框的Blur状态下css变化
const OnBlur = () => {
  if (searchInputValue.value.length <= 0) {
    focusState.value = false
  }

}

//点击历史，准备搜索
const OnClickSearchHistory = (value: string) => {
  const timestamp = Date.now()
  setplayRoute(value + '${' + `${timestamp}`)
  searchInputValue.value = value
}

const OnClickSearch = () => {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setplayRoute(searchInputValue.value + '${' + `${timestamp}`)
  const InputHistory: searchHistoryInfo = {
    name: `${searchInputValue.value}`
  }
  setSearchHistory(InputHistory)
}

//得到历史记录
async function getHistory() {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setHistory('${' + `${timestamp}`)
  setbreadcrumbs(['历史记录'])

}

//清空历史记录
async function clearHistory() {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setHistory('Clear${' + `${timestamp}`)
}

async function getFavorite() {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setFavorite('${' + `${timestamp}`)
  setbreadcrumbs(['收藏夹'])
}

//清空收藏
async function clearFavorite() {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setFavorite('Clear${' + `${timestamp}`)
}

//往历史，插入一个值
async function setHistoryT(pro: tvDramaCard) {
  let history = await dbManager.get('history')
  const arrx: tvDramaCard[] = history?.inventory || []
  console.log('arrx')

  console.log(arrx)
  // 如果 `history` 不存在，则创建一个新的 `history` 对象
  if (!history) {
    history = { id: 'history', inventory: arrx }
    await dbManager.add(history)
  } else {
    // 如果 `history` 已存在，则直接修改 `inventory`
    const itemToAdd = pro
    const exists = arrx.some(item => item.name === itemToAdd.name)

    if (!exists) {
      arrx.unshift(itemToAdd)
      history.inventory = arrx
    }
  }
  console.log('history')
  console.log(history)
  // 更新 `history` 对象
  await dbManager.update(history.id, history)
}

//添加搜索历史
async function setSearchHistory(params: searchHistoryInfo) {
  let history = await dbManager.get('searchHistory')
  const arrx: searchHistoryInfo[] = history?.inventory || []
  if (!history) {
    history = { id: 'searchHistory', inventory: arrx }
    await dbManager.add(history)
  } else {
    const itemToAdd = params
    const exists = arrx.some(item => item.name === itemToAdd.name)
    if (!exists) {
      arrx.unshift(itemToAdd)
      history.inventory = arrx
    }
  }
  // 更新 `history` 对象
  await dbManager.update(history.id, history)

  //重新查询一下搜索历史
  getSearchHistory()
}

//清空搜索历史
async function clearSearchHistory() {
  await dbManager.delete('searchHistory')
  SearchHistorys.value = []
  message.success('清空搜索历史成功！', { duration: 1500 })
}

async function getSearchHistory() {
  const history = await dbManager.get('searchHistory')
  console.log('搜索历史内容')
  console.log(history)
  SearchHistorys.value = history?.inventory || []
}

//推荐，点击
const setCarouselRecommend = (url: string, imgUrl: string, name: string) => {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setVideoDetailsLoading(url + '${' + `${timestamp}`)
  const pro = {
    moviesUrl: imgUrl,
    moviesImgUrl: url,
    name: name,
    Preview: Math.floor(Math.random() * 100) + 1,
    like: Math.floor(Math.random() * 100) + 1,
    comment: Math.floor(Math.random() * 100) + 1,
    download: false,
    Progress: 0
  }
  setHistoryT(pro)

  //设置搜索历史
  const CarouselHistory: searchHistoryInfo = {
    name: `${name}`
  }
  setSearchHistory(CarouselHistory)
}
onBeforeMount(() => {
  //查询一下是否有搜索历史
  setTimeout(getSearchHistory, 2000)
})
</script>

<template>
  <div :class="skin =='lightTheme' ?'titleLabel_lightTheme':'titleLabel' ">
    <input ref="fileInput" type="file" accept=".mp4, video/mp4" multiple @change="onFileSelected"
           style="display: none;" />
    <input ref="fileInput2" type="file" accept=".mp4, video/mp4" multiple
           style="display: none;" />
    <div style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      ">
      <div style="flex: 20%" class="titleName">
        <div v-show="!PlayStarted" class="iconTitle">
          <svg t="1725066372520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7518" width="18" height="18">
            <path
              d="M520.70912 515.8144m-469.69856 0a469.69856 469.69856 0 1 0 939.39712 0 469.69856 469.69856 0 1 0-939.39712 0Z"
              fill="#00DFD5" p-id="7519"></path>
            <path
              d="M520.71424 995.21536c-264.3456 0-479.40608-215.06048-479.40608-479.40608S256.36864 36.4032 520.71424 36.4032s479.40608 215.06048 479.40608 479.40608-215.06048 479.40608-479.40608 479.40608z m0-939.39712c-253.63968 0-459.99104 206.35136-459.99104 459.99104s206.35136 459.99104 459.99104 459.99104 459.99104-206.35136 459.99104-459.99104-206.35136-459.99104-459.99104-459.99104z"
              fill="#6C0000" p-id="7520"></path>
            <path
              d="M663.59296 84.89472c-161.85344-29.4656-334.05952 30.47424-440.97536 170.05056-152.07936 198.54336-114.41152 482.78016 84.13696 634.85952a452.11136 452.11136 0 0 0 128.59904 68.88448 450.71872 450.71872 0 0 1-193.8944-85.9136C42.91072 720.69632 5.24288 436.45952 157.32224 237.91104 278.784 79.33952 484.51584 23.52128 663.59296 84.89472z"
              fill="#99F0DD" p-id="7521"></path>
            <path
              d="M335.22176 598.41536m-47.34976 0a47.34976 47.34976 0 1 0 94.69952 0 47.34976 47.34976 0 1 0-94.69952 0Z"
              fill="#FFEB43" p-id="7522"></path>
            <path
              d="M335.22688 653.85472c-30.57152 0-55.44448-24.87296-55.44448-55.44448s24.87296-55.43424 55.44448-55.43424 55.43424 24.86784 55.43424 55.43424-24.86784 55.44448-55.43424 55.44448z m0-94.69952c-21.65248 0-39.26528 17.6128-39.26528 39.26016 0 21.65248 17.6128 39.26528 39.26528 39.26528 21.64224 0 39.26016-17.6128 39.26016-39.26528-0.00512-21.64736-17.61792-39.26016-39.26016-39.26016z"
              fill="#6B0306" p-id="7523"></path>
            <path
              d="M226.82624 335.58016m-29.98272 0a29.98272 29.98272 0 1 0 59.96544 0 29.98272 29.98272 0 1 0-59.96544 0Z"
              fill="#FFEB43" p-id="7524"></path>
            <path
              d="M226.82624 373.64736c-20.98688 0-38.0672-17.08032-38.0672-38.0672 0-20.99712 17.08032-38.07232 38.0672-38.07232 20.99712 0 38.07232 17.08032 38.07232 38.07232s-17.08032 38.0672-38.07232 38.0672z m0-59.96032a21.91872 21.91872 0 0 0-21.888 21.89824c0 12.06784 9.82016 21.888 21.888 21.888s21.89824-9.82016 21.89824-21.888a21.93408 21.93408 0 0 0-21.89824-21.89824z"
              fill="#6B0306" p-id="7525"></path>
            <path d="M605.39904 544.6144m-19.584 0a19.584 19.584 0 1 0 39.168 0 19.584 19.584 0 1 0-39.168 0Z"
                  fill="#FFEB43" p-id="7526"></path>
            <path
              d="M605.39904 572.288c-15.26272 0-27.66848-12.41088-27.66848-27.66848s12.41088-27.67872 27.66848-27.67872c15.26272 0 27.66848 12.416 27.66848 27.67872s-12.40576 27.66848-27.66848 27.66848z m0-39.17312a11.50976 11.50976 0 0 0-11.4944 11.49952c0 6.33344 5.15584 11.4944 11.4944 11.4944s11.4944-5.15584 11.4944-11.4944a11.51488 11.51488 0 0 0-11.4944-11.49952z"
              fill="#6B0306" p-id="7527"></path>
            <path
              d="M423.74144 202.54208m-17.71008 0a17.71008 17.71008 0 1 0 35.42016 0 17.71008 17.71008 0 1 0-35.42016 0Z"
              fill="#FFEB43" p-id="7528"></path>
            <path
              d="M423.74144 228.33664a25.82528 25.82528 0 0 1-25.79968-25.79968c0-14.21824 11.5712-25.78944 25.79968-25.78944s25.79968 11.5712 25.79968 25.78944a25.82528 25.82528 0 0 1-25.79968 25.79968z m0-35.40992a9.6256 9.6256 0 0 0 0 19.23584 9.6256 9.6256 0 0 0 0-19.23584z"
              fill="#6B0306" p-id="7529"></path>
            <path
              d="M721.5872 265.33888c-2.43712-6.92736-8.576-11.904-16.01536-12.99456l-48.896-7.15776-21.23264-43.42272c-3.30752-6.76352-10.4192-11.12576-18.13504-11.12576-7.69536 0-14.81728 4.36224-18.13504 11.12576l-21.23264 43.42272-48.88576 7.17312c-7.4496 1.07008-13.59872 6.04672-16.03584 12.99456a19.01568 19.01568 0 0 0 4.736 19.968l35.90144 35.33312-8.32 48.94208c-1.2544 7.33184 2.01728 14.8736 8.34048 19.20512 6.05696 4.096 14.55104 4.56192 21.0944 1.11616l42.55232-22.56896 42.5728 22.59456a20.5312 20.5312 0 0 0 21.10464-1.13664c6.28736-4.31616 9.55904-11.84768 8.30976-19.17952l-8.32-48.94208 35.90144-35.33312a19.07712 19.07712 0 0 0 4.69504-20.01408z"
              fill="#FFBD00" p-id="7530"></path>
            <path
              d="M669.4912 400.40448a28.80512 28.80512 0 0 1-13.3632-3.30752l-38.8096-20.59264-38.7584 20.5568c-9.00608 4.71552-21.10464 4.04992-29.4144-1.5616-8.96-6.12864-13.57312-16.82432-11.776-27.26912l7.60832-44.7744-32.89088-32.36864c-7.62368-7.49568-10.1888-18.3808-6.69696-28.39552 3.43552-9.80992 12.06272-16.83968 22.52288-18.35008l44.63616-6.53824 19.36896-39.59296c4.66944-9.51808 14.63808-15.66208 25.40544-15.66208 10.78272 0 20.75136 6.144 25.40544 15.66208l19.35872 39.59296 44.672 6.53824c10.43456 1.52576 19.0464 8.54528 22.47168 18.31936 3.5072 10.04032 0.96256 20.93056-6.65088 28.44672l-32.90112 32.37888 7.61344 44.77952c1.77664 10.43456-2.82112 21.11488-11.70432 27.20256a28.75392 28.75392 0 0 1-16.09728 4.93568z m-52.1728-42.2144l46.36672 24.59648a12.65152 12.65152 0 0 0 12.80512-0.70144c3.64032-2.49856 5.57056-6.87104 4.84864-11.10528l-9.0368-53.10464 38.912-38.2976c3.15392-3.11296 4.17792-7.43936 2.73408-11.5712-1.42336-4.0704-5.08928-7.00416-9.54368-7.66464l-53.12-7.77216-23.10656-47.25248c-3.91168-7.99232-17.81248-8.01792-21.73952 0.01024l-23.11168 47.24736-53.10464 7.7824c-4.48 0.65024-8.13568 3.584-9.56416 7.66976a10.97728 10.97728 0 0 0 2.7648 11.53024l38.912 38.2976-9.02144 53.10464c-0.73216 4.23936 1.20832 8.61696 4.93056 11.17184 3.43552 2.31424 8.94976 2.60608 12.75904 0.62976l46.31552-24.57088z"
              fill="#6B0204" p-id="7531"></path>
            <path
              d="M669.37344 84.90496c147.07712 75.37152 209.3312 251.58144 189.74208 427.1104-42.74688 383.0784-496.03584 424.40192-541.4912 409.1648a452.78208 452.78208 0 0 0 207.10912 49.92512c251.2384 0 454.912-203.66848 454.912-454.912 0.00512-200.6528-129.96608-370.8416-310.272-431.28832z"
              fill="#00D6C8" p-id="7532"></path>
            <path d="M873.8304 494.61248m-39.168 0a39.168 39.168 0 1 0 78.336 0 39.168 39.168 0 1 0-78.336 0Z"
                  fill="#FFEB43" p-id="7533"></path>
            <path
              d="M873.8304 541.87008c-26.05056 0-47.25248-21.20192-47.25248-47.26272 0-26.05056 21.20192-47.25248 47.25248-47.25248 26.0608 0 47.26272 21.20192 47.26272 47.25248-0.00512 26.0608-21.20704 47.26272-47.26272 47.26272z m0-78.336a31.10912 31.10912 0 0 0-31.07328 31.07328 31.11424 31.11424 0 0 0 31.07328 31.08352 31.11424 31.11424 0 0 0 31.08352-31.08352 31.11936 31.11936 0 0 0-31.08352-31.07328z"
              fill="#6B0306" p-id="7534"></path>
          </svg>
        </div>
        <div v-show="!PlayStarted" :class="skin == 'lightTheme' ? 'titleTextX' : 'titleText'">GlobeStream</div>
        <div v-show="PlayStarted">
          <n-button strong secondary style="  -webkit-app-region: no-drag;" size="small"
                    @click="closePlayStarted">

            <template #icon>
              <n-icon>
                <CashIcon />
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
      <div class="TaskbarCenter" style="
          flex: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;

        ">
        <div :class="focusState == true ?'animated-input expanded':'animated-input'"
             style="-webkit-app-region: no-drag;">
          <n-input-group>
            <n-popover trigger="click">
              <template #trigger>
                <n-input @focus="Onfocus" @blur="OnBlur" size="tiny" placeholder="输入影片名称..."
                         v-model:value="searchInputValue" />
              </template>
              <div v-show="SearchHistorys.length > 0" style="width: 400px;">
                <div style="padding: 5px;">
                  <n-space justify="space-between">
                    <span :style="skin=='lightTheme' ? 'color: #000;\n'+
'                                  font-size: 16px;\n'+
'                                  line-height: 17px;':'color: #fff;\n'+
'                                  font-size: 16px;\n'+
'                                  line-height: 17px;' ">搜索历史</span>
                    <n-button strong secondary circle type="error" @click="clearSearchHistory">
                      <template #icon>
                        <svg t="1725353260065" class="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="4716" width="15" height="15">
                          <path
                            d="M631 145.9c2.3-6.3 3.7-12.9 3.7-19.9 0-32.3-26.3-58.6-58.6-58.6H447.4c-32.3 0-58.6 26.3-58.6 58.6 0 7 1.4 13.7 3.7 19.9H138.4v74.7h746.7v-74.7H631z m-211.3-20c0-15.3 12.4-27.7 27.7-27.7h128.8c15.3 0 27.7 12.4 27.7 27.7 0 7.9-3.4 14.9-8.7 19.9H428.4c-5.3-4.9-8.7-12-8.7-19.9zM166.7 278.5v560c0 66.6 54.5 121 121 121h448c66.6 0 121-54.5 121-121v-560h-690z m195.4 473.1c0 14.5-11.9 26.4-26.4 26.4s-26.4-11.9-26.4-26.4V468.4c0-14.5 11.9-26.4 26.4-26.4s26.4 11.9 26.4 26.4v283.2z m164.5 0c0 14.5-11.9 26.4-26.4 26.4-14.5 0-26.4-11.9-26.4-26.4V468.4c0-14.5 11.9-26.4 26.4-26.4 14.5 0 26.4 11.9 26.4 26.4v283.2z m164.4 0c0 14.5-11.9 26.4-26.4 26.4s-26.4-11.9-26.4-26.4V468.4c0-14.5 11.9-26.4 26.4-26.4s26.4 11.9 26.4 26.4v283.2z"
                            fill="#F0AA1D" p-id="4717"></path>
                        </svg>
                      </template>
                    </n-button>
                  </n-space>
                </div>
                <div class="NeworldscroE" style="padding: 5px;height: 80px;">
                  <n-space>
                    <n-button tertiary size="small" round v-for="(item,index) in SearchHistorys" :key="index"
                              @click="OnClickSearchHistory(item.name)">
                      {{ item.name }}
                    </n-button>

                  </n-space>
                </div>
              </div>
              <n-tabs type="line" animated>
                <n-tab-pane name="热搜" tab="热搜">
                  <div style="  display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: flex-start;
                                align-items: center;
                                width: 400px;
                  ">
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic4.iqiyipic.com/image/20240711/77/aa/a_100533301_m_601_m10.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/66491.html','https://snzypic.vip/upload/vod/20240718-1/da3471d45ff9bd4b459b63fb8f72015b.jpg','唐朝诡事录之西行')">

                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          唐朝诡事录之西行
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic6.iqiyipic.com/image/20240823/8c/f7/a_100538841_m_601_m5.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/69796.html','https://snzypic.vip/upload/vod/20240823-1/1fd898cc6fe55637ae4a05e36d5a425f.jpg','四方馆')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          四方馆
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic1.iqiyipic.com/image/20240822/b5/5e/a_100585680_m_601_m4.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/69276.html','https://snzypic.vip/upload/vod/20240818-1/f2b594c70fedec95cbce263404cb6b83.jpg','前途无量')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          前途无量
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic3.iqiyipic.com/image/20240820/86/46/a_50117380_m_601_m22.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/16634.html','https://snzypic.vip/upload/vod/20230921-1/c4ffd2defa3631bddfb96b9e04db4333.jpg','西游记')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          西游记
                        </div>


                      </div>

                    </div>
                  </div>
                </n-tab-pane>
                <n-tab-pane name="电视剧" tab="电视剧">
                  <div style="  display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: flex-start;
                                align-items: center;
                                width: 400px;
                  ">
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic8.iqiyipic.com/image/20240809/5f/ac/a_100585216_m_601_m4_318_424.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/68367.html','https://snzypic.vip/upload/vod/20240808-1/1cd2feac632f61c26192990005c6cef3.jpg','幸福草')">

                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          幸福草
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic4.iqiyipic.com/image/20240823/9a/be/a_100584693_m_601_m6_318_424.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/68882.html','https://snzypic.vip/upload/vod/20240815-1/7e6e5ed7e7b3d84661befc1bf2f87497.jpg','侯门夫人不好当')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          侯门夫人不好当
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic2.iqiyipic.com/image/20240724/e1/d1/a_100544581_m_601_m19_318_424.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/400.html','https://snzypic.vip/upload/vod/20240426-1/861710ae1b865b4e8766a3f665e17e96.jpg','偷得将军半日闲')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          偷得将军半日闲
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic1.iqiyipic.com/image/20240712/8b/c9/a_1005175050001_d_705_m7_440_608.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/9031.html','https://snzypic.vip/upload/vod/20231128-1/bec3d1cadce75ead9f0282c233c2b8df.jpg','一念关山')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          一念关山
                        </div>


                      </div>

                    </div>
                  </div>
                </n-tab-pane>
                <n-tab-pane name="电影" tab="电影">
                  <div style="  display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: flex-start;
                                align-items: center;
                                width: 400px;
                  ">
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic3.iqiyipic.com/image/20240712/2d/1a/v_176778482_m_601_m10_318_424.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/62637.html','https://snzypic.vip/upload/vod/20240606-1/49d6866330b3747d54b9c18aef2a44fb.jpg','制暴')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          制暴
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic4.iqiyipic.com/image/20240822/42/83/v_176667961_m_601_m4_440_608.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/69426.html','https://snzypic.vip/upload/vod/20240820-1/ad10cb10735f47ba6c540e51315fd90f.jpg','狗阵')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              大陆</strong>
                          </n-breadcrumb-item>
                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          狗阵
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic1.iqiyipic.com/image/20240125/4e/76/v_1714153610003_d_705_440_608.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/32518.html','https://snzypic.vip/upload/vod/20230831-1/ab4227a6000d81f54f813d6c6d401045.jpg','保你平安')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          保你平安
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic8.iqiyipic.com/image/20240415/95/ff/v_1755596770003_d_705_440_608.webp">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/2549.html','https://snzypic.vip/upload/vod/20240328-1/1c47722319699fdc7a887440eb92fd05.jpg','被我弄丢的你')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              大陆</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          被我弄丢的你
                        </div>


                      </div>

                    </div>
                  </div>
                </n-tab-pane>
                <n-tab-pane name="综艺" tab="综艺">
                  <div style="  display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: flex-start;
                                align-items: center;
                                width: 400px;
                  ">
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic9.iqiyipic.com/image/20240814/f6/7e/a_100572321_m_601_m16.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/68992.html','https://snzypic.vip/upload/vod/20240816-1/fe5c6a76be85cb37a592fd16a9781ae5.jpg','喜剧之王单口季')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              国产</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          喜剧之王单口季
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic3.iqiyipic.com/image/20240809/5e/f2/a_100572239_m_601_m7.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/68596.html','https://snzypic.vip/upload/vod/20240811-1/ac222d91008c568782fad964cb5d612d.jpg','音乐缘计划')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              国产</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          音乐缘计划
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic6.iqiyipic.com/image/20240430/6e/3e/a_100569186_m_601_m9.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/166.html','https://snzypic.vip/upload/vod/20240419-1/2a2bad16ada52606685027469488ad99.jpg','奔跑吧第八季')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              国产</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          奔跑吧第八季
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic9.iqiyipic.com/image/20240224/e7/15/a_100545219_m_601_m9.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/112.html','https://snzypic.vip/upload/vod/20240223-1/2bb595e188ca2c265d107810f070a4fd.jpg','种地吧2')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              国产</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          种地吧2
                        </div>


                      </div>

                    </div>
                  </div>
                </n-tab-pane>
                <n-tab-pane name="动漫" tab="动漫">
                  <div style="  display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: flex-start;
                                align-items: center;
                                width: 400px;
                  ">
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic7.iqiyipic.com/image/20240611/82/3b/a_50167419_m_601_m91.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/3.html','https://snzypic.vip/upload/vod/20230911-1/708f29365f42f00240aa15df10db8b1a.jpg','名侦探柯南')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              日本</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          名侦探柯南
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic8.iqiyipic.com/image/20240823/ed/a7/a_100013977_m_601_m70.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/943.html','https://snzypic.vip/upload/vod/20230911-1/57b61c5428ad55cae57966c2320bc7de.jpg','航海王')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              日本</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          航海王
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic1.iqiyipic.com/image/20240708/66/46/a_100577014_m_601_m3.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/12671.html','https://snzypic.vip/upload/vod/20231103-1/0aa209d9ada3cbf008e959935d314c8a.jpg','蜡笔小新 第8季')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">日本</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          蜡笔小新 第8季
                        </div>


                      </div>

                    </div>
                    <div :class="skin == 'lightTheme' ?'search-recommend-card-X':'search-recommend-card' ">


                      <div style="width: 50%;height: 100%;padding: 5px;float: left;position: relative;">

                        <img style="height: 100%;width: 100%;border-radius: 5px"
                             src="https://pic4.iqiyipic.com/image/20240624/e9/fc/a_100579248_m_601.jpg">
                        <div
                          class="play_video"
                          style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 3;
                          "
                        >


                          <n-button text style="font-size: 24px"
                                    @click="setCarouselRecommend('/mov/64720.html','https://snzypic.vip/upload/vod/20240629-1/c5b377a417c2d5175d4a57584529b79a.jpg','亚刻奥特曼')"
                          >
                            <n-icon>
                              <logoGoogle-playstore />
                            </n-icon>

                          </n-button>
                        </div>

                      </div>
                      <div style="width: 50%;height: 100%;padding: 5px;float: right;">
                        <span>10.0分
                          <n-tag type="error">
                            热
                          </n-tag>
                        </span>
                        <n-breadcrumb>
                          <n-breadcrumb-item>
                            <strong
                              :style=" skin == 'lightTheme' ? ' color: rgb(18 18 18 / 30%); ' : ' color: rgb(255 255 255 / 30%); ' ">
                              日本</strong>
                          </n-breadcrumb-item>


                        </n-breadcrumb>
                        <div style="display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;">
                          亚刻奥特曼
                        </div>


                      </div>

                    </div>
                  </div>
                </n-tab-pane>
              </n-tabs>
            </n-popover>
            <n-button type="info" size="tiny" @click="OnClickSearch">
              搜索
            </n-button>
          </n-input-group>


        </div>


      </div>
      <div class="TernarylinkageR" style="flex: 20%">
        <div class="Ternarylinkage">
          <div :class="skin =='lightTheme' ? 'BinarylinkageGanX' :'BinarylinkageGan' " @click="ipcHandleClose">
            <svg t="1679034496978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="9573" width="15" height="15">
              <path
                d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                p-id="9574" fill="#8a8a8a"></path>
            </svg>
          </div>

          <div :class="skin == 'lightTheme' ? 'BinarylinkageX' : 'Binarylinkage' " @click="ipcHandleMax">
            <svg t="1679034543228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="10836" width="15" height="15">
              <path
                d="M832 640l-128 0 0-256 128 0c105.9 0 192-86.1 192-192s-86.1-192-192-192-192 86.1-192 192l0 128L384 320l0-128c0-105.9-86.1-192-192-192s-192 86.1-192 192 86.1 192 192 192l128 0 0 256L192 640c-105.9 0-192 86.1-192 192 0 105.9 86.1 192 192 192s192-86.1 192-192l0-128 256 0 0 128c0 105.9 86.1 192 192 192s192-86.1 192-192S937.9 640 832 640zM704 192c0-70.6 57.4-128 128-128s128 57.4 128 128-57.4 128-128 128l-128 0L704 192zM192 320c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128l0 128L192 320zM320 832c0 70.6-57.4 128-128 128s-128-57.4-128-128 57.4-128 128-128l128 0L320 832zM384 384l256 0 0 256L384 640 384 384zM832 960c-70.6 0-128-57.4-128-128l0-128 128 0c70.6 0 128 57.4 128 128S902.6 960 832 960z"
                p-id="10837" fill="#8a8a8a"></path>
            </svg>
          </div>
          <div :class="skin == 'lightTheme' ? 'BinarylinkageX' : 'Binarylinkage' " @click="ipcHandleMin">
            <svg t="1679034573870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="11924" width="15" height="15">
              <path d="M832 521.6H192c-19.2 0-32-12.8-32-32s12.8-32 32-32h640c19.2 0 32 12.8 32 32s-12.8 32-32 32z"
                    fill="#bfbfbf" p-id="11925"></path>
            </svg>
          </div>
          <div :class="skin == 'lightTheme' ? 'BinarylinkageX' : 'Binarylinkage' " style="width: 15%">
            <n-popover trigger="hover">
              <template #trigger>
                <div>
                  <svg t="1710922892877" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="7749" width="15" height="15">
                    <path
                      d="M509.043157 417.431158c-52.987818 0-96.134501 43.098587-96.134501 96.133478 0 52.989865 43.146683 96.136547 96.134501 96.136547s96.134501-43.146683 96.134501-96.136547C605.178681 460.57784 562.030975 417.431158 509.043157 417.431158z"
                      fill="#272636" p-id="7750"></path>
                    <path
                      d="M962.204074 505.346463c-1.732457-27.29567-8.763594-53.700039-20.889773-78.843696-4.623297-9.657964-13.860682-15.379269-25.25315-14.802124l-60.943001 3.778046c-7.297197-26.613124-17.48421-51.862181-30.391171-75.487252l48.923246-55.43352c7.033184-7.977695 8.555863-19.422352 3.829212-28.976962-12.33391-25.090445-28.975938-46.925752-49.340755-64.881706-20.422122-18.003026-44.148499-31.756261-70.501704-40.943504-9.971096-3.463891-21.205974-0.576121-28.29237 7.454786l-40.368406 45.721321c-23.883967-13.542434-48.925293-24.199145-74.854848-31.757285l-4.619204-73.963549c-0.683569-10.602476-7.664563-19.789719-17.743106-23.202445-24.783453-8.4126-50.126654-12.388145-76.031651-11.190877l0 0.082888-1.52575 0 0-0.082888c-25.90295-1.198292-51.248198 2.778276-76.030627 11.190877-10.079566 3.412726-17.060561 12.599969-17.743106 23.202445l-4.619204 73.963549c-25.931602 7.55814-50.971905 18.21485-74.854848 31.757285l-40.368406-45.721321c-7.088442-8.03193-18.322297-10.918677-28.293393-7.454786-26.353205 9.187243-50.079582 22.940478-70.500681 40.943504-20.36584 17.955954-37.007869 39.792285-49.341778 64.881706-4.725628 9.55461-3.202948 20.999266 3.830235 28.976962l48.924269 55.43352c-12.909008 23.62507-23.094998 48.874127-30.392194 75.487252l-60.943001-3.778046c-11.391445-0.577145-20.629853 5.143137-25.252127 14.802124-12.126178 25.143657-19.158339 51.548026-20.890796 78.843696-1.629103 27.244504 2.046612 54.384631 10.969842 80.736812 3.411703 10.027377 12.598946 17.009396 23.150256 17.691941l73.963549 4.618181c7.614421 25.931602 18.267039 51.074236 31.81459 74.855872l-45.828768 40.418548c-7.979742 7.090489-10.918677 18.269086-7.402597 28.293393 9.18622 26.354228 22.890336 50.030463 40.948621 70.659293 18.10945 20.36584 39.946804 37.007869 64.87966 49.29266 9.553587 4.720511 21.051455 3.201925 28.975938-3.88754l55.486732-48.873104c23.620977 12.915148 48.870034 23.044856 75.483158 30.342052l-3.77907 60.891835c-0.626263 10.658757 5.14416 20.577664 14.753005 25.195845 24.982998 12.181437 51.444673 19.266809 78.896908 20.998243 1.195222 0.092098 2.382257 0.153496 3.568269 0.211824l0 0.172939 3.158946 0 0-0.198521c1.041726-0.054235 2.082428-0.105401 3.131317-0.186242 27.452235-1.730411 53.91391-8.815783 78.897931-20.998243 9.608845-4.618181 15.379269-14.537088 14.753005-25.195845l-3.77907-60.891835c26.613124-7.29822 51.863205-17.426905 75.484182-30.342052l55.486732 48.873104c7.924483 7.089465 19.422352 8.608052 28.975938 3.88754 24.932856-12.284791 46.77021-28.92682 64.87966-49.29266 18.057261-20.62883 31.762401-44.305065 40.948621-70.659293 3.51608-10.025331 0.577145-21.203928-7.402597-28.293393l-45.828768-40.418548c13.546527-23.781636 24.199145-48.925293 31.81459-74.855872l73.963549-4.618181c10.55131-0.682545 19.736507-7.664563 23.14821-17.691941C960.157461 559.731094 963.833177 532.590967 962.204074 505.346463zM511.034511 705.69856c-105.96745 0-191.869912-86.424348-191.869912-193.032388 0-106.609063 85.902462-193.032388 191.869912-193.032388 105.966427 0 191.867866 86.423325 191.867866 193.032388C702.902376 619.274212 616.999914 705.69856 511.034511 705.69856z"
                      fill="#bfbfbf" p-id="7751" data-spm-anchor-id="a313x.search_index.0.i11.19ff3a81MiiXrv"
                      class="selected"></path>
                  </svg>
                </div>
              </template>
              <!-- Blogger -->
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>打开本地视频播放</span>
                    <n-button size="tiny" @click="selectFiles">打开</n-button>
                  </div>
                </div>
              </div>
              <div v-show="false" class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>打开下载视频</span>
                    <n-button size="tiny">查看</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>历史记录</span>
                    <n-button size="tiny" @click="getHistory">查看</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>清空历史记录</span>
                    <n-button size="tiny" @click="clearHistory">清空</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>我的收藏</span>
                    <n-button size="tiny" @click="getFavorite">查看</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>清空收藏</span>
                    <n-button size="tiny" @click="clearFavorite">清空</n-button>
                  </div>
                </div>
              </div>
              <div v-show="false" class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>启动多线程下载</span>
                    <n-switch :round="false" @update:value="threadFun" />
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>启动智能线路</span>
                    <n-switch :value="isSmartRouteEnabled" :round="false" @update:value="intelligenceFun" />
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>当前版本：v{{ versionB }}</span>
                    <n-button size="tiny" @click="checkForUpdates">检查版本</n-button>
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
          <div v-show="false" class="Binarylinkage" style="width: 15%">
            <n-popover trigger="hover">
              <template #trigger>
                <div>
                  <svg t="1721807141268" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="8505" width="15" height="15">
                    <path
                      d="M157.184 526.208l270.72 270.592a20.224 20.224 0 0 0 28.544 0l270.72-270.592c79.744-79.744 87.808-210.56 10.496-292.608a205.824 205.824 0 0 0-284.672-14.72 16.256 16.256 0 0 1-21.632 0 205.824 205.824 0 0 0-284.672 14.592c-77.184 82.176-69.12 212.992 10.496 292.736z"
                      fill="#FFFFFF" p-id="8506"></path>
                    <path
                      d="M442.24 821.888a39.296 39.296 0 0 1-27.904-11.52L143.616 539.776c-88.448-88.448-93.44-231.808-10.88-319.36a224.384 224.384 0 0 1 309.376-17.536 224.384 224.384 0 0 1 309.376 17.536c82.432 87.552 77.568 230.4-10.88 319.36L470.016 810.368a39.296 39.296 0 0 1-27.776 11.52zM296.704 187.776a186.368 186.368 0 0 0-136.064 59.008c-68.352 72.576-64 192 10.112 265.856l270.72 270.592a1.152 1.152 0 0 0 1.408 0L713.6 512c73.984-73.984 78.464-193.28 10.112-265.856a186.112 186.112 0 0 0-258.048-12.8 35.456 35.456 0 0 1-46.848 0 185.6 185.6 0 0 0-122.112-45.568z"
                      fill="#501192" p-id="8507"></path>
                    <path
                      d="M587.648 722.816l146.56 146.432a10.88 10.88 0 0 0 15.488 0L896 722.816a115.2 115.2 0 0 0 5.632-158.464 111.488 111.488 0 0 0-153.6-7.936 8.832 8.832 0 0 1-11.776 0 111.488 111.488 0 0 0-153.6 7.936 115.2 115.2 0 0 0 4.992 158.464z"
                      fill="#DED5EB" p-id="8508"></path>
                    <path
                      d="M742.4 891.776a29.952 29.952 0 0 1-21.76-8.576L574.08 736.384a134.016 134.016 0 0 1-6.144-185.216A130.304 130.304 0 0 1 742.4 536.448a130.304 130.304 0 0 1 173.952 14.72 134.016 134.016 0 0 1-6.144 185.216L763.264 883.2a29.952 29.952 0 0 1-20.864 8.576z m-79.232-343.424a92.16 92.16 0 0 0-67.2 29.184A95.36 95.36 0 0 0 601.6 709.248l140.8 140.8 140.8-140.8a95.36 95.36 0 0 0 5.248-131.712 92.032 92.032 0 0 0-128-6.528 28.032 28.032 0 0 1-36.864 0 91.776 91.776 0 0 0-60.416-22.656z"
                      fill="#501192" p-id="8509"></path>
                  </svg>
                </div>
              </template>
              <!-- Blogger -->
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px !important">
                  <!-- <div
                    style="display: flex; align-items: flex-start; justify-content: space-between"
                  >
                    <span>UP主：盛为梦-Azure</span>
                    <n-button size="tiny">关注</n-button>
                  </div> -->
                  <div style="width: 100%; height: 100px">
                    <div style="float: left; width: 50%; height: 100%">
                      <img style="width: 100%; height: 100%; border-radius: 15px"
                           src="https://i1.hdslb.com/bfs/face/d5e1506c886cf86475ff729a6a7f0d65115bd873.jpg@240w_240h_1c_1s_!web-avatar-space-header.avif" />
                    </div>
                    <div style="float: right; width: 50%; height: 100%">
                      <span style="font-size: 10px">1999年2月出生</span>
                      <p style="font-size: 10px">性别：男</p>
                      <p style="font-size: 10px">学校：清华大学18届</p>
                      <p style="font-size: 10px">所属学科：计算机科学与技术</p>
                    </div>
                  </div>
                  <div style="text-align: left; padding: 3px; padding-left: 0">
                    <span>技术老、测试员、喝咖啡，努力赚钱才是王道，保重身体更是重中之重,修生养息</span>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>UP主：盛为梦-Azure</span>
                    <n-button size="tiny" @click="openUp">关注</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>粉丝</span>
                    <n-button size="tiny" @click="openUp">200+</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>动态</span>
                    <n-button size="tiny" @click="openUp">100+</n-button>
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
          <div :class="skin == 'lightTheme' ? 'BinarylinkageX' : 'Binarylinkage' " style="width: 15%">
            <n-popover trigger="hover">
              <template #trigger v-if="notices.length > 0">

                <n-badge :value="notices.length" :max="99">
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
              <template #trigger v-else>

                <div>
                  <svg t="1710925326942" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="8472" width="15" height="15">
                    <path
                      d="M889.828994 749.637494c-1.204099-1.720141-119.205779-165.821603-119.205779-287.435579 0-168.401814-76.202251-254.752898-162.725349-286.919536L607.897867 159.973123c0-52.980346-43.175542-95.983874-95.983874-95.983874S415.930119 107.164791 415.930119 159.973123l0 15.309256c-86.523098 32.166639-162.725349 118.517722-162.725349 286.919536 0 121.269948-118.00168 285.199395-119.205779 286.919536-5.332437 7.568621-7.396607 16.857383-5.332437 25.974131 2.064169 8.944734 7.912649 16.685369 15.997312 20.985721 5.676466 3.096254 107.336805 57.280699 233.423148 84.458928 21.32975 66.397447 73.966068 111.29313 133.654964 111.29313s112.325214-44.895683 133.654964-111.29313c126.086343-27.178229 227.746682-81.018646 233.423148-83.942886 8.256677-4.472367 13.933143-12.040988 16.169326-20.985721C897.225601 766.666891 895.333445 757.206115 889.828994 749.637494zM479.919368 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625 17.545439 0 31.994625 14.449185 31.994625 31.994625l0 0.860071c-7.224593-0.516042-14.277171-0.860071-21.32975-0.860071l-21.32975 0c-7.052579 0-14.105157 0.344028-21.32975 0.860071L479.919368 159.973123 479.919368 159.973123zM511.913993 928.016126c-22.361834 0-43.175542-13.417101-57.968755-35.262893 19.26558 2.064169 38.531161 3.268268 57.968755 3.268268s38.875189-1.376113 57.968755-3.268268C555.089535 914.599026 534.275827 928.016126 511.913993 928.016126z"
                      fill="#dbdbdb" p-id="8473"></path>
                  </svg>
                </div>

              </template>
              <n-space vertical>
                <n-alert v-for="(item,index) in notices" :key="index" :title="item.title" type="default"
                         @close="removeSpecifiedNotices(index)"
                         :show-icon="false" closable :bordered="false">
                  <span>{{ item.message }}</span>
                </n-alert>
              </n-space>

            </n-popover>
          </div>
          <div :class="skin == 'lightTheme' ? 'BinarylinkageX' : 'Binarylinkage' " style="width: 15%">
            <n-popover trigger="hover">
              <template #trigger>
                <div>
                  <svg t="1724228351884" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="6664" width="15" height="15">
                    <path
                      d="M490.3424 715.8272c-28.2624 0-51.2-22.9376-51.2-51.2v-119.6544c0-45.312 36.864-82.1248 82.1248-82.1248h305.92V286.2592h-79.0528c-28.2624 0-51.2-22.9376-51.2-51.2s22.9376-51.2 51.2-51.2h99.328c45.312 0 82.1248 36.864 82.1248 82.1248v217.088c0 45.312-36.864 82.1248-82.1248 82.1248h-305.92v99.4304c0 28.2624-22.9376 51.2-51.2 51.2z m357.12-429.568z"
                      fill="#FFE37B" p-id="6665"></path>
                    <path
                      d="M686.8992 393.3184H198.5024c-51.6608 0-93.4912-41.8816-93.4912-93.4912v-129.536C105.0112 118.6816 146.8928 76.8 198.5024 76.8h488.3456c51.6608 0 93.4912 41.8816 93.4912 93.4912v129.536c0.0512 51.6096-41.8304 93.4912-93.44 93.4912zM539.8528 961.792H443.5456c-32.0512 0-58.0608-26.0096-58.0608-58.0608v-181.0432c0-32.0512 26.0096-58.0608 58.0608-58.0608h96.3072c32.0512 0 58.0608 26.0096 58.0608 58.0608v181.0432c0 32.0512-26.0096 58.0608-58.0608 58.0608z"
                      fill="#8C7BFD" p-id="6666"></path>
                  </svg>
                </div>
              </template>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div
                  :class="skin =='lightTheme' ?'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height':' accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height'"
                  style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>{{ skin == 'lightTheme' ? '耀白' : '暗黑' }}</span>
                    <n-button size="tiny" @click="SetOnSkin">切换</n-button>
                  </div>
                </div>
              </div>


            </n-popover>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.search-recommend-card-X:hover .play_video {
  display: block;
}

.play_video {
  display: none;
}

.search-recommend-card:hover .play_video {
  display: block;
}

.search-recommend-card {
  width: 150px;
  height: 110px;
  margin: 4px;
  background-color: #3e3e43;
  border: 1px solid #3e3e45;
  border-radius: 5px;
  flex: 1 1 auto;
}

.search-recommend-card:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.search-recommend-card-X {
  width: 150px;
  height: 110px;
  margin: 4px;
  background-color: #f1f1f1;
  border: 1px solid #fafafc;
  border-radius: 5px;
  flex: 1 1 auto;
}

.search-recommend-card-X:hover {
  box-shadow: 0 0 10px rgba(66, 64, 64, 0.3);
}

@media (max-width: 620px) {
  .iconTitle {
    display: none;
  }

  .titleTextX {
    display: none;
  }

  .titleText {
    display: none;
  }

  .Ternarylinkage {
    display: none;
  }

  .TernarylinkageR {
    display: none;
  }

  .TaskbarCenter {
    flex: 100% !important;
    padding-top: 4px;
  }

  .animated-input.expanded {
    width: 150px !important;
  }
}

.TernarylinkageR {

}

.TaskbarCenter {

}

.animated-input {
  transition: width 0.5s ease-in-out;
  width: 130px;

  outline: none;
  cursor: pointer;
}

.animated-input.expanded {
  width: 300px;
}

.BinarylinkageX {
  width: 15%;
  height: 28px;
  /* background-color: aqua; */
  /* padding-top: 10%; */
  float: right;
  padding: 6px;
  /* margin-top: 6px; */
  /* padding-top: 6px; */
  text-align: center;
  -webkit-app-region: no-drag;
  margin-top: 2px;
  border-radius: 5px;
}

.BinarylinkageX:hover {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-color: #bfbfbf;
  transition: all 0.2s ease-in-out;
  background-color: #eeeeef;
}


.Binarylinkage {
  width: 15%;
  height: 28px;
  /* background-color: aqua; */
  /* padding-top: 10%; */
  float: right;
  padding: 6px;
  /* margin-top: 6px; */
  /* padding-top: 6px; */
  text-align: center;
  -webkit-app-region: no-drag;
  margin-top: 2px;
  border-radius: 5px;
}

.Binarylinkage:hover {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
  background-color: #333333;
}

.BinarylinkageGanX {
  width: 15%;
  height: 28px;
  float: right;
  padding: 6px;
  border-top-right-radius: 5px;
  text-align: center;
  -webkit-app-region: no-drag;
  margin-top: 3px;
  border-radius: 5px;
  border-top-right-radius: 10px;
  margin-right: 5px;
}

.BinarylinkageGanX:hover {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
  background-color: #dd1426;
}

.BinarylinkageGan {
  width: 15%;
  height: 28px;
  float: right;
  padding: 6px;
  border-top-right-radius: 5px;
  text-align: center;
  -webkit-app-region: no-drag;
  margin-top: 2px;
  border-radius: 5px;
  border-top-right-radius: 10px;
  margin-right: 4px;
}

.BinarylinkageGan:hover {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
  background-color: #c20f1e;
}

.Ternarylinkage {
  width: 195px;
  height: 30px;
  /* background: #009966; */
  float: right;
}

.titleText {
  float: left;
  margin-left: 15px;
  color: #eaeaea;
}

.iconTitle {
  width: 16px;
  height: 16px;
  float: left;
}

.titleName {
  float: left;
  padding-top: 5px;
  padding-left: 10px;
  font-size: 13px;
}

.titleTextX {
  float: left;
  margin-left: 15px;
  color: #1b1a1a;
}


.titleLabel_lightTheme {
  position: fixed;
  z-index: 100;
  height: 33px;
  width: 99.9%;
  top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  -webkit-app-region: drag;
  background-color: #ffff;

  color: #1c1c1c;
}

.titleLabel {
  position: fixed;
  z-index: 100;
  height: 33px;
  width: 99.9%;
  top: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  -webkit-app-region: drag;
  background-color: #222222;
  border-top: 0.1px solid #4d4b4b;
  /* border-right: 0.1px solid #4d4b4b; */
}

.accountPmc_Card_PX {
  width: 230px;
  height: 220px;
  background-color: #f4f5f5;
  border: 1px solid #fafafc;
  border-radius: 5px;
  margin: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  flex: 1 1 auto;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s,
  box-shadow 0.3s !important;
}

.accountPmc_Card_PX:hover {

  box-shadow: 0 0 10px rgba(66, 64, 64, 0.3);

}

.accountPmc_Card_P {
  width: 230px;
  height: 220px;
  background-color: rgb(39, 39, 39);
  border: 1px solid rgb(28, 28, 28);
  border-radius: 5px;
  margin: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  flex: 1 1 auto;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s,
  box-shadow 0.3s !important;
}

.accountPmc_Card_P:hover {

  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);

}

.accountPmc_Card_P_d {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.setup_button_height {
  height: 55px !important;
}

.accountPmc_Card_P_Hideout {
  height: 40px !important;
}

.accountPmc_Card_row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.accountPmc_Card {
  margin-top: 3px;
  flex: 1 1 auto;
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
</style>
