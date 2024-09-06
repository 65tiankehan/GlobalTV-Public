<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BagAdd as Easel, Happy as Happy, LogoMarkdown as LogoMarkdown } from '@vicons/ionicons5'
import Player from 'nplayer'
import Hls from 'hls.js'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'

import axios from 'axios'
import * as cheerio from 'cheerio'


//定义线路
interface EpisodeCollection {
  title?: string,
  url?: string
}

//定义线路集合接口
interface StreamingSources {
  name?: string,
  EpisodeCollection: EpisodeCollection[]
}

interface smartRoutePath {
  localPath?: string,
  path?: string//线路，用于替代相关palyer**Url

}

interface tag {
  name?: string,
  color?: string
}

const store = useStore()
const message = useMessage()
// 使用computed属性来访问getter
const payVideoUrl = computed(() => store.getters.getPayVideoUrl)
// 使用computed属性来访问getter
const StreamSource = computed(() => store.getters.getStreamSource)

// 使用computed属性来访问getter
const localPlayUrl = computed(() => store.getters.getLocalPlayUrl)

// 使用computed属性来访问getter
const mimeType = computed(() => store.getters.getMimeType)


// 使用computed属性来访问getter
const isSmartRouteEnabled = computed(() => store.getters.getIsSmartRouteEnabled)

// 使用computed属性来访问getter
const smartRoutePaths = computed(() => store.getters.getSmartRoutePaths)

// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)

// 使用computed属性来访问getter
const isToggLed = computed(() => store.getters.getIsToggLed)

const props = defineProps({
  myTag: { type: Array as () => tag[], default: () => [] },
  myPropImg: String,
  myPropTitle: String,
  myDescription: String,
  streamingSource: { type: Array as () => StreamingSources[], default: () => [] }
})

const internalStreamingSource = ref(props.streamingSource)

// 使用 ref 创建一个响应式的本地副本
const localStreamingSource = ref([...props.streamingSource])
//清空
clearStreamingSource()
// 使用store.commit来调用mutation
const setStreamSource = (StreamSource: string) => {
  store.commit('SET_STREAMSOURCE', StreamSource)
}


const setisToggLed = (isToggLed: string) => {
  store.commit('SET_TOGGLED', isToggLed)
}

const loadSource = ref('')


// 方法用于清空 localStreamingSource
function clearStreamingSource() {
  localStreamingSource.value = []
}

function extractBeforeDollarBrace(str: string): string {
  const index = str.indexOf('${')
  if (index !== -1) {
    return str.slice(0, index)
  }
  return str // 如果没有找到 '${'，返回原始字符串
}

const hls = new Hls()
const player = new Player({
  themeColor: 'rgba(35,173,229, 1)',
  progressBg: 'rgba(35,173,229, 1)',
  volumeProgressBg: 'rgba(35,173,229, 1)'


})

hls.attachMedia(player.video)

hls.on(Hls.Events.MEDIA_ATTACHED, function() {
  hls.loadSource(loadSource.value)
})

const myDiv = ref<HTMLElement | string | undefined>()


//

onMounted(() => {
  if (localPlayUrl.value.length > 0) {
    preparelocalPlayUrl()
  } else {
    prepareForPlayback()
  }

  player.mount(myDiv.value)
})

//解析来源，并准备播放
const prepareForPlayback = () => {
  //是否是智能路由
  if (localStreamingSource.value.length <= 0) {
    axios.get(payVideoUrl.value.slice(0, payVideoUrl.value.length - 1) + extractBeforeDollarBrace(StreamSource.value))
      .then((resp) => {
        const $ = cheerio.load(resp.data)

        const scriptContent = $($('div.ewave-player__video.embed-responsive.embed-responsive-16by9.clearfix').children('script')).first().text()
        const jsonData = JSON.parse(scriptContent.replace(/var player_aaaa=|;/g, ''))

        const queryValue = jsonData.url
        loadSource.value = queryValue ?? ''

        // 检查 URL 扩展名
        const extension = loadSource.value.split('.').pop()?.toLowerCase()

        if (extension === 'm3u8') {
          // 如果是 HLS 格式，则使用 HLS 播放器
          hls.loadSource(loadSource.value)
          hls.attachMedia(player.video)

          // 监听 HLS 加载完成事件
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            // 视频加载完成后，等待用户交互再播放
            player.play()

          })
        } else if (extension === 'mp4') {
          // 如果是 MP4 格式，则直接使用浏览器的 video 标签播放
          player.video.src = loadSource.value
          player.video.oncanplay = function() {
            player.play()

          }
        }


      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          searchForAlternativeSources()
        }, 5000) // 等待 5 秒

      })
  } else {
    console.log('url :' + smartRoutePaths.value[0].localPath + StreamSource.value)
    axios.get(smartRoutePaths.value[0].localPath + StreamSource.value)
      .then((resp) => {
        const $ = cheerio.load(resp.data)
        console.log('智能内容')
        // console.log($('div.player-box-main').html())
        const scriptContent = $($('div.player-box-main').children('script')).first().text()


        // 使用正则表达式移除 var player_aaaa = 和分号

        const jsonData = JSON.parse(scriptContent.replace(/var player_aaaa=|;/g, ''))
        // 移除 var player_aaaa = 部分，并将其转换为 JSON 对象
        console.log()
        const urlParams = new URLSearchParams(new URL(jsonData.url).search)
        const queryValue = urlParams.get('url')
        loadSource.value = queryValue ?? ''
        // 检查 URL 扩展名
        const extension = loadSource.value.split('.').pop()?.toLowerCase()

        if (extension === 'm3u8') {
          // 如果是 HLS 格式，则使用 HLS 播放器
          hls.loadSource(loadSource.value)
          hls.attachMedia(player.video)

          // 监听 HLS 加载完成事件
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            // 视频加载完成后，等待用户交互再播放
            player.play()

          })
        } else if (extension === 'mp4') {
          // 如果是 MP4 格式，则直接使用浏览器的 video 标签播放
          player.video.src = loadSource.value
          player.video.oncanplay = function() {
            player.play()

          }
        }


      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          searchForAlternativeSources()
        }, 5000) // 等待 5 秒

      })
  }

}

