<script setup lang="ts">


import { sites, OptionSelects } from '../OptionSelectsSub' // 国产剧（x
import { AMERICANMOVIES } from '../AmericanMovies'// 香港剧
import { DOMESTICDRAMA } from '../DomesticDrama'//台湾剧
import { TvAncientCostumes } from '../TvAncientCostume'//日本剧
import { Warfares } from '../Warfare'//韩国剧
import { Comedys } from '../Comedy'//欧美剧
import { Familys } from '../Family'//泰国剧
import { Crimes } from '../Crime'//大陆综艺
import { HKtv } from '../HkTv' //港台综艺
import { kRjpTv } from '../KrJpTv'//日韩综艺
import { EnUsTv } from '../EuUsTv'//欧美综艺
import { CnAnimeTv } from '../CnAnimeTv'//国产动漫
import { HkTwTv } from '../HkTwTv'//港台动漫
import { JpKrAnimeTv } from '../JpKrAnimeTv'//日韩动漫
import { EuUsAnimeTv } from '../EuUsAnimeTv'//欧美动漫
import { OverseaAnime } from '../OverseasAnime'//海外动漫

import { ActionMovieTv } from '../ActionMovieTv'//动作片
import { ComedyMovieTv } from '../ComedyMovieTv'//喜剧片
import { LoveMovieTv } from '../LoveMovieTv'//爱情片
import { SciFiMovieTv } from '../SciFiMovieTv'//科幻片
import { HorrorMovieTv } from '../HorrorMovieTv'//恐怖片
import { DramaMovieTv } from '../DramaMovieTv'//剧情片
import { WarMovieTv } from '../WarMovieTv'//战争片
import { DocumentaryTv } from '../DocumentaryTv'//纪录片
import { UHD4KMovieTv } from '../UHD4KMovieTv'//4K电影
import { useStore } from 'vuex'
import { computed, ref, onBeforeMount, onUnmounted } from 'vue'

import axios from 'axios'
import * as cheerio from 'cheerio'

interface fetchMiscArticles {
  title?: string,
  briefDescription?: string,
  fullDescription?: string,
  url?: string
}

const OptionListSubSelected = ref(-1)

const store = useStore()

const fetchMiscArticlesB = ref<fetchMiscArticles[]>([])

// 使用store.commit来调用mutation
const setplayVideoType = (url: string) => {
  store.commit('SET_PAYVIDEOTYPE', url)
}
const setbreadcrumbs = (setbreadcrumb: string[]) => {
  store.commit('SET_BREADCRUMBS', setbreadcrumb)
}

const setpage = (page: number) => {
  store.commit('SET_PAGE', page)
}


const settotal = (total: number) => {
  store.commit('SET_TOTAL', total)
}

const setPaginationUrl = (PaginationUrl: string) => {
  store.commit('SET_PAGINATIONURL', PaginationUrl)
}


// 直接从 store 访问状态，这个是分类起始地址，当改变时，会触发计算属性的 getter
const playVideoType = computed(() => store.state.playVideoType)

// 使用computed属性来访问getter
const playAddress2 = computed(() => store.getters.getPlayAddress2)

// 使用computed属性来访问getter
const breadcrumbs = computed(() => store.getters.getBreadcrumbs)

// 使用computed属性来访问getter
const page = computed(() => store.getters.getPage)
// 使用computed属性来访问getter
const total = computed(() => store.getters.getTotal)
// 使用computed属性来访问getter
const PaginationUrl = computed(() => store.getters.getPaginationUrl)

// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)

const combinedLists: OptionSelects[][] = [sites,
  AMERICANMOVIES,
  DOMESTICDRAMA,
  TvAncientCostumes,
  Warfares,
  Comedys,
  Familys,
  Crimes,
  HKtv,
  kRjpTv,
  EnUsTv,
  CnAnimeTv,
  HkTwTv,
  JpKrAnimeTv,
  EuUsAnimeTv,
  OverseaAnime,
  ActionMovieTv,
  ComedyMovieTv,
  LoveMovieTv,
  SciFiMovieTv,
  HorrorMovieTv,
  DramaMovieTv,
  WarMovieTv,
  DocumentaryTv,
  UHD4KMovieTv
]


