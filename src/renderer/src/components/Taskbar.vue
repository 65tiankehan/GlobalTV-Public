<script setup lang="ts">
import { useDialog, useMessage, useNotification, useLoadingBar } from 'naive-ui'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ArrowUndoOutline as CashIcon } from '@vicons/ionicons5'

const loadingBar = useLoadingBar()
const message = useMessage()
const dialog = useDialog()
const notification = useNotification()
const fileInput = ref<HTMLInputElement | null>(null)
const store = useStore()
// 使用computed属性来访问getter
const notices = computed(() => store.getters.getNotices)
// 使用computed属性来访问getter
const showUpdate = computed(() => store.getters.getShowUpdate)

// 使用computed属性来访问getter
const PlayStarted = computed(() => store.getters.getPlayStarted)

const ipcHandleMax = () => window.electron.ipcRenderer.send('MaxWin')
const ipcHandleMin = () => window.electron.ipcRenderer.send('MinWin')
const ipcHandleClose = () => {

  //
  dialog.warning({
    title: '警告',
    content: '你确定关闭？',
    positiveText: '确定',
    negativeText: '不确定',
    closable: false,
    onPositiveClick: () => {
      window.electron.ipcRenderer.send('closeWin')
    },
    onNegativeClick: () => {
      message.success('欢迎你回啦')
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

const threadFun = (value: string) => {

  notification.success({

    content: '多线程',
    meta: '功能状态：' + value,
    duration: 2500,
    keepAliveOnHover: true
  })
}
//用ts编写一个函数，函数的打开本地资源窗口


const intelligenceFun = (value: string) => {

  notification.success({

    content: '智能线路',
    meta: '功能状态：' + value,
    duration: 2500,
    keepAliveOnHover: true
  })
}

const selectFiles = () => {
  fileInput.value?.click()
}
const onFileSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    console.log('Selected files:', files)
    // 在这里添加处理文件的逻辑
  }
}


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

  //这个是要去调用主进程去检查
  // if (window.electron.ipcRenderer.sendSync('checkForUpdates')) {
  //   message.success('有新版本')
  //   setshowUpdate(true)
  // } else {
  //   message.success('没有新版本')
  // }
  loadingBar.finish()
  message.success('有新版本')
  setshowUpdate(!showUpdate.value)

}


</script>

<template>
  <div id="titleLabel">
    <input ref="fileInput" type="file" accept=".mp4, video/mp4" multiple @change="onFileSelected"
           style="display: none;" />
    <div style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      ">
      <div style="flex: 20%" class="titleName">
        <div v-show="!PlayStarted" class="iconTitle">
          <svg t="1710920816744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="6493" width="18" height="18">
            <path
              d="M521.86624 510.44864m-459.57632 0a459.57632 459.57632 0 1 0 919.15264 0 459.57632 459.57632 0 1 0-919.15264 0Z"
              fill="#00DFD5" p-id="6494"></path>
            <path
              d="M521.86624 979.5072c-258.64704 0-469.07392-210.41152-469.07392-469.0688S263.2192 41.37472 521.86624 41.37472s469.07392 210.41152 469.07392 469.0688-210.42688 469.06368-469.07392 469.06368z m0-919.15264c-248.17664 0-450.07872 201.91232-450.07872 450.08384s201.90208 450.08384 450.07872 450.08384 450.07872-201.91232 450.07872-450.08384-201.90208-450.08384-450.07872-450.08384z"
              fill="#6C0000" p-id="6495"></path>
            <path
              d="M639.51872 68.13696c21.38624 5.17632-33.98656 58.1888-11.33056 87.28064s13.60384 27.36128 22.656 29.09184c49.37216 9.45152 79.6928-32.51712 112.49152-25.43104 13.07648 2.82624 21.05856 29.87008 32.38912 58.96704 11.33056 29.09184 47.37536 21.90848 47.70304 34.35008 0.51712 19.83488 14.42304 49.8432-8.23808 78.94016-22.656 29.09184-98.176 20.02944-116.70016 32.87552-24.59648 17.05984-221.95712-77.39392-90.30144 53.04832 13.24032 13.11744 71.19872-0.73216 91.96032 15.04768 90.15296 68.51584 89.2928-5.3504 111.9488 130.42176 22.656 135.77216-12.95872 163.23072-22.656 174.56128-55.33696 64.6656-78.17216 62.32064-86.79936 43.82208-11.27424-24.17152 86.79936-82.61632 7.5008-131.10272l-79.29856-48.49152s-54.95808-37.49376-39.49056-60.416c8.7296-12.93824 44.11904-39.51616-46.50496-117.09952s-131.1232 23.38816-176.4352-73.58976-28.6976-120.12544-28.6976-188.01152-1.65888-69.76-1.65888-69.76 125.40416-62.2848 281.46176-24.50432z"
              fill="#FFEC43" p-id="6496"></path>
            <path
              d="M738.59584 800.35328c-10.13248 0-18.33984-5.64224-23.12704-15.89248-5.69856-12.2112 4.00896-25.95328 15.2576-41.84576 12.12416-17.15712 25.86624-36.60288 22.11328-54.83008-2.32448-11.26912-11.10016-21.40672-26.81856-31.02208l-79.29856-48.49152c-6.62528-4.51584-61.24544-42.97216-41.92256-71.58272 0.86016-1.28512 1.94048-2.67264 3.14368-4.20352 10.01472-12.8 28.672-36.6336-48.24576-102.47168-31.17056-26.68032-54.5792-30.11072-71.48544-30.11072-8.66304 0-16.80384 1.0496-24.66816 2.05824-7.3728 0.94208-14.336 1.83808-21.28384 1.83808-26.73664 0-44.41088-14.48448-61.02016-50.0224-35.90656-76.87168-33.7664-109.70624-31.06304-151.28576 0.80384-12.27264 1.63328-24.98048 1.63328-40.08448 0-47.4112-0.8192-62.0032-1.21344-66.2528l-5.3248-5.99552 9.2672-4.608c3.08224-1.53088 76.7232-37.49888 182.22592-37.49888 35.47648 0 70.67136 4.1728 104.61696 12.38016 5.74976 1.39264 8.448 4.85376 9.69216 7.49568 3.94752 8.36096-1.02912 18.6112-7.90528 32.80384-8.13056 16.75776-18.24768 37.6064-8.73472 49.82272 11.71456 15.05792 15.44192 22.46144 17.2288 26.0608 0.20992 0.03072 0.4352 0.0768 0.67072 0.12288 4.34176 0.83456 8.73472 1.2544 13.056 1.2544 18.51904 0 34.23232-7.51104 49.42848-14.79168 16.93184-8.09984 33.73568-15.42656 50.2016-11.84256 15.28832 3.29216 23.14752 24.22272 33.1008 50.70336 1.60768 4.26496 3.25632 8.67328 4.98688 13.1072 5.28896 13.57312 17.55136 17.2032 28.37504 20.4032 9.18016 2.70336 19.584 5.78048 19.87072 16.63488 0.10752 4.2496 0.98816 9.4464 1.91488 14.96064 3.15392 18.67264 7.4752 44.25728-11.8272 69.03296-15.89248 20.4032-50.47808 24.05376-80.98304 27.28448-15.68256 1.66912-31.8976 3.38432-37.4528 7.23456-3.48672 2.42688-8.16128 3.55328-14.70976 3.55328h-0.01536c-13.01504 0-32.43008-4.608-52.98688-9.49248-20.49536-4.85376-41.69728-9.87648-55.14752-9.87648-7.296 0-8.97536 1.53088-8.99072 1.54624-0.04096 0.26112-2.65216 10.3424 42.60864 55.18336 4.02432 4.00384 21.9904 4.12672 35.0976 4.21888 21.20704 0.1536 43.136 0.32256 56.0896 10.15808 31.57504 24.00768 50.9696 29.71136 65.13152 33.88416 30.24384 8.88832 35.52768 15.81568 49.82784 101.53984 21.8112 130.6624-9.18016 164.36224-22.41536 178.75456l-2.03264 2.25792c-33.3568 38.96832-58.496 57.9072-76.86656 57.9072zM488.2176 384.07168c28.76928 0 54.75328 10.77248 81.78176 33.91488 77.91616 66.69824 69.20704 100.24448 50.4064 124.25216-0.94208 1.2032-1.80736 2.304-2.4832 3.29216-7.552 11.19232 17.84832 36.12672 37.38624 49.44896l78.96576 48.27648c19.39968 11.85792 30.85312 25.76896 34.06336 41.33376 5.1456 24.96512-11.392 48.35328-24.68864 67.16416-6.23104 8.81152-15.65184 22.13376-13.83424 26.03008 2.77504 5.93408 5.99552 6.73792 8.7808 6.73792 7.4752 0 25.83552-6.79936 64.83968-52.37248l2.40128-2.67264c10.66496-11.59168 38.99392-42.39872 18.4576-165.44256-13.60896-81.5872-16.9472-82.56-38.6816-88.96-14.47424-4.26496-36.34688-10.69568-70.2464-36.44928-8.75008-6.66112-28.86656-6.79936-46.62272-6.94272-20.12672-0.13824-37.50912-0.26112-46.12608-8.79616-47.38048-46.94528-50.11456-62.63296-46.01856-72.59136 3.06688-7.4496 10.9824-11.22304 23.54176-11.22304 15.29344 0 37.41696 5.23776 58.8032 10.31168 18.7648 4.44928 38.17472 9.05728 49.3312 9.05728h0.01024c4.41344 0 5.71392-0.7424 5.72928-0.75776 8.8576-6.13888 24.70912-7.82336 44.7744-9.93792 26.02496-2.74944 58.40896-6.18496 70.16448-21.28384 15.0272-19.2768 11.66848-39.13728 8.70912-56.66816-0.95744-5.6576-1.86368-11.02336-2.09408-16.06144-1.66912-0.94208-5.60128-2.11968-8.58112-2.98496-12.16-3.59936-30.53056-9.02656-38.6304-29.83424-1.75616-4.51584-3.4304-8.96512-5.05344-13.27616-6.58432-17.53088-14.77632-39.34208-21.632-40.82176-11.81696-2.50368-24.832 3.38432-40.01792 10.66496-16.00512 7.64928-34.14528 16.33792-56.25856 16.33792-5.31968 0-10.70592-0.512-16.02048-1.53088-6.5024-1.23904-8.832-2.51904-11.83232-8.53504-1.536-3.10784-4.74624-9.55392-15.5904-23.46496-15.5648-20.00384-2.5344-46.85312 6.97856-66.46784 2.83648-5.85728 6.95808-14.34624 7.61856-18.25792a429.1072 429.1072 0 0 0-99.77856-11.68384c-86.49216 0-152.17664 25.73824-170.22976 33.60768 0.71168 9.04192 1.10592 27.13088 1.10592 64.9216 0 15.62624-0.88064 29.16864-1.664 41.11872-2.65728 40.83712-4.5824 70.36416 29.60896 143.5392 17.6384 37.74976 32.72192 40.90368 46.67392 40.90368 5.93408 0 12.41088-0.83456 19.26656-1.7152 7.97184-1.01888 17.00864-2.18112 26.68544-2.18112z"
              fill="#6B0204" p-id="6497"></path>
            <path
              d="M195.28192 550.73792m-32.89088 0a32.89088 32.89088 0 1 0 65.78176 0 32.89088 32.89088 0 1 0-65.78176 0Z"
              fill="#FFEB43" p-id="6498"></path>
            <path
              d="M195.28192 591.54944c-22.49728 0-40.80128-18.304-40.80128-40.8064s18.304-40.8064 40.80128-40.8064 40.80128 18.304 40.80128 40.8064-18.29888 40.8064-40.80128 40.8064z m0-65.78688a25.00096 25.00096 0 0 0-24.97024 24.98048 25.00096 25.00096 0 0 0 24.97024 24.98048 25.00096 25.00096 0 0 0 24.97024-24.98048 24.99584 24.99584 0 0 0-24.97024-24.98048z"
              fill="#6B0306" p-id="6499"></path>
            <path
              d="M417.54112 733.60896m-52.07552 0a52.07552 52.07552 0 1 0 104.15104 0 52.07552 52.07552 0 1 0-104.15104 0Z"
              fill="#FFEB43" p-id="6500"></path>
            <path
              d="M417.54112 793.6c-33.08032 0-59.99104-26.91072-59.99104-59.99104s26.91072-59.99104 59.99104-59.99104c33.07008 0 59.98592 26.91072 59.98592 59.99104S450.61632 793.6 417.54112 793.6z m0-104.15616c-24.35584 0-44.16512 19.8144-44.16512 44.16512s19.80928 44.16512 44.16512 44.16512c24.3456 0 44.15488-19.8144 44.15488-44.16512s-19.80928-44.16512-44.15488-44.16512z"
              fill="#6B0306" p-id="6501"></path>
            <path d="M304.90624 408.22784m-10.0352 0a10.0352 10.0352 0 1 0 20.0704 0 10.0352 10.0352 0 1 0-20.0704 0Z"
                  fill="#FFEB43" p-id="6502"></path>
            <path
              d="M304.91136 426.17856a17.9712 17.9712 0 0 1-17.95584-17.9456 17.9712 17.9712 0 0 1 17.95584-17.96096 17.9712 17.9712 0 0 1 17.9456 17.96096 17.9712 17.9712 0 0 1-17.9456 17.9456z m0-20.07552a2.12992 2.12992 0 0 0-2.1248 2.13504c0 2.35008 4.2496 2.36544 4.24448 0a2.13504 2.13504 0 0 0-2.11968-2.13504z"
              fill="#6B0306" p-id="6503"></path>
            <path d="M892.22656 516.00896m-10.0352 0a10.0352 10.0352 0 1 0 20.0704 0 10.0352 10.0352 0 1 0-20.0704 0Z"
                  fill="#FFEB43" p-id="6504"></path>
            <path
              d="M892.22656 533.95456a17.9712 17.9712 0 0 1-17.95584-17.9456 17.9712 17.9712 0 0 1 17.95584-17.9456 17.9712 17.9712 0 0 1 17.9456 17.9456 17.96608 17.96608 0 0 1-17.9456 17.9456z m0-20.06528a2.11968 2.11968 0 0 0-2.1248 2.11968c0.01024 2.35008 4.2496 2.36544 4.24448 0a2.11968 2.11968 0 0 0-2.11968-2.11968z"
              fill="#6B0306" p-id="6505"></path>
            <path
              d="M84.1216 934.17472m-46.46912 0a46.46912 46.46912 0 1 0 92.93824 0 46.46912 46.46912 0 1 0-92.93824 0Z"
              fill="#5EB1BE" p-id="6506"></path>
            <path
              d="M84.11648 990.12608c-30.86336 0-55.96672-25.10336-55.96672-55.95648s25.10336-55.95648 55.96672-55.95648 55.96672 25.10336 55.96672 55.95648-25.10336 55.95648-55.96672 55.95648z m0-92.928c-20.38272 0-36.9664 16.5888-36.9664 36.97664s16.58368 36.97664 36.9664 36.97664 36.9664-16.5888 36.9664-36.97664-16.58368-36.97664-36.9664-36.97664z"
              fill="#6C0000" p-id="6507"></path>
          </svg>
        </div>
        <div v-show="!PlayStarted" class="titleText">Global TV</div>
        <div v-show="PlayStarted">
          <n-button dashed circle ghost round style="  -webkit-app-region: no-drag;" size="small" @click="setPlayStarted(false)">
            <template #icon>
              <n-icon>
                <CashIcon />
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
      <div style="
          flex: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
        "></div>
      <div style="flex: 20%">
        <div class="Ternarylinkage">
          <div class="BinarylinkageGan" @click="ipcHandleClose">
            <svg t="1679034496978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="9573" width="15" height="15">
              <path
                d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                p-id="9574" fill="#8a8a8a"></path>
            </svg>
          </div>

          <div class="Binarylinkage" @click="ipcHandleMax">
            <svg t="1679034543228" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="10836" width="15" height="15">
              <path
                d="M832 640l-128 0 0-256 128 0c105.9 0 192-86.1 192-192s-86.1-192-192-192-192 86.1-192 192l0 128L384 320l0-128c0-105.9-86.1-192-192-192s-192 86.1-192 192 86.1 192 192 192l128 0 0 256L192 640c-105.9 0-192 86.1-192 192 0 105.9 86.1 192 192 192s192-86.1 192-192l0-128 256 0 0 128c0 105.9 86.1 192 192 192s192-86.1 192-192S937.9 640 832 640zM704 192c0-70.6 57.4-128 128-128s128 57.4 128 128-57.4 128-128 128l-128 0L704 192zM192 320c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128l0 128L192 320zM320 832c0 70.6-57.4 128-128 128s-128-57.4-128-128 57.4-128 128-128l128 0L320 832zM384 384l256 0 0 256L384 640 384 384zM832 960c-70.6 0-128-57.4-128-128l0-128 128 0c70.6 0 128 57.4 128 128S902.6 960 832 960z"
                p-id="10837" fill="#8a8a8a"></path>
            </svg>
          </div>
          <div class="Binarylinkage" @click="ipcHandleMin">
            <svg t="1679034573870" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="11924" width="15" height="15">
              <path d="M832 521.6H192c-19.2 0-32-12.8-32-32s12.8-32 32-32h640c19.2 0 32 12.8 32 32s-12.8 32-32 32z"
                    fill="#bfbfbf" p-id="11925"></path>
            </svg>
          </div>
          <div class="Binarylinkage" style="width: 15%">
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
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>打开本地视频播放</span>
                    <n-button size="tiny" @click="selectFiles">打开</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>打开下载视频</span>
                    <n-button size="tiny" @click="selectFiles">查看</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>启动多线程下载</span>
                    <n-switch :round="false" @update:value="threadFun" />
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>启动智能线路</span>
                    <n-switch :round="false" @update:value="intelligenceFun" />
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>当前版本：v0.0.1</span>
                    <n-button size="tiny" @click="checkForUpdates">检查版本</n-button>
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
          <div class="Binarylinkage" style="width: 15%">
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
                    <n-button size="tiny">关注</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>粉丝</span>
                    <n-button size="tiny">200+</n-button>
                  </div>
                </div>
              </div>
              <div class="accountPmc_Card accountPmc_Card_row ">
                <div class="accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height"
                     style="justify-content: flex-start; height: 250px">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between">
                    <span>动态</span>
                    <n-button size="tiny">100+</n-button>
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
          <div class="Binarylinkage" style="width: 15%">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  margin-top: 4px;
  border-radius: 5px;
}

.Binarylinkage:hover {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-color: #eee;
  transition: all 0.2s ease-in-out;
  background-color: #333333;
}

.BinarylinkageGan {
  width: 15%;
  height: 28px;
  /* background-color: aqua; */
  /* padding-top: 10%; */
  float: right;
  padding: 6px;
  border-top-right-radius: 5px;
  text-align: center;
  -webkit-app-region: no-drag;
  margin-top: 4px;
  border-radius: 5px;
  border-top-right-radius: 10px;
  margin-right: 5px;
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

#titleLabel {
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
  /* box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15); */

  /* transition-delay: 0s !important; */
  /* border: 1px solid #78a4fa; */

  /* transform: translateY(-10px)  !important; */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  /* animation: sparkle 0.5s infinite; */
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