function encodeSearchWord(searchWord: string): string {
  return `${encodeURIComponent(searchWord)}`
}

// 搜索备用源
const searchForAlternativeSources = () => {
  console.log('尝试智能')
  if (isSmartRouteEnabled.value) {
    // 存储所有 href 值
    const hrefValues: smartRoutePath[] = []
    console.log('开启智能')
    smartRoutePaths.value.forEach(path => {
      const searchUrl = `${path.path}` + encodeSearchWord(props.myPropTitle ? props.myPropTitle : '')
      console.log('线路：' + searchUrl)
      axios.get(searchUrl)
        .then(response => {
          console.log('智能线路搜索：' + props.myPropTitle + '，结果如下')
          // 加载 HTML 到 Cheerio
          const $ = cheerio.load(response.data)


          // 使用选择器来定位到包含 "详情" 文本的 a 标签
          const $links2 = $('.module-card-item-footer .play-btn-o')

          // 遍历所有匹配的 a 标签
          $links2.each((index, element) => {
            // 提取 href 属性值
            const hrefValue = $(element).attr('href')
            if (hrefValue) { // 确保 hrefValue 不为 undefined
              hrefValues.push({
                path: hrefValue,
                localPath: path.localPath
              })
              console.log(`The href value for link ${index + 1} is:`, hrefValue)
            } else {
              console.warn(`No href attribute found for link ${index + 1}`)
            }

          })


          //判断是否有链接
          if (hrefValues.length > 0) {
            clearStreamingSource()
            hrefValues.forEach((route, index) => {
              localStreamingSource.value.push({
                EpisodeCollection: [],
                name: '智能线路推荐' + index
              })
              if (route.path && route.localPath) {
                axios.get(route.localPath + route.path).then((resp) => {
                  const $ = cheerio.load(resp.data)


                  $($('div.module-list').children('div.module-play-list')).each(function(n, m) {
                    console.log('推荐：' + (n + 1) + '条')

                    localStreamingSource.value[index].EpisodeCollection.push({
                      title: $($(m).children('div.module-play-list-content')).children('a.module-play-list-link').text(),
                      url: $($(m).children('div.module-play-list-content')).children('a.module-play-list-link').attr('href')
                    })

                  })

                }).catch((err) => {
                  console.log(err)
                })


              }

            })
            //清空props.streamingSource
            internalStreamingSource.value.length = 0
            message.success('智能线路推荐成功！', { duration: 1500 })
          }
        })
        .catch(error => {
          console.error(`Error fetching ${searchUrl}:`, error)
        })


    })
  }

}

//设置来源
const setMediaSource = (url: string | undefined) => {
  // 参数校验: 检查url是否为undefined，并根据情况处理
  if (url === undefined) {
    console.error('URL is undefined. Cannot set media source.')
    // 可以在这里添加更多的错误处理逻辑，比如返回一个错误，或者调用错误处理函数
    return
  }

  try {
    console.log('URL')
    console.log(url)
    // 调用setStreamSource之前，可以添加任何必要的逻辑检查
    setStreamSource(url)
    // 准备播放之前，也可以添加任何必要的逻辑检查
    prepareForPlayback()
  } catch (error) {
    // 异常处理: 对于setStreamSource和prepareForPlayback抛出的任何错误，进行处理
    console.error('An error occurred while setting media source or preparing for playback:', error)
    // 可以在这里添加任何必要的错误处理逻辑，比如重试逻辑、调用错误处理函数等
  }
}