// 使用Map来存储每个key对应的所有对象
const groupedByKey = new Map<string, OptionSelects[]>()

let sitesPro: OptionSelects[] = groupedByKey.get(String(playAddress2.value)) || []

const scrapeArticles = () => {
  axios
    .get('https://top.baidu.com/board?tab=realtime')
    .then((resp) => {
      fetchMiscArticlesB.value = []
      const $ = cheerio.load(resp.data)
      $('div.category-wrap_iQLoo.horizontal_1eKyQ').each(function(_n, m) {

        const urlLength: string = $($($(m).children('div.content_1YWBm')).children('div.hot-desc_1m_jR.large_nSuFU')).children('a').attr('href') ?? ''
        fetchMiscArticlesB.value.push(
          {
            title: $($(m).children('div.content_1YWBm')).children('a').text(),
            briefDescription: $($($(m).children('div.content_1YWBm')).children('div.hot-desc_1m_jR.large_nSuFU')).text(),
            url: urlLength.substring(6, urlLength.length)
          }
        )

      })
    }).catch((err) => {
    console.log(err)
  })
}

scrapeArticles()

const watchPlayAddress2 = () => {
  OptionListSubSelected.value = -1
  combinedLists.forEach((array, index) => {

    // 只检查数组的第一个元素的key
    const firstKey = array[0].key


    // 检查Map中是否已经有这个key的数组
    let group = groupedByKey.get(String(playAddress2.value))

    // 如果没有，创建一个新的数组
    if (!group) {
      group = array
      groupedByKey.set(firstKey, group)
    } else {
      // 如果有，说明有重复的key，可以根据需要处理
      console.warn(`${index} Duplicate key found: ${firstKey}`)
    }

  })

  sitesPro = groupedByKey.get(String(playAddress2.value)) || []


  //进入文章列表，抓取最新文章
  if (sitesPro.length <= 0 || -1 == playAddress2.value) {
    scrapeArticles()
  }
}

// watch(playAddress2, (newVal, oldVal) => {
//   console.log('playAddress2 changed from', oldVal, 'to', newVal)
//   OptionListSubSelected.value = -1
//   combinedLists.forEach((array, index) => {
//
//     // 只检查数组的第一个元素的key
//     const firstKey = array[0].key
//
//
//     // 检查Map中是否已经有这个key的数组
//     let group = groupedByKey.get(String(newVal))
//
//     // 如果没有，创建一个新的数组
//     if (!group) {
//       group = array
//       groupedByKey.set(firstKey, group)
//     } else {
//       // 如果有，说明有重复的key，可以根据需要处理
//       console.warn(`${index} Duplicate key found: ${firstKey}`)
//     }
//
//   })
//
//   sitesPro = groupedByKey.get(String(playAddress2.value)) || []
//
//
//   //进入文章列表，抓取最新文章
//   if (sitesPro.length <= 0 || -1 == playAddress2.value) {
//     scrapeArticles()
//   }
//
// })
//

//改变选项卡目录
const mountedOptionLists = (value: string, setbreadcrumb: string[], page: number, total: number, PaginationUrl: string, index: number) => {
  // 获取当前时间的时间戳
  const timestamp = Date.now()
  setplayVideoType(value + '${' + `${timestamp}`)
  setbreadcrumbs(setbreadcrumb)
  setpage(page)
  settotal(total)
  setPaginationUrl(PaginationUrl)
  OptionListSubSelected.value = index
}

//打开文章
const openArticle = (url: string | undefined) => {
  //使用electron 的shell
  window.electron.ipcRenderer.send('OpenExternal', 'https:' + url)
}


//插入一些来自官方的广告，每隔离2分钟查询一次广告

let intervalId: NodeJS.Timeout | null = null

