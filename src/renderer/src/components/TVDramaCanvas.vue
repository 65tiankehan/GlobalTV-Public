<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 16:04:47
 * @LastEditTime: 2024-03-21 13:57:12
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import * as cheerio from 'cheerio'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import IndexedDBManager from '../indexedDB.js'


import {
  // LogoMarkdown as LogoMarkdown,
  PlayCircleSharp as LogoGooglePlaystore
} from '@vicons/ionicons5'

//消息接口
export interface Notice {
  title: string,
  message: string
}

interface tvDrama {
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

defineProps({
  myPropHeight: String
})

const store = useStore()


// 使用computed属性来访问getter
const payVideoUrl = computed(() => store.getters.getPayVideoUrl)

// 直接从 store 访问状态，这个是分类起始地址，当改变时，会触发计算属性的 getter
const playVideoType = computed(() => store.state.playVideoType)

// 使用computed属性来访问getter
// const notices = computed(() => store.getters.getNotices)

// 直接从 store 访问状态，这个是搜索，当改变时，会触发计算属性的 getter
const playRoute = computed(() => store.state.playRoute)

// 直接从 store 访问状态，这个是历史，当改变时，会触发计算属性的 getter
const History = computed(() => store.state.History)

// 直接从 store 访问状态，这个是收藏，当改变时，会触发计算属性的 getter
const Favorite = computed(() => store.state.Favorite)

// 使用computed属性来访问getter
const breadcrumbs = computed(() => store.getters.getBreadcrumbs)

// 使用computed属性来访问getter
const skin = computed(() => store.getters.getSkin)
// 使用store.commit来调用mutation
const setVideoDetailsLoading = (url: string) => {
  store.commit('SET_VIDEODETAILSLOADING', url)
}

const setpage = (page: number) => {
  store.commit('SET_PAGE', page)
}


const settotal = (total: number) => {
  store.commit('SET_TOTAL', total)
}

const dbManager = new IndexedDBManager()

const NeworldscroE = ref<HTMLElement | null>(null)
const journalismList = ref<tvDrama[]>([])
const FavoritesList = ref<tvDrama[]>([])
const message = useMessage()

const totalSUrlElX = ref<string>('')

const typeUrlIpX = ref('')
const LatestMovies = ref([])
const tuplesX = ref([])

// 解析所有搜索结果页面
async function AxiosAddJournalismList(searchUrls: string[]) {
  searchUrls.forEach((searchUrl) => {
    axios
      .get(payVideoUrl.value + searchUrl)
      .then((resp) => {
        const arrx: tvDrama[] = []
        const $ = cheerio.load(resp.data)
        $('ul.ewave-vodlist.clearfix').each(function(_n, m) {
          $(m).children('li').each(function(_b, j) {
            const pro = {
              moviesUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('data-original'),
              moviesImgUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('href'),
              name: $($(j).children('div.ewave-vodlist__box')).children('a').attr('title'),
              Preview: Math.floor(Math.random() * 100) + 1,
              like: Math.floor(Math.random() * 100) + 1,
              comment: Math.floor(Math.random() * 100) + 1,
              download: false,
              Progress: 0
            }

            $($($(j).children('div.ewave-vodlist__box')).children('a')).children('span').each(function(c, d) {

              if ($(d).text() != '' && c == 2) {
                pro['prompt'] = $(d).text()
              }
              if ($(d).text() != '' && c == 1) {
                pro['prompt2'] = $(d).text()
              }
            })
            arrx.push(pro)
          })
        })

        // eslint-disable-next-line vue/no-ref-as-operand
        const mergedfetchMiscArticlesB = [...journalismList.value, ...arrx]
        journalismList.value = mergedfetchMiscArticlesB
      }).catch((err) => {
      console.log(err)
    })
  })

}

//得到详情地址，去除地址中的${及其后面的字符串，返回剩于字符串
function extractBeforeDollarBrace(str: string): string {
  const index = str.indexOf('${')
  if (index !== -1) {
    return str.slice(0, index)
  }
  return str // 如果没有找到 '${'，返回原始字符串
}

// 监听 playVideoType 的变化,刷新journalismList
watch(playVideoType, (newVal, oldVal) => {
  console.log('playVideoType changed from', oldVal, 'to', newVal)
  if (NeworldscroE.value) {//将页面滚动到顶部
    NeworldscroE.value.scrollTop = 0
  }
  if (extractBeforeDollarBrace(newVal) === payVideoUrl.value) {//如果一级目录点击首页，那就调用首页代码
    console.log('调用首页')
    fetchMovies()
  } else {
    axios
      .get(payVideoUrl.value + extractBeforeDollarBrace(playVideoType.value))
      .then((resp) => {
        message.loading('正在加载影视数据（已显示数据为准）', { duration: 1500 })
        journalismList.value = []
        const arrx: tvDrama[] = []

        const $ = cheerio.load(resp.data)

        $('ul.ewave-vodlist.clearfix').each(function(_n, m) {
          $(m).children('li').each(function(_b, j) {
            const pro = {
              moviesUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('data-original'),
              moviesImgUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('href'),
              name: $($(j).children('div.ewave-vodlist__box')).children('a').attr('title'),
              Preview: Math.floor(Math.random() * 100) + 1,
              like: Math.floor(Math.random() * 100) + 1,
              comment: Math.floor(Math.random() * 100) + 1,
              download: false,
              Progress: 0
            }

            $($($(j).children('div.ewave-vodlist__box')).children('a')).children('span').each(function(c, d) {

              if ($(d).text() != '' && c == 2) {
                pro['prompt'] = $(d).text()
              }
              if ($(d).text() != '' && c == 1) {
                pro['prompt2'] = $(d).text()
              }
            })
            arrx.push(pro)
          })
        })

        // eslint-disable-next-line vue/no-ref-as-operand
        journalismList.value = arrx

        message.success('刷新成功！', { duration: 1500 })
      }).catch((err) => {
      console.log(err)
    })

  }
})

// 监听 playRoute 的变化,刷新journalismList（搜索）
watch(playRoute, (newVal, oldVal) => {
  console.log('playRoute changed from', oldVal, 'to', newVal)
  if (NeworldscroE.value) {//将页面滚动到顶部
    NeworldscroE.value.scrollTop = 0
  }
  if (newVal === payVideoUrl.value) {//如果一级目录点击首页，那就调用首页代码
    fetchMovies()
  } else {

    axios
      .get(payVideoUrl.value + 'so/-------------.html?wd=' + extractBeforeDollarBrace(newVal))
      .then((resp) => {
        message.loading('正在加载影视数据（已显示数据为准）', { duration: 1500 })
        journalismList.value = []
        const arrx: tvDrama[] = []

        const $ = cheerio.load(resp.data)

        $('ul.ewave-vodlist.clearfix').each(function(_n, m) {
          $(m).children('li').each(function(_b, j) {
            const pro = {
              moviesUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('data-original'),
              moviesImgUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('href'),
              name: $($(j).children('div.ewave-vodlist__box')).children('a').attr('title'),
              Preview: Math.floor(Math.random() * 100) + 1,
              like: Math.floor(Math.random() * 100) + 1,
              comment: Math.floor(Math.random() * 100) + 1,
              download: false,
              Progress: 0
            }

            $($($(j).children('div.ewave-vodlist__box')).children('a')).children('span').each(function(c, d) {

              if ($(d).text() != '' && c == 2) {
                pro['prompt'] = $(d).text()
              }
              if ($(d).text() != '' && c == 1) {
                pro['prompt2'] = $(d).text()
              }
            })
            arrx.push(pro)
          })
        })

        const searchUrls: string[] = []
        $('ul.ewave-page.text-center.clearfix').children('li.hide-mobile').each(function(_n, m) {
          const searchUrl = $(m).children('a').attr('href') ?? ''
          if (searchUrl.lastIndexOf('.html') != -1) {
            searchUrls.push(searchUrl)
          }

        })

        //调用异步去解析剩余的页面
        AxiosAddJournalismList(searchUrls)

        // eslint-disable-next-line vue/no-ref-as-operand
        journalismList.value = arrx
        message.success('刷新成功！', { duration: 1500 })
      }).catch((err) => {
      console.log(err)
    })

  }
})

// 监听Favorite的变化，刷新journalismList（收藏）
watch(Favorite, (newVal, oldVal) => {
  console.log('Favorite changed from', oldVal, 'to', newVal)
  if (newVal.includes('Clear')) {
    clearFavorite()
  } else {
    getFavorites()
  }
})
// 监听History的变化，刷新journalismList（历史）
watch(History, (newVal, oldVal) => {
  console.log('History changed from', oldVal, 'to', newVal)
  if (newVal.includes('Clear')) {
    clearHistory()
  } else {
    getHistorys()
  }
})


const fetchMovies = () => {

  totalSUrlElX.value = extractBeforeDollarBrace(payVideoUrl.value)
  typeUrlIpX.value = ''
  message.loading('正在加载影视数据（已显示数据为准）', { duration: 1500 })
  axios
    .get(totalSUrlElX.value)
    .then((resp) => {

      journalismList.value = []
      LatestMovies.value = []
      tuplesX.value = []
      const $ = cheerio.load(resp.data)

      const arrx: tvDrama[] = []
      //最新影片 start 默认首页解析

      $('ul.ewave-vodlist.clearfix').each(function(_n, m) {
        $(m).children('li').each(function(_b, j) {
          const pro = {
            moviesUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('data-original'),
            moviesImgUrl: $($(j).children('div.ewave-vodlist__box')).children('a').attr('href'),
            name: $($(j).children('div.ewave-vodlist__box')).children('a').attr('title'),
            Preview: Math.floor(Math.random() * 100) + 1,
            like: Math.floor(Math.random() * 100) + 1,
            comment: Math.floor(Math.random() * 100) + 1,
            download: false,
            Progress: 0
          }

          $($($(j).children('div.ewave-vodlist__box')).children('a')).children('span').each(function(c, d) {
            if ($(d).text() != '' && c == 2) {
              pro['prompt'] = $(d).text()
            }
            if ($(d).text() != '' && c == 1) {
              pro['prompt2'] = $(d).text()
            }
          })
          arrx.push(pro)
        })
      })
      // eslint-disable-next-line vue/no-ref-as-operand
      journalismList.value = arrx
      message.success('刷新成功！', { duration: 1500 })

    })
    .catch((err) => {
      console.log(err)
    })


}
fetchMovies()

setInterval(setFavoritesList, 10000) // 每10秒检查一次(收藏)
//通知Layout进入详情加载
const showDetails = (url: string | undefined, index: number) => {

  if (url) {
    // 获取当前时间的时间戳
    const timestamp = Date.now()
    setVideoDetailsLoading(url + '${' + `${timestamp}`)
    setHistory(index)
  } else {
    console.log('')
  }

}


//清空历史记录
async function clearHistory() {
  await dbManager.delete('history')
  if (breadcrumbs.value[0] == '历史记录') {
    journalismList.value = []
  }
  message.success('清空历史记录成功！', { duration: 1500 })
}

//清空收藏
async function clearFavorite() {
  await dbManager.delete('favorites')
  if (breadcrumbs.value[0] == '收藏夹') {
    journalismList.value = []
  }
  message.success('清空收藏成功！', { duration: 1500 })
}

//往历史，插入一个值
async function setHistory(index: number) {
  let history = await dbManager.get('history')
  const arrx: tvDrama[] = history?.inventory || []

  // 如果`history`不存在，则创建一个新的`history`对象
  if (!history) {
    history = { id: 'history', inventory: arrx }
    await dbManager.add(history)
  } else {
    // 如果`history`已存在，则直接修改`inventory`
    const itemToAdd = journalismList.value[index]
    const exists = arrx.some(item => item.name === itemToAdd.name)

    if (!exists) {
      arrx.unshift(itemToAdd)
      history.inventory = arrx
    }
  }
  // 更新`history`对象
  await dbManager.update(history.id, history)

}

//往收藏，插入一个值
async function setFavorite(index: number) {
  let history = await dbManager.get('favorites')
  const arrx: tvDrama[] = history?.inventory || []

  // 如果`favorites`不存在，则创建一个新的`favorites`对象
  if (!history) {
    history = { id: 'favorites', inventory: arrx }
    await dbManager.add(history)
  } else {
    // 如果`favorites`已存在，则直接修改`inventory`
    const itemToAdd = journalismList.value[index]
    const exists = arrx.some(item => item.name === itemToAdd.name)

    if (!exists) {
      journalismList.value[index].favorites = true
      arrx.unshift(itemToAdd)
      history.inventory = arrx
    }
  }
  // 更新`favorites`对象
  await dbManager.update(history.id, history)

}

//查询所有历史记录
async function getHistorys() {
  const history = await dbManager.get('history')

  journalismList.value = history?.inventory || []

  // 计算页数
  // if (journalismList.value.length > 0) {
  //   const pageCount = Math.ceil(journalismList.value.length / 48)
  //   const adjustedPageCount = pageCount > 0 ? pageCount : 1
  //   setpage(1)
  //   settotal(adjustedPageCount)
  // }
  setpage(1)
  settotal(0)
}

//查询所有收藏记录
async function getFavorites() {
  const history = await dbManager.get('favorites')

  journalismList.value = history?.inventory || []
  // 计算页数
  // if (journalismList.value.length > 0) {
  //   const pageCount = Math.ceil(journalismList.value.length / 48)
  //   const adjustedPageCount = pageCount > 0 ? pageCount : 1
  //   setpage(1)
  //   settotal(adjustedPageCount)
  // }
  setpage(1)
  settotal(0)
}


//从收藏中删除一个值
async function removeFavorite(index: number) {
  const history = await dbManager.get('favorites')
  const arrx: tvDrama[] = history?.inventory || []
  const itemToAdd = journalismList.value[index]
  const exists = arrx.some(item => item.name === itemToAdd.name)
  if (exists) {
    const indexToRemove = arrx.findIndex(item => item.name === itemToAdd.name)
    arrx.splice(indexToRemove, 1)
    // 更新 `journalismList` 中的收藏状态
    journalismList.value[index].favorites = false
  }
  // 更新`favorites`对象
  await dbManager.update(history.id, history)
}

//设置收藏列表（）
async function setFavoritesList() {
  const history = await dbManager.get('favorites')

  FavoritesList.value = history?.inventory || []
}

const isFavorites = (name: string) => {
  return FavoritesList.value.some(item => item.name === name)
}
</script>

<template>
  <div class="tvDramaCanvas">

