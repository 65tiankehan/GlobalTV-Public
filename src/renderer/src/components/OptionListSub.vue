<script setup lang="ts">


import { sites, OptionSelects } from '../OptionSelectsSub' // 美剧
import { AMERICANMOVIES } from '../AmericanMovies'// 美国电影
import { DOMESTICDRAMA } from '../DomesticDrama'//国产剧
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

const store = useStore()

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

const combinedLists: OptionSelects[][] = [sites, AMERICANMOVIES, DOMESTICDRAMA]


// 使用Map来存储每个key对应的所有对象
const groupedByKey = new Map<string, OptionSelects[]>()

let sitesPro: OptionSelects[] = groupedByKey.get(String(playAddress2.value)) || []


watch(playAddress2, (newVal, oldVal) => {
  console.log('playAddress2 changed from', oldVal, 'to', newVal)

  combinedLists.forEach((array, index) => {

    // 只检查数组的第一个元素的key
    const firstKey = array[0].key


    // 检查Map中是否已经有这个key的数组
    let group = groupedByKey.get(String(newVal))

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


})


//改变选项卡目录
const mountedOptionLists = (value: string, setbreadcrumb: string[], page: number, total: number, PaginationUrl: string) => {
  setplayVideoType(value)
  setbreadcrumbs(setbreadcrumb)
  setpage(page)
  settotal(total)
  setPaginationUrl(PaginationUrl)
}
</script>

<template>
  <div class="optionList">
    <div class="div2_Layout">
      <div class="accountPmc_Card accountPmc_Card_row animate__animated animate__backInRight">
        <div
          @click="mountedOptionLists(playVideoType,breadcrumbs,page,total,PaginationUrl)"
          :class=" -1 == playAddress2
            ? 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_d'
            : 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height '
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
            <p style="color: #c4c4c4">子级选项</p>
          </div>
        </div>
      </div>

      <div v-show="-1 != playAddress2" class="NeworldscroE" style="width: 100%; height: 94%">

        <div
          v-for="(item, index) in sitesPro"
          :key="index"
          class="accountPmc_Card accountPmc_Card_row animate__animated animate__backInRight"
        >
          <div
            @click="mountedOptionLists(item.url,item.breadcrumb,item.Pagination.page,item.Pagination.total,item.PaginationUrl)"
            :class="
              index == playAddress2
                ? 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height accountPmc_Card_P_d'
                : 'accountPmc_Card_P accountPmc_Card_P_Hideout setup_button_height '
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
          <n-card title="🙌静谧时光里的自我关怀" embedded :bordered="false">
            在这个快节奏的世界里，别忘了给自己一些温柔的时刻。就像一杯慢慢泡开的茶，生活的美好往往需要时间来沉淀。无论今天你经历了什么，请记得停下来，深呼吸，感受这一刻的宁静与美好。你是独一无二的，你的存在本身就是这个世界最宝贵的礼物之一。所以，请善待自己，因为你值得所有的爱与温暖。
          </n-card>
          <n-card title="😊 晨光微曦" embedded :bordered="false">
            在这繁忙的世界中，给自己一个微笑的理由。每一天都是新的开始，每一个早晨都充满了无限可能。就像初升的太阳，驱散夜的黑暗，让新的一天充满光明与希望。记住，无论昨天如何，今天是属于你的，去拥抱它吧！
          </n-card>
          <n-card title="🥬 心灵绿洲" embedded :bordered="false">
            在忙碌的生活之余，不妨给自己一片心灵的绿洲。在那里，你可以放松心情，聆听内心的声音。不要让外界的喧嚣打扰了内心的平静，因为真正的力量来自于内心的宁静与坚定。
          </n-card>
          <n-card title="📖 岁月如歌" embedded :bordered="false">
            生活就像一首歌，有高潮也有低谷。但正是这些起伏，构成了我们丰富多彩的人生。不要害怕挑战，每一次经历都是成长的机会。珍惜每一刻，因为它们都是组成你生命乐章的音符。
          </n-card>
        </n-space>
      </div>
      <div v-show="-1 == playAddress2" class="NeworldscroE" style="width: 100%; height: 100%">
        <n-space vertical>
          <n-card title="😁站稳脚跟" embedded :bordered="false">
            在这个充满竞争的世界里，只有坚韧不拔的人才能站稳脚跟。不要畏惧挑战，因为每一次跌倒都是为了更好的站起来。记住，成功往往青睐于那些不轻易放弃的人。
          </n-card>
          <n-card title="📖 年轻的力量" embedded :bordered="false">
            年轻时的努力，铸就未来的辉煌。不要害怕失败，每一次尝试都是向成功迈进的一步。坚持自己的梦想，用汗水浇灌希望的种子，终将收获属于自己的果实。
          </n-card>
          <n-card title="😊 不畏艰难" embedded :bordered="false">
            人生路上难免会有坎坷，但正是这些困难塑造了我们的性格。勇敢面对挑战，即使路途艰辛也要勇往直前。因为真正的勇士，是在逆境中依然坚持前进的人。
          </n-card>
          <n-card title="📖 无畏前行" embedded :bordered="false">
            不要被过去的错误所束缚，也不要被未来的不确定性所困扰。勇敢地迈出每一步，相信自己的能力。记住，只有不断前进，才能到达理想的彼岸。
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

.div2_Layout {
  flex: 1 0 100%;
  padding: 5px;
  background-color: #1c1c1c;
  border-top-left-radius: 5px;
  color: #eaeaea;
  /* border: 1px solid rgb(50, 50, 50); */
  height: 100%;
}
</style>
