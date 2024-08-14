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

const isToggLed = ref('0-0')
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

const props = defineProps({
  myPropTitle: String,
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
        $('a').each(function(n, m) {
          console.log('第' + (n + 1) + '条')
          if ('bfurl' === $(m).attr('id')) {
            loadSource.value = $(m).attr('href') ?? ''

            console.log(loadSource.value)
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
            } else {
              console.warn('Unsupported file format:', loadSource.value)
              setTimeout(() => {
                searchForAlternativeSources()
              }, 5000) // 等待 5 秒
            }
          } else {
            return
          }
        })

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
      style="
        width: 100%;
        height: 100%;
        background-color: #25252b;
        border-radius: 10px;
        padding: 5px;
      "
    >
      <n-h3 style="text-align: center">
        {{ props.myPropTitle }}
      </n-h3>
      <n-tabs type="bar" animated placement="right" style="height: 95%;">

        <n-tab-pane v-for="(item, index) in localStreamingSource" :key="index" :name="item.name"
                    :tab="item.name" style="height: 99%;">
          <div class="NeworldscroE">
            <n-space style="flex-grow: 1;" justify="end">
              <n-button @click="setMediaSource(item2.url);isToggLed=index+'-'+index2" strong secondary
                        v-for="(item2, index2) in item.EpisodeCollection"
                        :key="index2" :type="isToggLed == index+'-'+index2 ? 'primary' : 'default'">
                {{ item2.title }}
              </n-button>
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane v-for="(item, index) in props.streamingSource" :key="index" :name="item.name"
                    :tab="item.name" style="height: 99%;">
          <div class="NeworldscroE">
            <n-space style="flex-grow: 1;" justify="end">
              <n-button @click="setMediaSource(item2.url);isToggLed=index+'-'+index2" strong secondary
                        v-for="(item2, index2) in item.EpisodeCollection"
                        :key="index2" :type="isToggLed == index+'-'+index2 ? 'primary' : 'default'">
                {{ item2.title }}
              </n-button>
            </n-space>
          </div>
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
  width: 78%;
  height: 100%;
  float: right;
  padding: 10px;
  padding-top: 0px;
}

.right_layout {
  width: 22%;
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

.n-tabs {
  background-color: rgb(39, 39, 39)
}
</style>