    <div
      ref="NeworldscroE"
      class="NeworldscroE tvDr"
      :style="
        myPropHeight+' display: flex;\n'+
'        flex-direction: row;\n'+
'        flex-wrap: wrap;\n'+
'        justify-content: flex-start;\n'+
'        align-items: center;\n'+
'        margin: 0 10px;'

      "
    >

      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <n-skeleton style=" margin: 5px;margin-bottom: 10px; cursor: pointer; padding: 10px; flex: 1 1 auto;"
                  v-if="journalismList.length <= 0" :width="209" :height="280"
                  :sharp="false" size="medium" />
      <div
        :class=" skin =='lightTheme' ? 'homeCardDeepX' :'homeCardDeep'"
        v-for="(item, index) in journalismList"
        :key="index"
      >

        <div class="homeTitleCarImg" style="position: relative">
          <!-- <img class="homeTitleCarImgI" :src="item.img" /> -->
          <img class="homeTitleCarImgI" :src="item.moviesUrl" />
          <div style="position: absolute; z-index: 3; top: 5px; left: 8px">
            <div style="background-color: #2080f0;color: #FFFFFF;border-radius:4px 0 8px 0;padding:2px 8px;">
              {{ item.prompt }}
            </div>

          </div>
          <div style="position: absolute; z-index: 3; bottom: 5px; right: 8px">
            <div
              style="background-color: #2080f0;color: #FFFFFF;border-radius:4px 0 8px 0;padding:2px 8px;font-size: 11px;">
              {{ item.prompt2 }}
            </div>

