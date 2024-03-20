<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-20 17:32:43
 * @LastEditTime: 2024-03-20 18:25:17
 * @LastEditors: KeHan
-->
<script setup lang="ts">
import {
  LogoMarkdown as LogoMarkdown,
  PlayCircleSharp as LogoGooglePlaystore
} from '@vicons/ionicons5'
interface tvDrama {
  comment?: string
  Preview?: string
  NexT?: string
  name?: string
  like?: string
  moviesTab?: string
}
const journalismList: tvDrama[] = [
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '美剧'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '美国电影'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '国产剧'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '古装'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '战争'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '青春偶像'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '喜剧'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '家庭'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '犯罪'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '动作'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '奇幻'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '剧情'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '历史'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '经典'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '乡村'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '情景'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '商战'
  },
  {
    comment: '24',
    like: '34',
    Preview: '123',
    NexT: '这是测试描述，为了测试描述的情况，剩余的字段都是废话，没什么可看',
    name: '网剧'
  }
]
</script>

<template>
  <div class="homeCardDeep" style="width: 100%; height: 200px">
    <img
      style="width: 100%; height: 100%; border-radius: 5px"
      src="https://i0.hdslb.com/bfs/space/265ecddc52d74e624dc38cf0cff13317085aedf7.png@2560w_400h_100q_1o.webp"
    />
  </div>
  <div
    class="homeCardDeep"
    style="
      width: 100%;
      height: 66px;
      background-color: rgb(39, 39, 39);
      padding: 15px;
      /* display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center; */
    "
  >
    <div style="float: left; width: 50%; height: 100%">
      <n-space justify="start" size="large">
        <n-button dashed strong secondary>
          <svg
            t="1710929265070"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9612"
            width="18"
            height="18"
          >
            <path
              d="M750.236735 909.061224H273.763265c-38.661224 0-70.530612-31.869388-70.530612-70.530612V564.244898c0-6.269388-5.22449-11.493878-10.971429-11.493878h-26.644897c-20.897959 0-38.661224-12.016327-47.020409-31.346938-7.836735-19.330612-3.657143-40.75102 10.971429-55.379592l324.440816-327.053061c15.673469-15.673469 36.04898-24.032653 57.991837-24.032653s42.318367 8.359184 57.991837 24.032653l324.440816 327.053061c14.628571 14.628571 18.808163 36.571429 10.971429 55.379592-7.836735 19.330612-26.122449 31.346939-47.020409 31.346938h-26.644897c-6.269388 0-10.971429 5.22449-10.971429 11.493878v274.285714c0 38.661224-31.869388 70.530612-70.530612 70.530612z"
              fill="#16C4AF"
              p-id="9613"
            ></path>
            <path
              d="M656.195918 909.061224H367.804082v-208.457142c0-43.885714 35.526531-79.412245 79.412245-79.412245h129.044897c43.885714 0 79.412245 35.526531 79.412245 79.412245V909.061224z"
              fill="#0B9682"
              p-id="9614"
            ></path>
          </svg>
          <span>主页 </span>
        </n-button>
        <n-button dashed strong secondary>
          <svg
            t="1710929336464"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10721"
            width="18"
            height="18"
          >
            <path
              d="M480.7 438c64.1 21.4 142.8-22 168.6-92.1l60.1-163.2c25.8-70.1-26.9-103.8-93.8-70.6l-19.9 23c-66.8 33.2-138.4 106-159 161.9-20.5 55.7-32.2 101.4 23.7 121.9l20.3 19.1zM430.3 557.1c31.5-63.1-17.8-156.4-87.9-182.2l-163.2-60.1c-70.1-25.8-101.9 32.8-68.7 99.6l21.1 14c33.2 66.8 106 138.4 161.9 159 55.8 20.5 102.3 36.4 122.9-19.5l13.9-10.8zM912.7 622.6L887.1 602c-33.2-66.8-106-138.4-161.8-159-55.8-20.5-115.9-19.5-138.5 35.6-27.9 68 19.6 151.2 89.6 177l163.2 60.1c70.1 25.8 108.4-16.9 75.1-83.8l-2-9.3zM548.7 591.6C489.4 566 399.6 608 373.8 678l-60.1 163.2c-25.8 70.1 26.2 104.4 93 71.2l20.6-23.5c66.8-33.2 138.4-106 159-161.9 20.5-55.8 28.1-104-27.8-124.5l-9.8-10.9z"
              fill="#2280BF"
              p-id="10722"
            ></path>
            <path
              d="M474.2 435.9c55.8 20.5 122.6-19.9 148.4-90l60.1-163.2c25.8-70.1-7.8-100.2-74.6-67l-39 19.5c-66.8 33.2-138.4 106-159 161.9-20.6 55.7 8.2 118.3 64.1 138.8zM432.4 551.8c20.5-55.8-19.9-122.6-90-148.4l-163.2-60.1c-70.1-25.8-100.2 7.8-67 74.6l19.4 39c33.2 66.8 106 138.4 161.9 159 55.8 20.6 118.4-8.2 138.9-64.1zM907.4 611L888 572c-33.2-66.8-106-138.4-161.8-159-55.8-20.5-118.3 8.3-138.9 64.1-20.5 55.8 19.9 122.6 90 148.4l163.2 60.1c70.1 25.8 100.2-7.8 66.9-74.6zM544.9 590.1c-55.8-20.5-122.6 19.9-148.4 90l-60.1 163.2c-25.8 70.1 7.8 100.2 74.6 67l39-19.4c66.8-33.2 138.4-106 159-161.9 20.6-55.8-8.2-118.3-64.1-138.9z"
              fill="#4EB3FF"
              p-id="10723"
            ></path>
          </svg>

          <span>动态 </span>
        </n-button>
        <n-button dashed strong secondary>
          <svg
            t="1710929381537"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11786"
            width="18"
            height="18"
          >
            <path
              d="M886.417765 49.656981L82.836669 43.491205l47.220822-37.596197A25.866183 25.866183 0 0 1 146.299048 0.030002H936.571091a8.271163 8.271163 0 0 1 5.413852 15.038478z"
              fill="#E57FC0"
              p-id="11787"
            ></path>
            <path
              d="M934.240127 937.378364l-60.153914 75.192392L870.627363 52.664676l60.98103-50.754864a8.271163 8.271163 0 0 1 13.459438 6.466545l-4.73712 909.827947a33.460615 33.460615 0 0 1-6.090584 19.17406z"
              fill="#D672AD"
              p-id="11788"
            ></path>
            <path
              d="M64.339341 36.573504m37.596196 0l745.306992 0q37.596196 0 37.596196 37.596197l0 912.234103q0 37.596196-37.596196 37.596196l-745.306992 0q-37.596196 0-37.596196-37.596196l0-912.234103q0-37.596196 37.596196-37.596197Z"
              fill="#EA8EBC"
              p-id="11789"
            ></path>
            <path
              d="M415.863774 488.329397h-27.219646l27.219646-34.738885V406.06892h-22.557717v-20.903485h22.557717v-12.857899h26.918877v12.857899h23.384834V406.06892h-23.384834v18.046174h29.024263l-29.024263 37.596196v41.280624a21.354639 21.354639 0 0 1-1.87981 9.023087 24.21195 24.21195 0 0 1-5.03789 7.519239 23.535219 23.535219 0 0 1-7.519239 4.962698 22.557718 22.557718 0 0 1-8.872703 1.804617h-21.730601l7.970394-18.121366h3.609234a5.940199 5.940199 0 0 0 4.586736-2.030195 6.466546 6.466546 0 0 0 1.955002-4.73712z m51.356404 17.519828l16.843096-6.767316q8.045586-3.15808 15.038479-6.767315a172.942502 172.942502 0 0 1-15.489633-13.008284 96.095877 96.095877 0 0 1-12.933092-15.564825h26.542915a140.309004 140.309004 0 0 0 10.978089 9.549434c3.609235 2.857311 7.519239 5.489045 11.128474 7.895201a141.060928 141.060928 0 0 0 14.211362-10.226165 127.225528 127.225528 0 0 0 13.609823-12.933092h-79.703935V439.905497h104.818194v18.121366a99.404343 99.404343 0 0 1-14.286554 18.948483 133.842458 133.842458 0 0 1-17.895789 15.038479c5.03789 2.406157 10.150973 4.737121 15.038478 6.842507s10.902897 4.436351 16.767904 6.692123V526.376748c-8.722318-2.782119-17.519827-5.940199-26.39253-9.323857a232.494877 232.494877 0 0 1-26.016568-11.95559 238.88623 238.88623 0 0 1-26.016568 11.95559c-8.947895 3.383658-17.820597 6.541738-26.618107 9.323857z m0.375962-70.530464l6.541739-13.685016v-48.047938H560.60913v39.400813a6.466546 6.466546 0 0 0 6.692123 6.692123h4.661928l-7.519239 15.640018h-5.413853a23.084064 23.084064 0 0 1-9.098279-1.804618 23.535219 23.535219 0 0 1-7.519239-4.962698 22.557718 22.557718 0 0 1-6.692123-16.241556V391.030442h-36.543503v30.076957L492.935977 435.318761zM407.442227 610.216265V592.546053l-19.7756 1.052694v-18.121367l64.214303-3.15808v18.121366l-19.098867 0.827116v18.948483h19.324445v18.121367H432.782063v95.193568h-25.339836V628.337632H387.666627v-18.121367z m-19.399638 113.314935l3.609235-88.050291h15.038479L402.705106 723.5312z m64.815843 0h-15.038479l-3.609235-88.050291h15.038479zM544.292381 646.684575h28.798686v54.514485a20.7531 20.7531 0 0 1-1.87981 8.947895 24.061566 24.061566 0 0 1-5.03789 7.519239 24.738297 24.738297 0 0 1-7.51924 4.887505 23.911181 23.911181 0 0 1-8.872702 1.729425H530.532173l5.263467-14.286554h2.255772a6.090584 6.090584 0 0 0 4.586736-1.87981 6.541738 6.541738 0 0 0 1.955002-4.887506v-42.032547H485.416737v62.484878h-29.174648V646.684575z m25.866182-49.702171H459.174592v-14.737709h37.596197L492.935977 572.093722h33.836576l4.887506 10.150973h38.498504zM463.610944 605.629529V601.56914h102.111268v17.29425a21.880986 21.880986 0 0 1-1.804617 8.947895 22.557718 22.557718 0 0 1-4.887506 7.519239 22.557718 22.557718 0 0 1-7.519239 4.887506 22.557718 22.557718 0 0 1-8.872702 1.804617H463.610944v-36.393118z m46.092936 103.314347h-21.05387v-39.325621h52.033136v18.271751a20.828293 20.828293 0 0 1-21.05387 21.05387zM537.073911 616.607619h-45.115436v10.752512H530.532173a6.165776 6.165776 0 0 0 4.586736-1.87981 6.541738 6.541738 0 0 0 1.879809-4.887506z m-27.370031 67.673153v9.850203a8.571933 8.571933 0 0 0 3.082888-0.601539 18.346944 18.346944 0 0 0 3.233273-1.503848 9.624626 9.624626 0 0 0 2.556541-1.955002 3.684427 3.684427 0 0 0 1.052694-2.406157V684.280772zM434.135526 770.601638l-2.932503 5.940199h47.596784v14.286555h-16.617519l9.248664 15.038478h-27.144453l-9.323857-15.038478h-10.902897l-6.992892 14.361746h-29.024264l17.068673-34.5885z m-46.092937 49.927748h31.580805v-7.970393h26.768492v7.970393H477.897498v17.294251h-31.505612v84.365864h-26.768492v-84.365864h-31.580805z m0 101.660115l6.767316-77.222587h20.828292l-6.767315 77.222587z m89.478947 0h-20.602715l-6.767316-77.222587h20.828293z m94.967992-131.361109h-16.617519l9.248664 15.038478H538.051412l-9.323857-15.038478H517.749466l-6.992892 14.361746h-29.024264l17.068673-34.5885h29.024264l-2.932504 5.940199h47.596785z m-26.542915 29.24984h26.918877v82.711632a19.775599 19.775599 0 0 1-1.428656 7.519239 19.399637 19.399637 0 0 1-3.985197 6.165776 18.87329 18.87329 0 0 1-6.015391 4.210774 16.391942 16.391942 0 0 1-7.519239 1.57904h-71.132003v-102.186461h63.161609z m0 18.121367h-36.242733v9.925395h36.242733z m0 28.046762h-36.242733v10.075781h36.242733z m0 28.197147h-36.242733v9.925396h33.31023q2.932503 0 2.932503-3.383658z"
              fill="#E1F9FF"
              p-id="11790"
            ></path>
            <path
              d="M148.329243 150.414786a32.859075 32.859075 0 0 0 32.859075 32.859076h47.4464l-69.628156-56.920641a32.558306 32.558306 0 0 0-10.677319 24.061565z"
              fill="#C6589A"
              p-id="11791"
            ></path>
            <path
              d="M767.989748 117.85648h-586.50066a32.633498 32.633498 0 0 0-22.181756 8.79751l69.628155 56.920641h539.054261a32.859075 32.859075 0 1 0 0-65.718151z"
              fill="#AF357E"
              p-id="11792"
            ></path>
            <path
              d="M64.339341 261.097988h820.499384v26.467722H64.339341z"
              fill="#CC609B"
              p-id="11793"
            ></path>
            <path
              d="M764.230128 570.43949m-62.184108 0a62.184108 62.184108 0 1 0 124.368216 0 62.184108 62.184108 0 1 0-124.368216 0Z"
              fill="#FCE8FA"
              p-id="11794"
            ></path>
            <path
              d="M764.230128 570.43949m-51.807558 0a51.807558 51.807558 0 1 0 103.615116 0 51.807558 51.807558 0 1 0-103.615116 0Z"
              fill="#CCC2CA"
              p-id="11795"
            ></path>
            <path
              d="M753.92877 539.385032m10.37655 0l0 0q10.37655 0 10.376551 10.37655l0 41.431008q0 10.37655-10.376551 10.37655l0 0q-10.37655 0-10.37655-10.37655l0-41.431008q0-10.37655 10.37655-10.37655Z"
              fill="#393A3A"
              p-id="11796"
            ></path>
          </svg>

          <span>投稿 </span>
        </n-button>
        <n-button dashed strong secondary>
          <svg
            t="1710929417985"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13100"
            width="24"
            height="24"
          >
            <path
              d="M302.933333 746.666667c-4.266667 0-4.266667 0 0 0-76.8-12.8-132.266667-76.8-132.266666-153.6v-256c0-85.333333 68.266667-153.6 153.6-153.6h251.733333c72.533333 0 136.533333 51.2 149.333333 119.466666 4.266667 8.533333-4.266667 21.333333-12.8 21.333334-8.533333 4.266667-21.333333-4.266667-21.333333-12.8-12.8-51.2-59.733333-93.866667-115.2-93.866667h-256C256 221.866667 204.8 273.066667 204.8 337.066667v256c0 55.466667 42.666667 106.666667 98.133333 115.2 8.533333 0 17.066667 12.8 17.066667 21.333333s-8.533333 17.066667-17.066667 17.066667z"
              fill=""
              p-id="13101"
            ></path>
            <path
              d="M704 285.866667h-260.266667c-72.533333 0-136.533333 59.733333-136.533333 136.533333v268.8c0 72.533333 59.733333 136.533333 136.533333 136.533333h260.266667c72.533333 0 136.533333-59.733333 136.533333-136.533333V418.133333c-4.266667-72.533333-64-132.266667-136.533333-132.266666zM516.266667 640v-140.8l115.2 72.533333-115.2 68.266667z"
              fill="#FFDD48"
              p-id="13102"
            ></path>
            <path
              d="M704 840.533333h-260.266667c-85.333333 0-153.6-68.266667-153.6-153.6V418.133333c0-85.333333 68.266667-153.6 153.6-153.6h260.266667c85.333333 0 153.6 68.266667 153.6 153.6v268.8c0 85.333333-68.266667 153.6-153.6 153.6zM443.733333 302.933333c-64 0-115.2 51.2-115.2 115.2v268.8c0 64 51.2 115.2 115.2 115.2h260.266667c64 0 115.2-51.2 115.2-115.2V418.133333c0-64-51.2-115.2-115.2-115.2h-260.266667z m72.533334 354.133334c-4.266667 0-4.266667 0-8.533334-4.266667s-8.533333-8.533333-8.533333-17.066667v-140.8c0-8.533333 4.266667-12.8 8.533333-17.066666 4.266667-4.266667 12.8-4.266667 17.066667 0L640 554.666667c4.266667 4.266667 8.533333 8.533333 8.533333 17.066666 0 4.266667-4.266667 12.8-8.533333 17.066667l-115.2 68.266667h-8.533333z m17.066666-123.733334v76.8l59.733334-38.4-59.733334-38.4z"
              fill=""
              p-id="13103"
            ></path>
          </svg>
          <span>合集和列表 </span>
        </n-button>
        <!--  <n-button strong secondary type="primary"> 关注 </n-button> -->
      </n-space>
    </div>
    <div style="float: right; width: 50%; height: 100%">
      <n-space justify="end" size="large">
        <n-button strong secondary type="error"> 关注 </n-button>
        <n-button strong secondary type="info"> 发消息 </n-button>
      </n-space>
    </div>
  </div>
  <div style="height: 68%; width: 100%">
    <div style="float: left; width: 80%; height: 100%; padding: 10px; padding-left: 0">
      <div class="homeCardDeep" style="width: 100%; height: 100%">
        <div
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
          <div
            style="width: 190px; height: 180px;margin:5px;"
            class="animate__animated animate__flipInX homeCardDeep"
            v-for="(item, index) in journalismList"
            :key="index"
          >
            <div class="homeTitleCarImg" style="position: relative">
              <!-- <img class="homeTitleCarImgI" :src="item.img" /> -->
              <img
                class="homeTitleCarImgI"
                src="https://c.xkx61.com/upload/vod/20240226-1/562765c725adf8553b7c66bff19e99be.jpg"
              />
              <div style="position: absolute; z-index: 3; top: 5px; right: 8px">
                <n-button text style="font-size: 24px">
                  <n-icon>
                    <logo-markdown />
                  </n-icon>
                </n-button>
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
                <n-button text style="font-size: 24px">
                  <n-icon>
                    <logoGoogle-playstore />
                  </n-icon>
                </n-button>
              </div>
            </div>
            <div class="homeTitleCarText">
              <div class="homeTitleCarTextNex">
                <div class="homeTitleCarTextNexTup">
                  <span> {{ item.name }} </span>
                </div>
                <div class="homeTitleCarTextNexKup">
                  <span>
                    {{ item.NexT }}
                  </span>
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

          </div>
        </div>
      </div>
    </div>
    <div style="float: right; width: 20%; height: 100%; padding: 10px; padding-right: 0">
      <div class="homeCardDeep" style="width: 100%; height: 100%">
        <div style="width: 100%; height: 7%; padding: 10px">
          <span>公告</span>
        </div>
        <div style="width: 100%; padding-left: 10px; padding-right: 10px">
          <div style="background-color: #5d5c5c; height: 2px; width: 100%"></div>
        </div>
        <div style="width: 100%; padding: 10px">
          <span>这是公告内容，很多通知会实时同步UP主的公告</span>
        </div>
        <div style="width: 100%; height: 7%; padding: 10px">
          <span>个人资料</span>
        </div>
        <div style="width: 100%; padding-left: 10px; padding-right: 10px">
          <div style="background-color: #5d5c5c; height: 2px; width: 100%"></div>
        </div>
        <div style="width: 100%; padding: 10px">
          <span>这是UP主，个人资料，会实时同步UP主的个人资料</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homeCardDeep {
  width: 209px;
  height: 250px;
  background-color: rgb(39, 39, 39);
  border: 1px solid rgb(28, 28, 28);
  border-radius: 5px;
  border-bottom: 0px;
  /* margin: 5px; */
  /* margin-bottom: 10px; */
  cursor: pointer;
  /* flex: 0 0 200px; */
  flex: 1 1 auto;
  /* padding: 10px; */
  transition:
    transform 0.3s,
    box-shadow 0.3s !important;
  /* box-shadow: 0 0 10px rgba(73, 180, 136, 0.623); */
}

.homeCardDeep:hover {
  /* box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15); */

  /* transition-delay: 0s !important; */
  /* border: 1px solid #78a4fa; */

  /* transform: translateY(-10px)  !important; */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  /* animation: sparkle 0.5s infinite; */
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
  transition:
    transform 0.3s,
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
  line-height: 22px;
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
  transition:
    transform 0.3s,
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