//准备本地播放
const preparelocalPlayUrl = () => {
  if (localPlayUrl.value) {
    loadSource.value = localPlayUrl.value
    console.log('类型')
    console.log(mimeType.value)
    // 根据 MIME 类型决定是否使用 HLS
    if (mimeType.value.startsWith('application/x-mpegURL') || mimeType.value.startsWith('application/vnd.apple.mpegurl')) {
      // 如果 MIME 类型表明这是一个 HLS 流，则使用 HLS 解析器
      hls.loadSource(loadSource.value)
      // 移除之前的事件处理器
      hls.off(Hls.Events.MANIFEST_PARSED)
      // 注册新的事件处理器
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        player.play()
      })
    } else if (mimeType.value.startsWith('video/')) {
      // 如果 MIME 类型表明这是一个普通的视频文件，直接使用播放器加载
      player.video.src = localPlayUrl.value
      player.play()
    } else {
      console.warn('Unsupported media type:', mimeType.value)
    }
  }
}


</script>

<template>
  <div v-show="false" class="left_layout">
    <div style="width: 100%; height: 45%; position: relative">
      <div
        style="
          position: absolute;
          z-index: 3;
          background-color: #ffff;
          padding: 3px;
          border-radius: 10px;
          width: 150px;
          height: 220px;
          top: 10%;
          left: 20%;
          right: 20%;
          bottom: 0;
        "
      >
        <img
          style="width: 100%; height: 100%; border-radius: 10px"
          src="https://v.376ju.com/upload/vod/20240604-1/648ebbaf8fc4c44463bd4bdfb3c3a256.jpg"
        />
      </div>
      <h1 class="page-title">潘多拉第一季</h1>
      <h2 class="video-subtitle">panduoladiyiji</h2>
      <img
        class="img_div"
        style="width: 100%; height: 80%"
        src="https://v.376ju.com/upload/vod/20240604-1/648ebbaf8fc4c44463bd4bdfb3c3a256.jpg"
      />
    </div>
    <div style="width: 100%; padding-left: 10px">
      <n-space>
        <n-tag
          round
          :bordered="false"
          :color="{ color: '#fef0e5', borderColor: '#605c5d', textColor: '#cec3ba' }"
        >
          连续剧
          <template #avatar>
            <n-avatar
              src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
            />
          </template>
        </n-tag>
        <n-tag
          round
          :bordered="false"
          :color="{ color: '#32323c', borderColor: '#32323c', textColor: '#a6a6ab' }"
        >
          欧美剧/欧美
        </n-tag>
        <n-tag
          round
          :bordered="false"
          :color="{ color: '#32323c', borderColor: '#32323c', textColor: '#a6a6ab' }"
        >
          2019
        </n-tag>
        <n-tag
          round
          :bordered="false"
          :color="{ color: '#32323c', borderColor: '#32323c', textColor: '#a6a6ab' }"
        >
          英国
        </n-tag>
      </n-space>
    </div>
    <div style="width: 100%; padding-top: 20px; padding-left: 20px">
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <span class="video-info-itemtitle">导演：</span>
        <span>未知</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <span class="video-info-itemtitle">主演：</span>
        <span>拉·昆塔纳/Raechelle/...</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <span class="video-info-itemtitle">上映：</span>
        <span>2024</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <span class="video-info-itemtitle">更新：</span>
        <span>03.27</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <span class="video-info-itemtitle">剧情：</span>
        <span
          style="
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: pre-wrap; /* 允许文本自动换行 */
          "
        >
         Mark A. Altman负责的CW夏季科幻剧《潘多拉 Pandora》背景设置在2199年，主角是别称「Pandora」的Jax（Priscilla Quintana饰），丧失双亲后她在地球的太空训练学院找到新生活，现在足智多谋的Jax与朋友们一同学习如何阻止银河系里的人类或外星人威胁。不过当女主的真实身份被揭露时，她得面对自己可能是「人类救世主」或「毁灭人类的存在」。 其余主演包括Oliver Dench﹑Raechelle Bano﹑John Harlan Kim﹑Ben Radcliffe﹑Benita Sandhu﹑Martin Bobb-Semple及Noah Huntley。
        </span>
      </div>
    </div>
    <div style="width: 100%; padding-left: 10px; padding-top: 20px">
      <n-space>
        <n-button color="#ff5d0a" round strong secondary>
          <template #icon>
            <n-icon>
              <happy />
            </n-icon>
          </template>
          推荐
        </n-button>
        <n-button color="#f93640" round strong secondary>
          <template #icon>
            <n-icon>
              <easel />
            </n-icon>
          </template>
          收藏
        </n-button>
        <n-button color="#ecf9f0" round strong secondary>
          <template #icon>
            <n-icon>
              <logo-markdown />
            </n-icon>
          </template>
          下载
        </n-button>
      </n-space>
    </div>
  </div>

  <div class="right_layout">
    <div
      :style="
        skin =='lightTheme'
         ?
         ' width: 100%;\n'+