          </div>
          <div style="position: absolute; z-index: 3; top: 5px; right: 8px">
            <div v-if="isFavorites(item.name??'') || item.favorites">
              <!--              收藏-->
              <n-button text style="font-size: 24px" @click="removeFavorite(index)">

                <svg t="1724123586058" class="icon" viewBox="0 0 1025 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4722" width="24" height="24">
                  <path
                    d="M1024.049737 393.508571a36.571429 36.571429 0 0 0-29.257143-24.868571l-311.588571-44.617143L544.232594 42.422857a37.302857 37.302857 0 0 0-64.365714 0l-138.971429 281.6L30.769737 365.714286a36.571429 36.571429 0 0 0-29.257143 24.868571 36.571429 36.571429 0 0 0 9.508572 36.571429l224.548571 219.428571-53.394286 311.588572a36.571429 36.571429 0 0 0 14.628572 35.108571 35.108571 35.108571 0 0 0 21.211428 6.582857 33.645714 33.645714 0 0 0 16.091429-4.388571l277.942857-146.285715 277.942857 146.285715a34.377143 34.377143 0 0 0 37.302857 0 36.571429 36.571429 0 0 0 14.628572-35.108572l-53.394286-309.394285 224.548572-219.428572a36.571429 36.571429 0 0 0 10.971428-38.034286z"
                    fill="#be9bf4" p-id="4723" data-spm-anchor-id="a313x.search_index.0.i10.662f3a81RygkFl"
                    class="selected"></path>
                </svg>