const hasOfficialAds = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/65tiankehan/GlobalTV_profile/main/advertisement.json')
    const newfetchMiscArticles: fetchMiscArticles[] = response.data

    const existingTitles = fetchMiscArticlesB.value.map((notice) => notice.title)
    const filteredNewfetchMiscArticlesB = newfetchMiscArticles.filter(
      (notice) => !existingTitles.includes(notice.title)
    )


    if (filteredNewfetchMiscArticlesB.length > 0) {
      // 合并现有文章，往文章列表插入，广告，在前面
      const mergedfetchMiscArticlesB = [...filteredNewfetchMiscArticlesB, ...fetchMiscArticlesB.value]
      fetchMiscArticlesB.value = mergedfetchMiscArticlesB

    }
  } catch (error) {
    console.error('Failed to fetch fetchMiscArticles:', error)
  }
}
onBeforeMount(() => {
  intervalId = setInterval(hasOfficialAds, 120000) // 每2分钟检查一次
  console.log('想法：每次点击都重新before' +playAddress2.value)
  watchPlayAddress2()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

</script>

<template>
  <div class="optionList">
    <div :class="skin == 'lightTheme' ? 'div2_LayoutX ' :'div2_Layout ' ">
      <div v-if="false" class="accountPmc_Card accountPmc_Card_row animate__animated animate__backInRight">
        <div
          @click="mountedOptionLists(playVideoType,breadcrumbs,page,total,PaginationUrl,-1)"
          :class=" -1 == OptionListSubSelected
            ? skin == 'lightTheme' ? 'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_dX' :'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_d'
            : skin == 'lightTheme' ? 'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height ' : 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height '
            "
          style="justify-content: flex-start"
        >
          <div style="display: flex; align-items: flex-start; justify-content: space-between">
            <n-button text style="font-size: 24px">
              <svg t="1721798633951" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="43565" width="24" height="24">
                <path
                  d="M761.978355 509.439688c-46.817282 0-90.831728-18.231223-123.93466-51.334155l-61.620429-61.624523c-33.106002-33.102932-51.337225-77.116355-51.337225-123.932614s18.231223-90.831728 51.338249-123.93773l61.619406-61.619406c33.103956-33.103956 77.117378-51.335179 123.93466-51.335179s90.832751 18.231223 123.935684 51.335179l61.618383 61.619406c33.107025 33.106002 51.338249 77.121472 51.338249 123.93773s-18.231223 90.829681-51.338249 123.933637l-61.618383 61.623499C852.811106 491.208465 808.795637 509.439688 761.978355 509.439688zM761.978355 72.495104c-36.977169 0-71.739904 14.398942-97.886401 40.545438l-61.619406 61.619406c-26.14752 26.14752-40.547485 60.912301-40.547485 97.888448 0 36.975123 14.399965 71.737858 40.547485 97.883331l61.620429 61.625546c26.145473 26.14445 60.908208 40.544415 97.885378 40.544415 36.978193 0 71.739904-14.398942 97.886401-40.544415l61.618383-61.623499c26.148543-26.146497 40.548508-60.909232 40.548508-97.884354 0-36.976146-14.399965-71.739904-40.547485-97.888448l-61.619406-61.619406C833.718259 86.895069 798.956547 72.495104 761.978355 72.495104z"
                  fill="#FF9000" p-id="43566"></path>
                <path
                  d="M289.508673 491.393683l-87.143733 0c-96.644107 0-175.270862-78.625732-175.270862-175.270862l0-87.148849c0-96.644107 78.625732-175.270862 175.270862-175.270862l87.143733 0c96.645131 0 175.270862 78.625732 175.270862 175.270862l0 87.148849C464.779535 412.766928 386.153804 491.393683 289.508673 491.393683zM202.364941 90.542132c-76.331479 0-138.431839 62.10036-138.431839 138.431839l0 87.148849c0 76.331479 62.10036 138.431839 138.431839 138.431839l87.143733 0c76.331479 0 138.431839-62.10036 138.431839-138.431839l0-87.148849c0-76.331479-62.10036-138.431839-138.431839-138.431839L202.364941 90.542132z"
                  fill="#FF9000" p-id="43567"></path>
                <path
                  d="M805.549709 996.451574l-87.142709 0c-96.644107 0-175.270862-78.625732-175.270862-175.269839l0-87.148849c0-96.644107 78.626755-175.269839 175.270862-175.269839l87.142709 0c96.644107 0 175.270862 78.625732 175.270862 175.269839l0 87.148849C980.820572 917.825842 902.193817 996.451574 805.549709 996.451574zM718.407 595.601046c-76.332503 0-138.431839 62.10036-138.431839 138.430816l0 87.148849c0 76.331479 62.10036 138.430816 138.431839 138.430816l87.142709 0c76.332503 0 138.431839-62.10036 138.431839-138.430816l0-87.148849c0-76.331479-62.10036-138.430816-138.431839-138.430816L718.407 595.601046z"
                  fill="#FF9000" p-id="43568"></path>
                <path
                  d="M289.508673 996.451574l-87.143733 0c-96.644107 0-175.270862-78.625732-175.270862-175.269839l0-87.148849c0-96.644107 78.625732-175.269839 175.270862-175.269839l87.143733 0c96.645131 0 175.270862 78.625732 175.270862 175.269839l0 87.148849C464.779535 917.825842 386.153804 996.451574 289.508673 996.451574zM202.364941 595.601046c-76.331479 0-138.431839 62.10036-138.431839 138.430816l0 87.148849c0 76.331479 62.10036 138.430816 138.431839 138.430816l87.143733 0c76.331479 0 138.431839-62.10036 138.431839-138.430816l0-87.148849c0-76.331479-62.10036-138.430816-138.431839-138.430816L202.364941 595.601046z"
                  fill="#FF9000" p-id="43569"></path>
              </svg>
            </n-button>
            <p style="color: #c4c4c4">
              {{ sitesPro.length <= 0 ? '热点新闻事件' : '二级选项' }}</p>
          </div>
        </div>
      </div>

      <div v-show="-1 != playAddress2" class="" style="width: 100%; height: 94%">

        <div
          v-for="(item, index) in sitesPro"
          :key="index"
          class="accountPmc_Card accountPmc_Card_row animate__animated animate__backInRight"
        >
          <div
            @click="mountedOptionLists(item.url,item.breadcrumb,item.Pagination.page,item.Pagination.total,item.PaginationUrl,index)"
            :class="
              index == OptionListSubSelected
                 ? skin == 'lightTheme' ? 'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_dX' :'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_d'
            : skin == 'lightTheme' ? 'accountPmc_Card_PX accountPmc_Card_P_Hideout setup_button_height ' : 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height '
            "
            style="justify-content: flex-start"
          >
            <div style="display: flex; align-items: flex-start; justify-content: space-between">
              <n-button text style="font-size: 24px">
                <div v-html="item.icon"></div>
              </n-button>
              <p style="color: #c4c4c4">{{ item.name }}</p>
            </div>
          </div>
        </div>
        <n-space vertical v-show="sitesPro.length <= 0">
          <n-card v-for="(item, index) in fetchMiscArticlesB" :key="index" :title="item.title" embedded
                  :bordered="false">
            {{ item.briefDescription }}
            <template #header-extra>
              <n-tooltip
                placement="left"
                trigger="hover"

              >
                <template #trigger>
                  <n-button @click="openArticle(item.url)" strong secondary circle>
                    <svg t="1722300411261" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4946" width="20" height="20">
                      <path
                        d="M845.824 944.128H186.368c-55.296 0-102.4-47.104-102.4-102.4V325.632c0-57.344 47.104-102.4 102.4-102.4h657.408c57.344 0 102.4 47.104 102.4 102.4v518.144c2.048 55.296-45.056 100.352-100.352 100.352z"
                        fill="#FDDFDF" p-id="4947"></path>
                      <path
                        d="M307.2 88.064l204.8 83.968c63.488 24.576 114.688 98.304 114.688 159.744v499.712c0 63.488-49.152 94.208-114.688 67.584l-204.8-83.968C243.712 790.528 192.512 716.8 192.512 655.36V157.696c0-63.488 51.2-96.256 114.688-69.632z"
                        fill="#FDDFDF" p-id="4948"></path>
                      <path
                        d="M794.624 421.888H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528z m0 169.984H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528zM794.624 786.432H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528z"
                        fill="#EE9B9B" p-id="4949"></path>
                    </svg>
                  </n-button>
                </template>
                <span> 阅读文章 </span>
              </n-tooltip>

            </template>
          </n-card>
        </n-space>
      </div>
      <div v-show="-1 == playAddress2" class="" style="width: 100%; height: 100%">
        <n-space vertical>
          <n-card v-for="(item, index) in fetchMiscArticlesB" :key="index" :title="item.title" embedded
                  :bordered="false">
            {{ item.briefDescription }}
            <template #header-extra>
              <n-tooltip
                placement="left"
                trigger="hover"

              >
                <template #trigger>
                  <n-button @click="openArticle(item.url)" strong secondary circle>
                    <svg t="1722300411261" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4946" width="20" height="20">
                      <path
                        d="M845.824 944.128H186.368c-55.296 0-102.4-47.104-102.4-102.4V325.632c0-57.344 47.104-102.4 102.4-102.4h657.408c57.344 0 102.4 47.104 102.4 102.4v518.144c2.048 55.296-45.056 100.352-100.352 100.352z"
                        fill="#FDDFDF" p-id="4947"></path>
                      <path
                        d="M307.2 88.064l204.8 83.968c63.488 24.576 114.688 98.304 114.688 159.744v499.712c0 63.488-49.152 94.208-114.688 67.584l-204.8-83.968C243.712 790.528 192.512 716.8 192.512 655.36V157.696c0-63.488 51.2-96.256 114.688-69.632z"
                        fill="#FDDFDF" p-id="4948"></path>
                      <path
                        d="M794.624 421.888H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528z m0 169.984H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528zM794.624 786.432H243.712c-12.288 0-22.528-8.192-22.528-22.528 0-12.288 8.192-22.528 22.528-22.528h550.912c12.288 0 22.528 12.288 22.528 22.528 0 12.288-12.288 22.528-22.528 22.528z"
                        fill="#EE9B9B" p-id="4949"></path>
                    </svg>
                  </n-button>
                </template>
                <span> 阅读文章 </span>
              </n-tooltip>

            </template>
          </n-card>

        </n-space>

      </div>

    </div>
  </div>
</template>

<style scoped>
.optionList {
  width: 100%;
  height: 100%;

  padding: 5px;
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


/* 定义动画 */
@keyframes hoverEffect {
  0% {
    transform: translateY(-2.5px) scale(1); /* 开始状态 */
  }
  30% {
    transform: translateY(-2.5px) scale(0.96); /* 缩小 */
  }
  100% {
    transform: translateY(-2.5px) scale(1); /* 放大 */
  }
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
  animation: hoverEffect 0.95s ease-in-out forwards; /* 只在鼠标悬停时播放动画 */

}

.accountPmc_Card_PX {
  width: 230px;
  height: 220px;
  background-color: #fafafc;
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
  animation: hoverEffect 0.95s ease-in-out forwards; /* 只在鼠标悬停时播放动画 */

}


.accountPmc_Card_P_d {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.accountPmc_Card_P_dX {
  box-shadow: 0 0 10px rgba(66, 64, 64, 0.3);
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

.div2_LayoutX {
  flex: 1 0 100%;
  padding: 5px;
  background-color: #FFFF;
  border-top-left-radius: 5px;
  color: #1c1c1c;
  height: 100%;
}

.div2_Layout {
  flex: 1 0 100%;
  padding: 5px;
  background-color: #2c2c32;
  border-top-left-radius: 5px;
  color: #eaeaea;
  /* border: 1px solid rgb(50, 50, 50); */
  height: 100%;
}



</style>
