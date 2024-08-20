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
      class="NeworldscroE"
      style="
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 0 10px;
        height: 95%;
      "
    >
      <n-space>
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
        <n-skeleton v-if="journalismList.length <= 0" :width="209" :height="280" :sharp="false" size="medium" />
      </n-space>
      <div
        class="animate__animated animate__flipInX homeCardDeep"
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
            <n-button text style="font-size: 24px" @click="showDetails(item.moviesImgUrl,index)">
              <n-icon>
                <logoGoogle-playstore />
              </n-icon>
            </n-button>
          </div>
        </div>
        <div class="homeTitleCarText">
          <div class="homeTitleCarTextNex">
            <div class="homeTitleCarTextNexTup">
              <div style="  display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;">{{ item.name }}
              </div>
            </div>
            <div class="homeTitleCarTextNexKup">
              <span>
                {{ item.NexT }}
              </span>
            </div>
            <div class="homeTitleCarTextNexUnp">
              <div class="homeTitleCarTextNexUnpCard">
                <div class="homeTitleCardTextNexUnpCardImgGuid">
                  <img
                    class="homeTitleCardTextNexUnpCardImgGuidBum"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABEVJREFUWAntVn1oW1UUP+e+pEu3VWETmTpY2fxnCDr9Q1AE7T8KEVeWZMHlC6ttk8EcKgwUtK5TUfGLodimqyhtU2ZIIt1QUWRTFEEsc4jDCY51Q3QIDrau9sPcez0n3Q15r++9tv5rLyT3nvP7nY933rknAVhZ//cK4HIK8N7YWMvcpWoUQT8EqDeDxlbayQdOgIYzGvBoi2iupFLhy0v1u6QE3i9+vGF2ZvqARp2iQM2+zhGmKaeRVaHmno74gxd8uQT6JqC1FvmR0j4N8CwFXruYMxuOcIWcv5hNxV5DRGXDGgTPBK4+9agG3dbAX/YRAY9TNRJe1XBNYKDw0TYpq59StA1eEckxvXP4lXFycjMlusWLS/oLwSCGO3fFfnByFiQwMFq5V0p5hEp+jZPMMj+RCMDj3YnYqUZ8YLR0i6rC254VQ7hsWdb27kTkq0Y7WwL50co9SsrP3RoNESSgeDKbjLxD75QefuGinsF8obIHtHpLa7AWMKhBhWXdn01EvjFYPQEuu1LVL8nwWgPad3xldyb2DOv6hyu3AcjnKdE75zn4nRWA3q5E7EeW+4ZKLwPop+cx+zc9yCUhAvd1J3ecZETwFzecUvKoV3Aq+6lN163ez9yBocrDoOX3xN1BZbhp/qMjsqrHaxhxalzEn5jvXByDY3FMxkR+fDw4O/N3hcq30Uk2Mg2Y18Ph8OyhkfJGiTJPQYMGMzvrFMp+5jCXhtQbBnPuHItjcmyhfj63n4zvcpIaZRFqOsayUjri1ZyMzz8dcWgZGz67LY6pT5/tFdQwj7oRbLrNN/zBMk0Tevf+q865auPH1go6uAd+8SMxFjp/vnYlqWN/W4xrOMbGj0+9dUIEAriXLve0H3F2Wt/OuIX6Cz9eI8fYePH5NljQtEfw1UEUHV5E1iulHuG9K73zaxT4AZ/dFmPMYczYuPEYBoGJrsz2s7VrmEtFPxQIPR5kbq5kf6EUZnxd09asAHwJEKt1Pp1ZxxjrmMs2ddxxoEG2L5eMfcLq+iBioW+kdBCU3svnBQvh96AQd3cmo+cY4/8GckrewWdrjXXisfb2ST4PFsqb/lHqW7otN7LsXFTtV3PpaH1I2RKojdLh8rs0z3NOQ5apaSYp+6ey6eigG54fLneSjzfJvsUNJ9uDuXTsiUbMloAB+obLB+h6Pmdk504NdJLu8ZglxBnGpFJbyFE7lX2bk2tkfsXZ9M4XjGx21wQYpHmfoST66GlWG/J/2SnZKfpdyu5ORwpu9p4JMPnQ4crW6pw6TDPuVjfjxXRcKbRwVzYRO+3F9U2AjYpFbV2cK3dReXvpOlzv5cimR/yTOqZn/arIYDyO0oY5hEUTMPxi8fjav2YuxuivQIoarY30tStscNppCuMx+hTWh9aV4vG2Kw2Y53HJCTR6GBr6bM1MYLJVS2xlPVp6IlRtmchkHphieWWtVGA5FfgXAfWiKTPtugcAAAAASUVORK5CYII="
                  />
                </div>
                <div class="homeTitleCardTextNexUnpCardText">{{ item.Preview }}万</div>
              </div>
              <div class="homeTitleCarTextNexUnpCard">
                <div class="homeTitleCardTextNexUnpCardImgGuid">
                  <img
                    class="homeTitleCardTextNexUnpCardImgGuidBum"
                    src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAldJREFUWAntV01oE0EUft+YtBgrlPbgTbx4sCKCZy/2ZpESRFeQELBF6sWLXjwoInjyJl4ShFZjVAihDRHFHjRXiyeRij2oh3rRUhGNQW2yz7fbZtlsdtmsbh0Q97Az782b733zzZv9IdJ84U/yMzPyxfJ5YjrLhG0AVQaQOpfJjH3pFTfRa6BfXK44e0WSX1ofY2KmyToaW8Q+5Rfv51N+zl58+TvlNIgvemNFlROWMl5/kP1bBHLFyoistuCbiGnrdLU6EJTQ649MYGZubpC4WRHBt3vB2vbE+Pi3dj+sjURAVqy+11v3pN0dBAxCA4AZNO71RyrC/N3yVSm6w16QDhv8tcMOMbqKJV+s7GNujsqxGrbmKuaHU9ljCzcLs6NNaj0JwSNR4DMDN4LiIPIR1JsU0+Ns9uhHR4FarZZ4vbx62zTXTq5PZrthpVaks8DK3EU9CCu1ITXCG0ezm4aNyi1qgD7k7pePODWwtPzpAhFvJO+eGLdHdNhBa3TNISDJJ+NOEooHPuAQEOl2hk6IOUC2Y8UhINjufsyp/OHkuM7/9aRuKgr0QB8BUH0wuaemjwBh3jD2/tRGwJLf2g5dBMxkX+qRPgLAswljzHrC6lFAPmSqVnLr0rMFSNr7r4cA8PZMJv3KXr4OBeR17MjfoYA8Ft+3WW1mC5WcduO7a6DkHtiMvvw3FKYy6ZdubIfAUP/wZQKeuwfj6ou6DIVbQ/0jp72YzheRYRyql0qLB1d/LB0HmfslsM8OBr2wWjZpUYCu275ot3dA4ql35dEg/kf/ywr8Aonws4baE7rQAAAAAElFTkSuQmCC
   "
                  />
                </div>
                <div class="homeTitleCardTextNexUnpCardText">{{ item.like }}万</div>
              </div>
              <div class="homeTitleCarTextNexUnpCard">
                <div class="homeTitleCardTextNexUnpCardImgGuid">
                  <img
                    class="homeTitleCardTextNexUnpCardImgGuidBum"
                    src="  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAbNJREFUWAljYBjpgBE5AGYvWSvz9///LqCYw////yWR5ShmMzI8Y/jPeICBg70sM8z3Kcw8uAPAlv/7d/E/A4MQTJIWNCMjwxtWFjb95Ej/ZyDzmWCWgHxOa8tBdv3/zyDy+8/vTpi9cAcABRxggnSg4XbBHUD1OMfjC6BdUjBpuANgAvSmRx0w4CHAgivOgQXEcQYmpj5keWDiKQbmIwsGRsZjjIyM/chyQPESoLw5XjkUDRAOTgcApZ9kxASvQdYzY/HqcGBZwQB0HIbc9MVrIoBS5oz/GR5nxKLpW7QmEtkcZPaAR8HgdgAwThlRMDCCYcGHIg5UBxMHxg+qHmQ5uCIEA65x+qLVoOilF/iXGRfKDLJscEcBPYJjNATgIQBM31/pEeTodsAd8J+B8Ry6JD34cAcwMjA108NCdDvgDsiIDdrNzMwUB4yKj+iKaMmHF0QwS1atOsb57s8LA4b/f6nXLP/LYAss5QpgdgBpeEGEURuGhVl9Byo4jqSYGsx10xev/czw/18tumHwKECXoDY/Mza4joERM53RzQEgD+FyBLU9S9C8mYvX1hNUNGIUAACd/5qYm/6utwAAAABJRU5ErkJggg==
            "
                  />
                </div>

                <div class="homeTitleCardTextNexUnpCardText">
                  {{ item.comment }}
                </div>
              </div>
            </div>
            <div
              class="homeTitleCarTextNexUnp"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; /* 显示的行数 */
                -webkit-box-orient: vertical;
                white-space: normal;
                color: rgb(148, 142, 142);
                font-size: 10px;
                padding: 1px;
              "
            >
              {{ item.moviesTab }}
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
  padding-top: 3px;
  color: rgb(221, 214, 214);
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

.homeTitleCarTextNexUnpCard {
  height: 100%;
  width: 33%;
  float: left;
  padding-left: 5px;
}

.homeTitleCarTextNexUnp {
  width: 100%;
  height: 30%;
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
}

.homeTitleCarTextNex {
  width: 100%;
  height: 100%;
  background-color: #333131;
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

.homeCardDeep {
  width: 209px;
  height: 280px;
  background-color: rgb(39, 39, 39);
  border: 1px solid rgb(28, 28, 28);
  border-radius: 5px;
  margin: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  /* flex: 0 0 200px; */
  flex: 1 1 auto;
  padding: 10px;

  transition: transform 0.3s,
  box-shadow 0.3s !important;
}

.homeCardDeep:hover {
  /* box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15); */

  /* transition-delay: 0s !important; */
  /* border: 1px solid #78a4fa; */

  /* transform: translateY(-10px)  !important; */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  /* animation: sparkle 0.5s infinite; */
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