              </n-button>
            </div>
            <div v-else>
              <!--  未收藏-->
              <n-button text style="font-size: 24px" @click="setFavorite(index)">

                <svg t="1724123613409" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4974" width="24" height="24">
                  <path
                    d="M324.57 903.539c-21.306 0-42.516-6.729-60.642-19.809-32.045-23.264-47.744-61.947-41.11-101.004l22.423-130.623c2.619-15.324-2.427-30.926-13.545-41.762l-94.932-92.506c-28.404-27.654-38.4-68.204-26.161-105.855 12.241-37.658 44.195-64.566 83.344-70.265l131.183-19.061a47.304 47.304 0 0 0 35.6-25.79l58.675-118.848c17.564-35.507 52.977-57.557 92.595-57.557 39.614 0 75.122 22.05 92.591 57.557l58.681 118.848c3.083 6.259 7.381 11.68 12.893 15.978 6.542 5.231 14.389 8.595 22.705 9.813l131.184 18.965c39.148 5.698 71.102 32.61 83.343 70.265 12.24 37.656 2.24 78.204-26.165 105.86l-94.926 92.501c-11.118 10.84-16.164 26.443-13.55 41.768l22.423 130.621c6.729 39.053-9.06 77.736-41.11 101.004-32.045 23.262-73.722 26.256-108.759 7.848l-117.35-61.668a47.373 47.373 0 0 0-43.916 0l-117.355 61.668c-15.138 8.128-31.677 12.052-48.119 12.052z m187.521-727.204c-18.403 0-34.193 9.809-42.323 26.347l-58.679 118.852c-15.042 30.457-44.099 51.575-77.737 56.526l-131.183 19.062c-18.222 2.618-32.419 14.671-38.122 32.14-5.699 17.474-1.214 35.601 11.962 48.401l94.927 92.5c24.39 23.732 35.412 57.932 29.713 91.381l-22.423 130.623c-3.084 18.125 3.923 35.412 18.778 46.156 14.859 10.838 33.45 12.145 49.71 3.549l117.354-61.668c30.083-15.791 66.056-15.791 96.139 0l117.355 61.668c16.26 8.596 34.851 7.195 49.71-3.549 14.854-10.842 21.862-28.031 18.777-46.156l-22.423-130.623c-5.794-33.545 5.324-67.648 29.714-91.381l94.927-92.5c13.176-12.801 17.661-30.928 11.962-48.401-5.702-17.469-19.905-29.521-38.122-32.14L690.831 378.06c-18.126-2.615-35.221-10.087-49.61-21.488a104.823 104.823 0 0 1-28.217-35.038L554.42 202.682c-8.13-16.538-24.016-26.347-42.329-26.347z m0 0"
                    fill="#BE9BF4" p-id="4975"></path>
                </svg>