'        height: 100%;\n'+
'        background-color: #ffff;\n'

         :' width: 100%;\n'+
'        height: 100%;\n'+
'        background-color: #1b1b1f;\n'

      "
    >

      <div style="width: 100%;height: 260px;margin-bottom: 20px;">

        <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;align-items: center;">
          <div class="image-container" style="width: 100%;height: 120px;padding: 3px;">
            <img
              class="image"
              style="border-radius:3px;width: 100%;height: 100%; "
              :src="myPropImg" />
          </div>
          <n-space>
            <n-breadcrumb>
              <n-breadcrumb-item>
                <div style="  max-width: 320px; /* 可以根据需要调整 */
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;font-size: 15px;">
                  {{ props.myPropTitle }}
                </div>
              </n-breadcrumb-item>
            </n-breadcrumb>

            <n-scrollbar
              :style="skin=='lightTheme'? 'max-height: 110px;color: rgb(163 163 163);':'max-height: 110px;color: rgb(163 163 163);'">
              {{ myDescription }}
            </n-scrollbar>
          </n-space>
        </div>
      </div>

      <div class="shoChanT">
        <n-space>
          <n-tag round :bordered="false" v-for="(item,index) in myTag" :key="index" :type="item.color">
            <div style="max-width: 220px; /* 可以根据需要调整 */
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;font-size: 15px;">
              {{ item.name }}
            </div>

            <template #avatar>
              <n-avatar
                src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
              />
            </template>
          </n-tag>

        </n-space>
      </div>

      <div style="height: 5px"></div>
      <div class="shoChanT" style="display: flex;justify-content: start;align-items: center">
        <n-button-group>
          <n-button strong secondary>
            收藏
            <template #icon>
              <svg t="1725592593948" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="4224" width="15" height="15">
                <path
                  d="M494.994286 794.697143l-214.930286 113.005714a36.571429 36.571429 0 0 1-53.028571-38.546286l40.996571-239.323428a36.571429 36.571429 0 0 0-10.496-32.365714l-173.860571-169.472a36.571429 36.571429 0 0 1 20.260571-62.390858l240.274286-34.925714a36.571429 36.571429 0 0 0 27.538285-20.004571l107.446858-217.709715a36.571429 36.571429 0 0 1 65.609142 0l107.446858 217.709715a36.571429 36.571429 0 0 0 27.538285 20.004571l240.274286 34.925714a36.571429 36.571429 0 0 1 20.260571 62.390858l-173.860571 169.472a36.571429 36.571429 0 0 0-10.532571 32.365714l41.069714 239.323428a36.571429 36.571429 0 0 1-53.065143 38.546286l-214.930286-113.005714a36.571429 36.571429 0 0 0-34.011428 0zM512 700.306286l205.970286 108.288-39.350857-229.339429 166.656-162.450286-230.290286-33.462857L512 174.628571l-102.985143 208.676572-230.290286 33.462857 166.619429 162.450286-39.314286 229.339428L512 700.342857z"
                  fill="#808BB5" p-id="4225"></path>
              </svg>
            </template>
          </n-button>
          <n-button strong secondary>
            <n-tooltip    trigger="click">
              <template #trigger>
                下载
              </template>
              <n-space>
                <n-button strong secondary circle type="info">

                  <template #icon>
                    <svg t="1725603714514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12335" width="15" height="15"><path d="M271.38 429.637a245.5 245.5 0 0 1-3.395-40.777c0-134.68 109.18-243.86 243.86-243.86s243.86 109.18 243.86 243.86a245.5 245.5 0 0 1-3.394 40.776C875.967 430.312 976 530.763 976 654.578c0 124.235-100.712 224.947-224.946 224.947-62.743 0-119.486-25.688-160.287-67.12l0.003-0.004c-21.44-21.822-21.322-56.893 0.354-78.57 21.796-21.795 57.133-21.795 78.928 0 0.693 0.694 1.365 1.4 2.014 2.12 20.427 19.87 48.317 32.108 79.065 32.108 62.631 0 113.404-50.772 113.404-113.403 0-62.631-50.773-113.403-113.404-113.403-28.739 0-54.981 10.69-74.967 28.311l-0.096-0.096-1.886 1.886c-2.2 2.033-4.32 4.152-6.353 6.353l-4.306 4.305 0.076 0.077-229.876 229.876-0.03-0.03c-40.833 41.708-97.767 67.59-160.747 67.59C148.712 879.525 48 778.813 48 654.578c0-123.711 99.866-224.098 223.38-224.94z m1.644 338.422c62.63 0 113.403-50.772 113.403-113.403 0-62.631-50.772-113.403-113.403-113.403-62.631 0-113.404 50.772-113.404 113.403 0 62.63 50.773 113.403 113.404 113.403zM511.845 521.1c73.034 0 132.24-59.206 132.24-132.24 0-73.033-59.206-132.239-132.24-132.239s-132.24 59.206-132.24 132.24c0 73.033 59.206 132.239 132.24 132.239z" fill="#06A7FF" p-id="12336"></path><path d="M643.351 402.868a56.966 56.966 0 0 1-0.352-6.334c0-31.123 25.23-56.353 56.353-56.353s56.353 25.23 56.353 56.353c0 2.39-0.15 4.745-0.438 7.057-7.616 127.82-113.688 229.128-243.422 229.128-129.734 0-235.806-101.307-243.422-229.128a56.908 56.908 0 0 1-0.438-7.057c0-31.123 25.23-56.353 56.353-56.353s56.353 25.23 56.353 56.353c0 2.141-0.12 4.255-0.352 6.334 6.996 66.448 63.204 118.23 131.506 118.23 68.302 0 124.51-51.782 131.506-118.23z" fill="#FF436A" p-id="12337"></path></svg>
                  </template>
                </n-button>
                <n-button strong secondary circle type="info">

                  <template #icon>
                    <svg t="1725603739766" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13379" width="15" height="15"><path d="M11.49155555 486.05866667c0.91022222-72.704 14.44977778-142.79111111 46.42133334-208.55466667 46.42133333-95.57333333 118.784-165.09155555 214.81244444-209.80622222 43.23555555-20.13866667 88.86044445-32.54044445 136.53333334-36.97777778 25.37244445-2.38933333 50.63111111-3.64088889 76.00355555-1.36533333 21.04888889 1.93422222 42.09777778 4.66488889 62.80533333 9.10222222 73.38666667 15.92888889 138.69511111 48.35555555 195.24266667 97.84888889 16.83911111 14.79111111 31.744 31.744 46.76266667 48.46933333 31.63022222 35.27111111 54.49955555 75.66222222 72.59022222 119.01155556 11.94666667 28.672 20.82133333 58.368 25.71377778 88.97422222 2.61688889 16.27022222 4.55111111 32.65422222 5.46133333 49.152 0.68266667 13.53955555 1.25155555 26.96533333 1.13777778 40.39111111-0.11377778 26.73777778-4.32355555 52.90666667-9.10222222 79.07555555-2.61688889 13.99466667 3.29955555 23.66577778 16.95288889 27.42044445 27.53422222 7.39555555 55.18222222 14.56355555 82.71644444 21.84533333 3.072 0.79644445 6.144 1.59288889 9.10222222 2.50311112 16.72533333 5.57511111 23.43822222 18.77333333 17.97688889 35.38488888-13.42577778 41.18755555-31.97155555 79.872-55.296 116.39466667-22.86933333 35.95377778-49.94844445 68.49422222-81.12355555 97.39377778-60.30222222 55.97866667-129.93422222 95.45955555-208.896 118.67022222-52.67911111 15.47377778-106.496 22.18666667-161.22311112 20.02488889-66.78755555-2.50311111-130.73066667-17.74933333-191.82933333-45.16977778-61.89511111-27.76177778-115.93955555-66.78755555-162.47466667-115.93955556-46.08-48.69688889-80.78222222-104.90311111-105.35822222-167.3671111-15.81511111-40.27733333-26.39644445-82.03377778-31.51644444-124.928-2.38933333-20.36622222-3.64088889-40.96-3.41333334-61.55377778z m521.10222223 334.16533333c8.30577778-0.45511111 21.39022222 0.22755555 34.24711111-1.93422222 40.27733333-6.59911111 79.07555555-17.74933333 115.14311111-37.66044445 73.84177778-40.84622222 125.04177778-101.03466667 154.16888889-179.99644444 5.91644445-15.92888889-0.11377778-26.624-16.83911111-31.06133334-27.19288889-7.168-54.49955555-14.336-81.57866667-21.73155555-14.22222222-3.86844445-22.07288889-13.65333333-21.16266666-25.71377778 0.34133333-4.55111111 1.024-9.10222222 1.70666666-13.65333333 6.03022222-39.25333333 1.93422222-77.71022222-9.89866666-115.25688889-13.312-42.09777778-36.06755555-78.27911111-67.81155556-108.99911111-27.76177778-26.85155555-59.50577778-47.104-96.02844444-59.392-38.57066667-12.97066667-77.824-18.09066667-118.55644445-12.40177778-27.87555555 3.86844445-54.84088889 10.35377778-79.872 22.98311111-26.39644445 13.312-50.63111111 29.80977778-71.79377778 50.85866667-27.30666667 27.07911111-48.24177778 58.368-61.66755555 94.09422222-13.76711111 36.75022222-19.56977778 74.97955555-18.432 114.57422222 1.59288889 56.77511111 15.36 109.90933333 43.91822222 159.06133334 44.60088889 76.8 109.22666667 128.56888889 194.67377778 153.71377778 31.06133333 8.98844445 62.80533333 13.19822222 99.78311111 12.51555555z" fill="#6684FE" p-id="13380"></path></svg>
                  </template>
                </n-button>
                <n-button strong secondary circle type="info">

                  <template #icon>
                    <svg t="1725603768373" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14427" width="15" height="15"><path d="M825.1 92.3c-71.1 23-140.7 48.5-210.3 74.9-145.6 55.4-350.6 136.5-441.1 265-35.3 49.8-60.8 99.3-76 152.8-9.6 34-19.3 73.4-5 85.3 15.7 12.7 34.6-5.8 49.8-26.9 23.6-33 23.8-38.1 48.8-50.4 41.2-20.1 96.3-17.6 141.6-30.4 61.8-17.2 82.4-41.2 86.7-106.6 3-43.6 8.9-69 30.7-91.7 73.9-76.6 215.8-136.8 324.9-189 48.1-23 105.6-44.7 146-79.4 74.9-64.3-81-8.6-96.1-3.6z" fill="#0F97FF" p-id="14428"></path><path d="M786.3 729c-45.7-21.7-91.8-41.5-138.4-60.8-97.5-40.4-236.1-95.7-340.4-74.5-40.5 8.1-76.1 20.6-108.4 39.9-20.5 12.3-43.6 27.2-42.1 39.7 1.8 13.6 19.8 13.3 37 9.9 27-5.3 29.4-7.7 47.5-2.1 29.7 9.2 55.6 36.1 83.9 50.9 38.4 20.2 59.7 18 92.3-12.2 21.8-20.1 36.5-29.8 57.7-30.9 72-3.4 169.9 32.9 247.8 57.9 34.4 11 72.8 27 108.8 28.8 66.7 3-36-42-45.7-46.6zM414.8 859.1c-31-42.1-75.6-101.1-125.3-118.8-19.3-6.9-37.5-10.7-56.2-10.9-11.9 0-25.5 0.4-28 6.1-2.7 6.2 5 10.7 13.2 13.7 12.8 4.7 14.5 4.3 20.7 11.3 10.2 11.5 14.3 29.6 22.5 43 11.1 18.4 20.7 22.9 42.2 18.5 14.4-2.9 23.1-3.3 32.4 1.7 31.4 17 63.6 57.5 90.2 88 11.7 13.5 23.9 30.1 38.7 40.1 27.5 18.4-4.5-27-7.4-31.4-13.7-20.9-28.2-41.1-43-61.3z" fill="#0F97FF" p-id="14429"></path></svg>
                  </template>
                </n-button>
              </n-space>

            </n-tooltip>
            <template #icon>
              <svg t="1725597687865" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="6784" width="15" height="15">
                <path
                  d="M483.4 674.5L396.6 578c-15.9-15.9-15.9-42 0-58h230.8c15.9 15.9 15.9 42 0 58l-86.1 96.4c-15.9 16.1-42.1 16.1-57.9 0.1z"
                  fill="#91B1D5" p-id="6785"></path>
                <path
                  d="M511 111.1c-27.6 0-50 22.4-50 50v442c0 27.6 22.4 50 50 50s50-22.4 50-50v-442c0-27.6-22.4-50-50-50z"
                  fill="#91B1D5" p-id="6786"></path>
                <path
                  d="M835.3 912.9H188.9c-25.4 0-49.1-9.9-66.9-27.8-17.8-17.9-27.5-41.6-27.5-66.6v-197c0-19.3 15.7-35 35-35s35 15.7 35 35v197c0 6.4 2.6 12.7 7.3 17.4 4.5 4.5 10.6 7 17.1 7h646.4c6.4 0 12.6-2.6 17.2-7.1 4.5-4.5 7-10.7 7-17.2V622.5c0-19.3 15.7-35 35-35s35 15.7 35 35v196c0 25.3-9.8 49-27.5 66.7-17.6 17.6-41.9 27.7-66.7 27.7z"
                  fill="#91B1D5" p-id="6787"></path>
              </svg>
            </template>
          </n-button>
          <n-button strong secondary>
            <n-tooltip    trigger="click">
              <template #trigger>
                  分享
              </template>
              <n-space>
                <n-button strong secondary circle type="success">

                  <template #icon>
                    <svg t="1725603310255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11045" width="15" height="15"><path d="M704 397.92c-15.04-140.96-151.04-251.36-316.48-251.36-176 0-317.92 124.16-317.92 277.28a267.36 267.36 0 0 0 129.12 224c8.8 5.6-29.12 85.28-19.68 90.08s28.48-11.2 48.8-26.56 39.52-29.76 48-26.88a362.56 362.56 0 0 0 112 17.44 376.16 376.16 0 0 0 57.44-4.48c36.96 84.8 133.44 145.44 246.56 145.44a305.12 305.12 0 0 0 88.16-12.96c4.48-1.28 21.76 11.36 39.2 24.16s35.36 25.76 39.68 24c13.76-5.76-25.44-69.92-12.96-77.44 65.76-40.48 108.48-105.92 108.48-180-0.16-120-111.04-217.12-250.4-222.72z m-109.12 167.2a28 28 0 1 1 27.68-28 27.84 27.84 0 0 1-27.68 28z m-165.76 54.72a204.64 204.64 0 0 0 1.44 24.32 314.72 314.72 0 0 1-42.88 2.88 302.08 302.08 0 0 1-103.36-17.76c-3.2-1.12-14.4-4.64-20.48 0a265.28 265.28 0 0 0-32 32 142.4 142.4 0 0 0 8.96-38.4c1.12-10.24-14.56-17.6-17.76-19.68a220 220 0 0 1-98.08-178.4c0-122.88 117.6-222.4 262.72-222.4 135.36 0 246.88 86.72 260.96 198.24-124.48 17.44-219.52 108.96-219.52 219.2z m331.68-54.72a28 28 0 1 1 27.68-28 27.68 27.68 0 0 1-27.68 28z" fill="#8DC81B" p-id="11046"></path><path d="M498.24 286.08a41.92 41.92 0 1 0 41.44 41.92 41.76 41.76 0 0 0-41.44-41.92zM276.96 286.08a41.92 41.92 0 1 0 41.6 41.92 41.6 41.6 0 0 0-41.6-41.92z" fill="#8DC81B" p-id="11047"></path></svg>
                  </template>
                </n-button>
                <n-button strong secondary circle type="warning">

                  <template #icon>
                    <svg t="1725603257075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7986" width="15" height="15"><path d="M512.2 736.1S266.2 886.9 251 874.6c-15.2-12.3 49.9-293.3 49.9-293.3S80.5 396.3 89.5 373.6c9-22.7 292-42.8 292-42.8S486.7 63.9 512.2 63.9c25.5 0 130.6 266.8 130.6 266.8S927 351 934.9 373.6c7.8 22.6-211.3 207.7-211.3 207.7s2.7 18 5.9 31.3c0.2 0.9-102.3 3.2-186.3 0-44.1-1.7-97.2-10-97.2-10l243.2-174.9s-88-16-176.9-19.2c-97.4-3.5-197.1 5.9-211.3 9.6-8.9 2.3 63 2.1 145 9.6 57.4 5.2 133 19.2 133 19.2L335.7 629.5s48.6 8.7 221.1 4.9 231.4-17.2 231.4-17c0.1 0.5-11.7 6.5-24.6 9-14.1 2.7-28.1 7.4-27.9 8 18.5 81 50.1 227.4 37.7 240.1-17.1 17.6-261.2-138.4-261.2-138.4z" fill="#F5BE3F" p-id="7987"></path></svg>
                  </template>
                </n-button>
                <n-button strong secondary circle type="error">

                  <template #icon>
                    <svg t="1725603279789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9078" width="15" height="15"><path d="M676.16 232.48s113.28-12 161.44 58.24 27.36 158.56 27.36 158.56a21.92 21.92 0 0 0 22.56 26.08h11.2A30.4 30.4 0 0 0 928 449.12s26.08-138.56-54.4-215.68c-62.72-60.32-148.64-66.88-183.04-66.88h-15.2a27.04 27.04 0 0 0-26.4 26.88v13.12a25.6 25.6 0 0 0 27.2 25.92zM453.12 758.08c79.04-16 132.48-81.92 119.52-148.64-11.2-57.44-67.84-96-133.76-96a163.52 163.52 0 0 0-32 3.2c-79.04 16-132.48 81.92-119.52 148.64s86.88 108.16 165.76 92.8z m2.24-171.68A24.64 24.64 0 1 1 432 611.04a24.48 24.48 0 0 1 23.36-24.64zM368 624.96c24.32-11.36 51.04-5.6 59.52 12.96s-3.52 42.72-27.52 54.08a60.96 60.96 0 0 1-25.12 5.76 36 36 0 0 1-34.4-18.88c-8.96-18.4 3.68-42.56 27.52-53.92z" fill="#F56467" p-id="9079"></path><path d="M467.52 857.44c208 0 374.4-110.24 374.4-246.4 0-114.88-141.76-114.88-141.76-122.4s70.72-74.08 0-115.68c-42.24-24.96-105.6-12.16-148.8 0a330.24 330.24 0 0 1-47.04 14.4c55.68-97.12-23.68-128-64-128-96 0-348.64 214.88-348.64 350.88s168.16 247.2 375.84 247.2z m-34.4-392.64c132.64-18.72 250.24 37.28 262.56 124.8s-85.28 173.76-218.08 192a365.28 365.28 0 0 1-50.72 3.52c-110.72 0-200.96-52.16-211.68-128-12.32-87.52 85.28-173.76 217.92-192.32z" fill="#F56467" p-id="9080"></path><path d="M780.64 444.16h16a21.44 21.44 0 0 0 20.64-17.44s18.88-73.12-24.96-113.12a111.04 111.04 0 0 0-75.84-28.16 108.32 108.32 0 0 0-25.28 2.56 21.12 21.12 0 0 0-17.44 20.16v6.88a16 16 0 0 0 17.92 16.8s48-6.56 71.36 21.6 5.12 73.76 5.12 73.76a12.32 12.32 0 0 0 12.48 16.96z" fill="#F56467" p-id="9081"></path></svg>
                  </template>
                </n-button>
              </n-space>

            </n-tooltip>
            <template #icon>
              <svg t="1725592625237" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="5303" width="15" height="15">
                <path
                  d="M853.333333 533.333333a32 32 0 0 1 64 0v266.666667c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V256c0-64.8 52.533333-117.333333 117.333333-117.333333h277.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v544a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V533.333333z m-42.058666-277.333333l-89.792-95.402667a32 32 0 0 1 46.613333-43.861333l140.544 149.333333C927.861333 286.485333 913.376 320 885.333333 320H724.704C643.029333 320 576 391.210667 576 480v192a32 32 0 1 1-64 0V480c0-123.296 94.784-224 212.704-224h86.570667z"
                  fill="#8a8a8a" p-id="5304" data-spm-anchor-id="a313x.search_index.0.i4.662f3a81z9rCJj"
                  class="selected"></path>
              </svg>
            </template>
          </n-button>


        </n-button-group>
      </div>

      <div style="height: 5px"></div>
      <n-tabs type="line" animated>
        <n-tab-pane v-for="(item, index) in localStreamingSource" :key="index" :name="item.name"
                    :tab="item.name" style="height: 99%;">
          <n-scrollbar  style="max-height: 320px;">
            <n-space style="flex-grow: 1;" justify="space-around">

              <n-button v-for="(item2, index2) in item.EpisodeCollection" :key="index2"
                        @click="setMediaSource(item2.url);setisToggLed(index+'-'+index2)" strong secondary
                        :type="isToggLed == index+'-'+index2 ? 'primary' : 'default'">
                {{ item2.title }}
              </n-button>

            </n-space>
          </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane v-for="(item, index) in props.streamingSource" :key="index" :name="item.name"
                    :tab="item.name" style="height: 99%;">
          <n-scrollbar  style="max-height: 320px;">
            <n-space style="flex-grow: 1;" justify="start">


              <n-button v-for="(item2, index2) in item.EpisodeCollection" :key="index2"
                        @click="setMediaSource(item2.url);setisToggLed(index+'-'+index2)" strong secondary
                        :type="isToggLed == index+'-'+index2 ? 'primary' : 'default'">
                {{ item2.title }}
              </n-button>


            </n-space>
          </n-scrollbar>
        </n-tab-pane>
      </n-tabs>

    </div>
  </div>
  <div class="center_layout">
    <div
      ref="myDiv"
      style="width: 100%; height: 100%; border-radius: 10px; background-color: #000000"
    ></div>


  </div>
