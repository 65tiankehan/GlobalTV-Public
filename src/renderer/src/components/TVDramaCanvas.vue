<!--
 * @职业: 自由 开发者
 * @Description:
 * @Author: KeHan
 * @Date: 2024-03-19 16:04:47
 * @LastEditTime: 2024-03-20 16:33:37
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
  <div class="tvDramaCanvas">
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

  transition:
    transform 0.3s,
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