              </n-button>
            </div>
          </div>
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
                      @click="showDetails(item.moviesImgUrl,index)">
              <n-icon>
                <logoGoogle-playstore />
              </n-icon>

            </n-button>
          </div>
        </div>
        <div class="homeTitleCarText">
          <div :class="skin =='lightTheme' ?'homeTitleCarTextNexTX' :'homeTitleCarTextNex'">
            <div :class="skin == 'lightTheme' ? 'homeTitleCarTextNexTupX' :'homeTitleCarTextNexTup' ">
              <div style="  display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;">{{ item.name }}
              </div>
            </div>

            <div class="homeTitleCarTextNexUnp">
              <div class="homeTitleCarTextNexUnpCard">

                <n-tag  :bordered="false" type="warning">
                  <div :class="skin == 'lightTheme' ? 'homeTitleCardTextNexUnpCardText_X' :'homeTitleCardTextNexUnpCardText'">{{ item.Preview }}万</div>
                  <template #icon>
                    <svg t="1724806808953" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="8489" width="24" height="24">
                      <path
                        d="M705.197 853.411h-384.39c-13.728 0-24.835-11.119-24.835-24.835 0-13.715 11.107-24.837 24.835-24.837h384.391c13.728 0 24.835 11.122 24.835 24.837-0.001 13.716-11.108 24.835-24.836 24.835z"
                        fill="#213847" p-id="8490"></path>
                      <path
                        d="M513.014 832.904c-13.727 0-24.835-11.119-24.835-24.834v-66.43c0-13.714 11.108-24.836 24.835-24.836 13.728 0 24.836 11.122 24.836 24.836v66.431c0 13.714-11.109 24.833-24.836 24.833z"
                        fill="#213847" p-id="8491"></path>
                      <path
                        d="M382.191 228.998h-63.737c-54.861 0-99.341 44.481-99.341 99.342v314.601c0 54.861 44.48 99.343 99.341 99.343H774.61c54.859 0 99.341-44.481 99.341-99.343V328.34c0-54.861-44.481-99.342-99.341-99.342H612.55l-228.272-0.193"
                        fill="#FC607B" p-id="8492"></path>
                      <path
                        d="M157.024 485.222c-13.727 0-24.835-11.12-24.835-24.835v-65.193c0-13.715 11.108-24.836 24.835-24.836 13.728 0 24.835 11.121 24.835 24.836v65.193c0 13.715-11.108 24.835-24.835 24.835z"
                        fill="#213847" p-id="8493"></path>
                      <path
                        d="M769.638 201.702l-447.424-0.231h-0.024c-1.103 0-2.186 0.08-3.25 0.219h-62.573c-68.467 0-124.177 55.71-124.177 124.177 0 13.715 11.108 24.835 24.835 24.835 13.728 0 24.835-11.12 24.835-24.835 0-41.086 33.421-74.506 74.506-74.506h63.738c1.102 0 2.185-0.079 3.249-0.218l446.285 0.23c41.085 0 74.507 33.421 74.507 74.506v314.552c0 41.085-33.422 74.507-74.507 74.507H256.366c-41.085 0-74.506-33.422-74.506-74.507V537.985c0-13.715-11.108-24.836-24.835-24.836s-24.835 11.121-24.835 24.836V640.43c0 68.468 55.71 124.178 124.177 124.178h513.272c68.468 0 124.177-55.71 124.177-124.178V325.878c-0.002-68.467-55.711-124.176-124.178-124.176z"
                        fill="#213847" p-id="8494"></path>
                      <path
                        d="M438.75 598.691a24.75 24.75 0 0 1-11.981-3.081 24.835 24.835 0 0 1-12.854-21.755V386.099a24.839 24.839 0 0 1 12.854-21.755c7.907-4.366 17.56-4.087 25.248 0.764l148.526 93.885a24.832 24.832 0 0 1 11.569 20.991 24.816 24.816 0 0 1-11.569 20.991l-148.526 93.873a24.835 24.835 0 0 1-13.267 3.843z m24.835-167.517v97.607l77.199-48.798-77.199-48.809z"
                        fill="#213847" p-id="8495"></path>
                    </svg>
                  </template>
                </n-tag>
              </div>
              <div class="homeTitleCarTextNexUnpCard">