</template>

<style scoped>




.image-container {
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 0; /* 左上角位置 */
}

.shoChanT {

}

@media (max-width: 1218px) {
  .shoChanT {
    display: none !important;
  }

}

@media (max-width: 835px) {
  .right_layout {
    display: none;
  }

  .center_layout {
    width: 100% !important;
  }
}


.NeworldscroE {

  width: 100%;
  height: 99%; /* 添加显式高度 */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    width: 0px; /* Chrome, Safari */
  }
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

.carousel-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.video-info-itemtitle {
  color: hsla(0, 0%, 100%, 0.6);
  min-width: 46px;
  font-weight: 700;
}

.video-subtitle {
  color: hsla(0, 0%, 100%, 0.6);

  margin: -5px auto 0;
  max-width: 90%;
  padding-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  position: absolute;
  z-index: 3;
  bottom: 1%;
  left: 20%;
}

.page-title {
  position: absolute;
  z-index: 3;
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 38px;
  line-height: 1.3;
  padding: 0 30px;
  text-shadow: 1px 1px 0 #fff;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  bottom: 10%;
}

.img_div {
  filter: blur(8px);
  -webkit-filter: blur(8px);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;
}

/* 在背景图像上添加半透明黑色覆盖层 */
.img_div::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(20, 20, 20, 0.5); /* 这里调整黑色覆盖层的透明度 */
  z-index: 1;
}

.left_layout {
  width: 20%;
  height: 100%;
  float: left;
  padding: 5px;
  background-color: #25252b;
}

.center_layout {
  width: 80%;
  height: 100%;
  float: right;
  padding: 10px;
  padding-top: 0px;
}

.right_layout {
  width: 20%;
  height: 100%;
  float: right;
  padding: 10px;
  padding-top: 0px;
  padding-left: 5px;
}

.nplayer {
  border-radius: 10px;
}

.nplayer_control_bg {
  border-radius: 10px;
}


</style>
