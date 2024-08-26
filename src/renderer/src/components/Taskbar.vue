<script setup lang="ts">
import { useDialog, useMessage, useNotification, useLoadingBar } from 'naive-ui'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ArrowUndoOutline as CashIcon } from '@vicons/ionicons5'
import axios from 'axios'
import IndexedDBManager from '../indexedDB.js'

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

const OnClickSearch = () => {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setplayRoute(searchInputValue.value + '${' + `${timestamp}`)
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
          <svg t="1724405876214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4622" width="18" height="18"><path d="M515.92192 543.55968m-343.94112 0a343.94112 343.94112 0 1 0 687.88224 0 343.94112 343.94112 0 1 0-687.88224 0Z" fill="#BED5E9" p-id="4623"></path><path d="M515.65568 894.68416c-161.75104 0-301.80864-109.82912-340.58752-267.08992-46.32064-187.93984 68.87936-378.54208 256.8192-424.87808a352.58368 352.58368 0 0 1 84.3008-10.28608c161.75104 0 301.80864 109.82912 340.58752 267.09504 46.32064 187.93984-68.87936 378.53696-256.8192 424.87296a352.6144 352.6144 0 0 1-84.3008 10.28608z m0.53248-688.04096c-27.10528 0-54.3232 3.31776-80.896 9.87136-180.3264 44.46208-290.86208 227.34336-246.40512 407.67488 37.20192 150.89152 171.5712 256.2816 326.77376 256.2816 27.10528 0 54.3232-3.31776 80.896-9.87136 180.3264-44.45696 290.86208-227.34336 246.40512-407.66976-37.20704-150.90176-171.5712-256.28672-326.77376-256.28672z" fill="#6C0000" p-id="4624"></path><path d="M511.73376 353.10592c-238.4384-8.4736-493.83424 37.88288-497.4848 140.5184-3.65056 102.62016 247.81312 166.99904 486.25152 175.47264 238.44352 8.47872 493.83936-37.88288 497.4848-140.50304 3.65056-102.6304-247.808-167.00928-486.25152-175.488z m465.99168 174.7712c-2.34496 65.87392-206.64832 132.3776-476.5696 122.78272-269.92128-9.59488-468.98688-90.43968-466.64704-156.3136 2.33984-65.87392 206.64832-132.39808 476.5696-122.8032 269.92128 9.59488 468.98688 90.46016 466.64704 156.33408z" fill="#6B0306" p-id="4625"></path><path d="M232.87808 366.4384c-8.31488 10.16832-16.62976 26.64448-20.50048 34.81088 81.66912-18.63168 178.11456-24.59136 296.61696-20.3776 131.0976 4.6592 239.7184 21.62176 322.42688 50.0224-3.2-8.83712-14.17216-31.76448-18.02752-40.192-89.95328-26.81856-190.6688-50.91328-302.66368-54.89664-101.9392-3.61984-190.70976 14.10048-277.85216 30.63296z" fill="#BED5E9" p-id="4626"></path><path d="M626.14528 640.2816m-88.576 0a88.576 88.576 0 1 0 177.152 0 88.576 88.576 0 1 0-177.152 0Z" fill="#FFC700" p-id="4627"></path><path d="M626.2016 734.78656h-0.01024c-1.12128 0-2.26816-0.0256-3.39968-0.06144-52.0704-1.85344-92.928-45.7216-91.08992-97.792 1.85344-52.24448 45.41952-93.01504 97.79712-91.0848 52.0704 1.85344 92.928 45.7216 91.08992 97.792a94.15168 94.15168 0 0 1-94.3872 91.14624z m-0.11264-177.15712a82.31424 82.31424 0 0 0-82.53952 79.7184c-1.61792 45.5424 34.11456 83.9168 79.66208 85.54496l2.9952 0.0512a82.33472 82.33472 0 0 0 82.53952-79.72352c1.61792-45.53728-34.11456-83.91168-79.66208-85.53472l-2.9952-0.05632z" fill="#6C0000" p-id="4628"></path><path d="M807.26528 251.19744m-18.83648 0a18.83648 18.83648 0 1 0 37.67296 0 18.83648 18.83648 0 1 0-37.67296 0Z" fill="#FFC700" p-id="4629"></path><path d="M807.28064 275.95776l-0.89088-0.01536a24.80128 24.80128 0 0 1-23.87968-25.6256 24.6784 24.6784 0 0 1 24.73472-23.8848c14.5408 0.50176 25.25184 11.99616 24.76544 25.64096a24.66816 24.66816 0 0 1-24.7296 23.8848z m0.41984-37.67296c-7.43936 0-13.09696 5.47328-13.3376 12.44672a12.93312 12.93312 0 0 0 12.44672 13.37344l0.47616 5.92896v-5.92384a12.85632 12.85632 0 0 0 12.88704-12.45184 12.93312 12.93312 0 0 0-12.44672-13.37344h-0.0256z" fill="#6C0000" p-id="4630"></path><path d="M109.1072 396.40064m-46.69952 0a46.69952 46.69952 0 1 0 93.39904 0 46.69952 46.69952 0 1 0-93.39904 0Z" fill="#FFC700" p-id="4631"></path><path d="M109.12768 449.02912l-1.89952-0.03584c-28.99968-1.03424-51.75808-25.46176-50.72896-54.45632a52.43904 52.43904 0 0 1 52.56704-50.75456l1.89952 0.03584a52.2752 52.2752 0 0 1 36.64896 16.72192 52.3008 52.3008 0 0 1 14.08 37.73952 52.42368 52.42368 0 0 1-52.56704 50.74944z m-0.05632-93.40416a40.61184 40.61184 0 0 0-40.71936 39.33184c-0.79872 22.46656 16.83456 41.3952 39.296 42.19904l1.47968 0.0256a40.6016 40.6016 0 0 0 40.71936-39.32672 40.51456 40.51456 0 0 0-10.89536-29.24544 40.5504 40.5504 0 0 0-28.40064-12.96384l-1.47968-0.02048z" fill="#6C0000" p-id="4632"></path><path d="M537.94304 203.50464c8.74496 2.21184-13.89568 24.84224-4.6336 37.26336 9.2672 12.42112 5.56032 11.68384 9.2672 12.42112 20.19328 4.03456 32.5888-13.88544 46.0032-10.85952 5.3504 1.20832 8.61184 12.75392 13.24544 25.17504 4.6336 12.42112 19.37408 9.35424 19.5072 14.6688 0.20992 8.46848 5.89824 21.27872-3.36896 33.70496-9.2672 12.42112-40.14592 8.5504-47.72352 14.03392-10.0608 7.28576-90.76736-33.04448-36.92544 22.65088 5.41696 5.60128 29.11744-0.31232 37.6064 6.4256 36.864 29.25056 36.51584-2.28352 45.77792 55.68512s-5.2992 69.69344-9.2672 74.53184c-22.6304 27.61216-31.96928 26.60864-35.49696 18.70848-4.608-10.3168 35.49696-35.27168 3.06688-55.97696l-32.43008-20.70528s-22.4768-16.00512-16.14848-25.79456c3.56864-5.52448 18.04288-16.8704-19.0208-49.9968s-53.62176 9.984-72.15104-31.42144c-18.52928-41.40544-11.73504-51.28704-11.73504-80.27136s-0.68096-29.78304-0.68096-29.78304 51.29216-26.59328 115.10784-10.46016z" fill="#FFEC43" p-id="4633"></path><path d="M578.4576 518.67136c-3.06688 0-8.68864-1.08032-11.92448-8.34048-2.88256-6.4512 1.65376-13.14304 6.44608-20.22912 4.72064-6.95808 10.05056-14.84288 8.6528-21.66272-0.83456-4.01408-4.13184-7.8848-9.80992-11.50976l-32.44032-20.70016c-4.76672-3.38944-26.85952-20.16256-17.93024-34.00192 0.384-0.59392 0.85504-1.23904 1.38752-1.9456 3.63008-4.83328 10.37824-13.82912-19.3792-40.4224-12.05248-10.78272-20.97152-12.16512-27.392-12.16512-3.47136 0-6.68672 0.44544-9.70752 0.84992-3.19488 0.43008-6.20032 0.80896-9.08288 0.80896-12.04224 0-20.24448-6.85056-27.42784-22.91712-14.9248-33.36192-14.03392-47.64672-12.91264-65.72544 0.31232-5.07904 0.66048-10.54208 0.66048-16.96256 0-18.08896-0.26624-24.87808-0.43008-27.32032l-3.65568-4.30592 6.59456-3.42528c1.28512-0.6656 31.98464-16.31744 75.79648-16.31744 14.75072 0 29.38368 1.81248 43.48416 5.376 2.59072 0.65536 4.60288 2.25792 5.67808 4.51072 2.19648 4.61824-0.17408 9.71264-3.17952 16.16896-2.8928 6.22592-6.85056 14.7456-3.84 18.78528 3.93216 5.25824 5.73952 8.43264 6.7072 10.32704 1.46944 0.2304 2.62656 0.31232 3.75808 0.31232 6.90688 0 13.03552-3.06688 18.95936-6.02112 7.03488-3.51232 14.87872-6.96832 22.41024-5.28896 7.68 1.73056 11.10528 11.24352 15.44192 23.28576l2.048 5.59104c1.59744 4.28544 4.95104 5.6064 9.89184 7.12704 3.68128 1.13152 9.83552 3.03616 9.984 9.472 0.04608 1.81248 0.39424 3.85024 0.75264 6.0672 1.36704 8.3968 3.21536 19.89632-5.2992 31.3088-7.18336 9.64608-22.61504 11.35104-35.00544 12.71808-5.19168 0.57344-12.29824 1.3568-13.98784 2.57536-5.21728 3.7632-16.49664 1.24928-29.99808-2.08896-8.43264-2.08896-17.408-4.01408-22.25664-4.13696 1.2288 2.59072 4.9152 8.38656 16.1024 19.96288 1.42336 0.89088 8.28416 0.94208 12.3904 0.9728 9.14944 0.07168 18.60096 0.14336 24.64256 4.93568 12.5184 9.92768 20.16256 12.27776 25.7536 13.99296 14.10048 4.33664 16.39424 9.00096 22.21056 45.3888 9.08288 56.9088-4.13184 71.91552-9.76384 78.32576l-0.77312 0.896c-14.37184 17.55648-25.04192 25.728-33.55648 25.728zM476.06784 335.85664c12.4928 0 23.7056 4.82304 35.28192 15.17568 33.37728 29.81888 29.32736 45.22496 20.96128 56.36096l-0.91136 1.25952c-1.5616 2.42688 5.94432 11.55584 14.61248 17.76128l32.18432 20.52608c8.46848 5.40672 13.53728 11.83232 15.0272 19.09248 2.42688 11.71968-4.7104 22.2464-10.43456 30.70976-2.08384 3.07712-5.24288 7.7312-5.2992 9.3184 0.45056 0.75776 0.79872 0.75776 0.9728 0.75776 1.14688 0 7.71584-1.02912 24.3968-21.376l1.03936-1.21344c4.15232-4.71552 15.16544-17.22368 6.95296-68.62848-5.30944-33.26464-6.46656-33.62304-13.98784-35.93216-6.1184-1.87904-15.36512-4.72064-29.62432-16.04096-2.84672-2.25792-11.24352-2.31936-17.37728-2.36544-8.84736-0.06144-16.49664-0.12288-20.8128-4.5824-16.80896-17.39264-22.21056-26.87488-19.26144-33.82272 1.2032-2.8416 4.27008-6.23104 12.05248-6.23104 6.59456 0 15.81568 2.28352 24.71936 4.49024 7.52128 1.86368 15.2832 3.78368 19.50208 3.78368 0.91136 0 1.25952-0.09728 1.27488-0.09728 3.64544-2.74944 10.4448-3.49184 19.06688-4.44928 10.112-1.11616 22.69696-2.50368 26.81344-8.02304 5.50912-7.39328 4.28032-14.99136 3.08736-22.33856a91.27936 91.27936 0 0 1-0.76288-5.54496c-0.56832-0.18944-1.2288-0.39424-1.77152-0.56832-5.1456-1.5872-13.74208-4.23936-17.50528-14.30528l-2.08384-5.71904c-2.09408-5.80096-5.25312-14.57664-7.26528-15.872-0.256-0.01024-0.85504-0.0768-1.50528-0.0768-3.584 0-7.78752 2.0992-12.6464 4.5312-8.4224 4.20352-18.41664 9.12896-31.36 6.55872-3.2256-0.64-5.05344-1.57184-6.7328-5.08928-0.59904-1.2544-1.83808-3.86048-6.1184-9.6-7.25504-9.70752-1.5616-21.93408 2.59072-30.85824 0.7168-1.55136 1.59744-3.44064 2.19648-4.96128a166.0928 166.0928 0 0 0-37.44768-4.2496c-32.5888 0-57.82016 9.472-66.79552 13.3632 0.24064 4.57728 0.33792 12.36992 0.33792 26.15808 0 6.69696-0.34816 12.40064-0.68096 17.70496-1.06496 17.09056-1.83808 29.44512 11.89376 60.14976 7.12704 15.90784 12.84096 15.90784 16.62464 15.90784 2.3808 0 4.86912-0.35328 7.50592-0.70656 3.52768-0.47104 7.26528-0.95744 11.2896-0.95744z" fill="#6B0204" p-id="4634"></path><path d="M236.64128 731.76576s16.7424-46.29504 40.38656-47.27808 26.59328 13.78816 26.59328 21.66784c0 7.87968 5.90848 22.656 13.78816 26.59328 7.87968 3.9424 69.93408 11.82208 88.64768 15.75936s41.3696 10.83392 46.29504 23.63904c4.92544 12.80512-2.95424 29.54752-6.89664 39.3984-3.9424 9.85088-7.87968 9.85088 2.95424 22.656s25.61024 12.80512 33.48992 22.656c7.87968 9.85088 10.83392 19.70176 10.83392 19.70176l2.95424 7.87968s-103.424-5.90848-171.38688-53.19168-87.65952-99.4816-87.65952-99.4816z" fill="#FFEC43" p-id="4635"></path><path d="M504.4224 890.86976l-9.06752-0.52224c-4.29056-0.24064-105.88672-6.5536-174.42816-54.23616-68.69504-47.78496-88.99584-100.05504-89.8304-102.25152l-0.77312-2.05312 0.75264-2.05312c1.85344-5.12512 18.8672-50.06848 45.70624-51.18464l2.45248-0.0512c18.98496 0 30.3104 10.33216 30.3104 27.63776 0 6.6304 5.43744 18.75968 10.51648 21.2992 4.13184 2.03264 32.76288 6.4512 51.712 9.3696 14.48448 2.23232 28.17024 4.34176 35.51744 5.89312 29.75232 6.26176 45.83424 14.94016 50.60096 27.30496 5.33504 13.85472-1.36704 30.16704-5.79584 40.96512l-1.13152 2.7648c-0.79872 2.00192-1.59744 3.63008-2.28864 5.04832-1.95584 3.968-2.03776 4.1216 4.27008 11.58144 4.87936 5.77024 10.7008 8.48896 16.86528 11.37152 5.96992 2.79552 12.14464 5.67808 16.72704 11.40736 8.50432 10.61888 11.75552 21.25312 11.8784 21.69856l6.00576 16.01024z m-261.4016-159.22688c4.37248 9.81504 26.53696 54.30784 84.6592 94.74048 54.18496 37.69344 132.67968 48.63488 159.2064 51.34848a61.184 61.184 0 0 0-9.61536-17.16736c-2.84672-3.56864-7.3216-5.6576-12.4928-8.07936-6.7072-3.13344-14.32064-6.69696-20.89472-14.44864-9.7536-11.53536-10.01984-16.01024-5.85216-24.46848 0.57856-1.18784 1.25952-2.54464 1.93024-4.224l1.15712-2.85696c3.72736-9.05728 9.34912-22.75328 5.70368-32.2048-2.12992-5.5296-11.14112-13.48096-41.984-19.97312-7.03488-1.47968-20.5568-3.56864-34.87744-5.78048-30.81728-4.75648-49.90464-7.8336-55.20384-10.48064-10.41408-5.21216-17.06496-22.36928-17.06496-31.89248 0-10.624-6.03648-15.79008-18.46272-15.79008l-1.96608 0.04096c-15.10912 0.62976-29.30176 28.74368-34.24256 41.23648z" fill="#6B0204" p-id="4636"></path></svg>
        </div>
        <div v-show="!PlayStarted" :class="skin == 'lightTheme' ? 'titleTextX' : 'titleText'">Global TV</div>
        <div v-show="PlayStarted">
          <n-button  strong secondary    style="  -webkit-app-region: no-drag;" size="small"
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

            <n-input @focus="Onfocus" @blur="OnBlur" size="tiny" placeholder="输入影片名称..."
                     v-model:value="searchInputValue" />
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
</style>