                <n-tag  :bordered="false" type="success">
                  <div :class="skin == 'lightTheme' ? 'homeTitleCardTextNexUnpCardText_X' :'homeTitleCardTextNexUnpCardText'">{{ item.like }}万</div>
                  <template #icon>
                    <svg t="1724806961601" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="10401" width="15" height="15">
                      <path
                        d="M891.054194 141.084444c-72.817778-11.377778-147.911111 9.102222-200.248889 59.164445 0 0-40.96-152.462222-161.564445-200.248889-91.022222 31.857778-159.288889 106.951111-182.044444 200.248889 0 0-38.684444-79.644444-200.248889-59.164445 0 0-200.248889 532.48 341.333333 639.431112V1024h40.96V780.515556c97.848889-13.653333 521.102222-102.4 361.813334-639.431112z"
                        fill="#02DDBF" p-id="10402"></path>
                      <path
                        d="M954.769749 780.515556c-227.555556-15.928889-391.395556 141.084444-400.497777 147.911111-9.102222 9.102222-9.102222 22.755556 0 31.857777 4.551111 4.551111 11.377778 6.826667 15.928888 6.826667 6.826667 0 11.377778-2.275556 15.928889-6.826667 2.275556-2.275556 157.013333-147.911111 364.088889-134.257777 11.377778 0 22.755556-9.102222 25.031111-20.48s-6.826667-25.031111-20.48-25.031111zM67.303083 800.995556c-13.653333 0-22.755556 11.377778-20.48 25.031111 0 13.653333 11.377778 22.755556 25.031111 20.48 207.075556-15.928889 361.813333 141.084444 364.088889 141.084444 4.551111 4.551111 11.377778 6.826667 15.928889 6.826667 6.826667 0 11.377778-2.275556 15.928888-6.826667 9.102222-9.102222 9.102222-22.755556 0-31.857778-6.826667-4.551111-172.942222-170.666667-400.497777-154.737777z"
                        fill="#02DDBF" p-id="10403"></path>
                    </svg>
                  </template>
                </n-tag>
              </div>
              <div class="homeTitleCarTextNexUnpCard">

                <n-tag  :bordered="false" type="info">
                  <div :class="skin == 'lightTheme' ? 'homeTitleCardTextNexUnpCardText_X' :'homeTitleCardTextNexUnpCardText'">{{ item.comment }}</div>
                  <template #icon>
                    <svg t="1724807253717" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="11678" width="22" height="22">
                      <path
                        d="M520.533333 866.133333c-17.066667 0-29.866667-4.266667-38.4-17.066666l-38.4-38.4H166.4c-38.4 0-68.266667-29.866667-68.266667-68.266667V243.2c0-38.4 29.866667-68.266667 68.266667-68.266667h712.533333c38.4 0 68.266667 29.866667 68.266667 68.266667v494.933333c0 38.4-29.866667 68.266667-68.266667 68.266667h-277.333333l-38.4 38.4c-12.8 17.066667-25.6 21.333333-42.666667 21.333333zM166.4 234.666667c-4.266667 0-12.8 4.266667-12.8 12.8v494.933333c0 4.266667 4.266667 12.8 12.8 12.8H469.333333l55.466667 55.466667 51.2-55.466667h302.933333c4.266667 0 12.8-4.266667 12.8-12.8V243.2c0-4.266667-4.266667-12.8-12.8-12.8H166.4z"
                        fill="#6A3906" p-id="11679"></path>
                      <path
                        d="M797.866667 682.666667h-554.666667c-21.333333 0-34.133333-17.066667-34.133333-34.133334V337.066667c0-21.333333 17.066667-38.4 34.133333-38.4h554.666667c21.333333 0 34.133333 17.066667 34.133333 34.133333v311.466667c4.266667 21.333333-12.8 38.4-34.133333 38.4z"
                        fill="#F5CB2B" p-id="11680"></path>
                      <path
                        d="M708.266667 443.733333H337.066667c-17.066667 0-29.866667-12.8-29.866667-29.866666 0-17.066667 12.8-29.866667 29.866667-29.866667h371.2c17.066667 0 29.866667 12.8 29.866666 29.866667 0 17.066667-12.8 29.866667-29.866666 29.866666zM512 622.933333H337.066667c-17.066667 0-29.866667-12.8-29.866667-29.866666 0-17.066667 12.8-29.866667 29.866667-29.866667H512c17.066667 0 29.866667 12.8 29.866667 29.866667 0 17.066667-12.8 29.866667-29.866667 29.866666z"
                        fill="#6A3906" p-id="11681"></path>
                    </svg>
                  </template>
                </n-tag>
              </div>
            </div>

          </div>
        </div>
        <div v-show="item.download">
          <n-progress
            type="line"
            :percentage="item.Progress"
            :height="5"
            :border-radius="4"
            :fill-border-radius="0"
            :show-indicator="false"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@media (max-height: 716px) {
  .tvDr {
    height: 95% !important;
  }
}
.tvDr {

}
.n-tag {
  border-radius: 5px !important;
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

.tvDramaCanvas {
  width: 100%;
  height: 100%;
}

.element {
  transition: transform 0.3s,
  box-shadow 0.3s;
}

.element:hover {
  transform: translateY(-10px) scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  /* animation: sparkle 0.5s infinite; */
}

@keyframes sparkle {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
}

.moviesTemplateMinTitle-right {
  float: right;
  /* width: 50%; */
}

.TextSerengThen {
  padding-left: 5px;
}

.homeTitleCardTextNexUnpCardImgGuidBum {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.homeTitleCardTextNexUnpCardText {
  float: left;
  font-size: 10px;
  color: rgb(221, 214, 214);
}
.homeTitleCardTextNexUnpCardText_X {
  float: left;
  font-size: 10px;
  color: rgb(43 40 40);
}

.homeTitleCardTextNexUnpCardImgGuid {
  width: 30%;
  height: 70%;
  border-radius: 50%;
  background-color: #2f2e2e;
  float: left;
  margin-right: 3px;
  margin-left: 3px;
}

.homeTitleCardTextNexUnpCardImgGuidX {
  width: 30%;
  height: 70%;
  border-radius: 50%;
  background-color: #FFFFFF;
  float: left;
  margin-right: 3px;
  margin-left: 3px;
}

.homeTitleCarTextNexUnpCard {
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}

.homeTitleCarTextNexUnp {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-evenly;
}

.homeTitleCarTextNexKup {
  font-size: 12px;
  color: rgb(221, 214, 214);
  letter-spacing: 0;
  line-height: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;

}

.homeTitleCarTextNexTup {
  font-size: 14px;
  width: 100%;
  padding: 5px;
  padding-left: 10px;
}

.homeTitleCarTextNexTupX {
  font-size: 14px;
  width: 100%;
  padding: 5px;
  color: #1c1c1c;
  padding-left: 10px;
}

.homeTitleCarTextNex {
  width: 100%;
  height: 100%;
  background-color: #333131;
  border-radius: 5px;
}

.homeTitleCarTextNexTX {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
}

.homeTitleCarText {
  padding-top: 5%;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 3%;
  width: 100%;
  height: 40%;
  border-radius: 3.5px;
}

.homeTitleCarImgI {
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
  object-position: top;
}

.homeTitleCarImg {
  width: 100%;
  height: 60%;
}

.homeCard {
  width: 180px;
  height: 280px;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  flex: 1 0 auto;
  padding: 10px;
  transition: transform 0.3s,
  box-shadow 0.3s !important;
}

.homeCard:hover {
  /* box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15); */

  /* transition-delay: 0s !important; */
  /* border: 1px solid #78a4fa; */

  /* transform: translateY(-10px)  !important; */
  box-shadow: 0 0 10px rgba(163, 161, 161, 0.8);
  /* animation: sparkle 0.5s infinite; */
}

/* 定义动画 */
@keyframes hoverEffect {
  0% {
    transform: translateY(-2.5px) scale(1); /* 开始状态 */
  }
  30% {
    transform: translateY(-2.5px) scale(0.97); /* 缩小 */
  }
  100% {
    transform: translateY(-2.5px) scale(1); /* 放大 */
  }
}

.homeCardDeep:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: hoverEffect 0.95s ease-in-out forwards; /* 只在鼠标悬停时播放动画 */

}


.homeCardDeep {
  width: 209px;
  height: 280px;

  background-color: rgb(39, 39, 39);
  border: 1px solid rgb(28, 28, 28);
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  flex: 1 1 auto;
  padding: 10px;

  transition: box-shadow 0.3s !important;
}

.homeCardDeepX:hover {
  box-shadow: 0 0 10px rgba(66, 64, 64, 0.3);
  animation: hoverEffect 0.95s ease-in-out forwards; /* 只在鼠标悬停时播放动画 */

}


.homeCardDeepX {
  width: 209px;
  height: 280px;
  background-color: #f4f5f5;
  border: 1px solid #fafafc;
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  flex: 1 1 auto;
  padding: 10px;

  transition: box-shadow 0.3s !important;
}


.homeCardDeepX:hover .play_video {
  display: block;
}

.play_video {
  display: none;
}

.homeCardDeep:hover .play_video {
  display: block;
}

@keyframes sparkle {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
}
</style>
