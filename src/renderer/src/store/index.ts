import { createStore } from 'vuex'

interface Notice {
  title: string,
  message: string
}

interface smartRoutePath {
  localPath?: string,
  path?: string//线路，用于替代相关palyer**Url

}

//darkTheme  lightTheme
export default createStore({
  state() {
    return {
      Detour:true,
      CaseServiceAgreement: false,
      protocol18: false,
      isToggLed: '0-0',
      skin: 'darkTheme',
      view: 'v1',
      searchUrl: '',
      playAddress1: -1,//这个是一级目录选择值
      playAddress2: -1,//这个是二级目录选择值
      theme: 'darkTheme',//lightTheme 亮，darkTheme 暗
      playRoute: '',
      playVideoUrl: 'https://xhvod.com/',//http://www.cechi7.com/dianshiju/guochanju/；https://xhvod.com/tv/2.html；https://www.kanys4.com/filmshow/gcj-----------.html
      playVideoType: '',
      breadcrumbs: ['首页'],
      page: 1,
      total: 0,
      PaginationUrl: '',
      notices: [] as Notice[],//通知消息
      showUpdate: false,
      videoDetailsLoading: '',//视频详情加载url，这个一发生变化，就弹开详情窗口，进入详情加载
      PlayStarted: false,//播放开始
      StreamSource: '',//视频源
      versionDescriptions: [],//版本更新内容
      localPlayUrl: '',//本地播放 Blob URL
      mimeType: '',//本地视频类型
      isSmartRouteEnabled: false,//是否开启智能路由
      smartRoutePaths: [{
        localPath: 'https://ml-tv.cc',
        path: 'https://ml-tv.cc/index.php/vod/search.html?wd='
      }] as smartRoutePath[],//智能路由
      History: '',//历史记录
      Favorite: ''//收藏
    }
  },
  getters: {
    getDetour: (state) => {
      return state.Detour
    },
    getCaseServiceAgreement: (state) => {
      return state.CaseServiceAgreement
    },
    getProtocol18: (state) => {
      return state.protocol18
    },
    getIsToggLed: (state) => {
      return state.isToggLed
    },
    getSkin: (state) => {
      return state.skin
    },
    getView: (state) => {
      return state.view
    },
    getPlayAddress1: (state) => {
      return state.playAddress1
    },
    getPlayAddress2: (state) => {
      return state.playAddress2
    },
    getSearchUrl: (state) => {
      return state.searchUrl
    },
    getTheme: (state) => {
      return state.theme
    },
    getPlayRoute: (state) => {
      return state.playRoute
    },
    getPayVideoUrl: (state) => {
      return state.playVideoUrl
    },
    getPayVideoType: (state) => {
      return state.playVideoType
    },
    getBreadcrumbs: (state) => {
      return state.breadcrumbs
    },
    getPage: (state) => {
      return state.page
    },
    getTotal: (state) => {
      return state.total
    },
    getPaginationUrl: (state) => {
      return state.PaginationUrl
    },
    getNotices: (state) => {
      return state.notices
    },
    getShowUpdate: (state) => {
      return state.showUpdate
    },
    getVideoDetailsLoading: (state) => {
      return state.videoDetailsLoading
    },
    getPlayStarted: (state) => {
      return state.PlayStarted
    },
    getStreamSource: (state) => {
      return state.StreamSource
    },
    getVersionDescriptions: (state) => {
      return state.versionDescriptions
    }
    ,
    getLocalPlayUrl: (state) => {
      return state.localPlayUrl
    },
    getMimeType: (state) => {
      return state.mimeType
    }
    ,
    getIsSmartRouteEnabled: (state) => {
      return state.isSmartRouteEnabled
    }
    ,
    getSmartRoutePaths: (state) => {
      return state.smartRoutePaths
    },
    getHistory: (state) => {
      return state.History
    },
    getFavorite: (state) => {
      return state.Favorite
    }

  },
  mutations: {
    SET_DETOUR: (state, payload) => {
      state.Detour = payload
    },
    SET_CASE_SERVICE_AGREEMENT: (state, payload) => {
      state.CaseServiceAgreement = payload
    },
    SET_PROTOCOL18: (state, payload) => {
      state.protocol18 = payload
    },
    SET_TOGGLED: (state, payload) => {
      state.isToggLed = payload
    },
    SET_SKIN: (state, payload) => {
      state.skin = payload
    },
    SET_VIEW: (state, payload) => {
      state.view = payload
    },
    SET_PLAYADDRESS1: (state, payload) => {
      state.playAddress1 = payload
    },
    SET_PLAYADDRESS2: (state, payload) => {
      state.playAddress2 = payload
    },
    SET_SEARCHURL: (state, payload) => {
      state.searchUrl = payload
    },
    SET_THEME: (state, payload) => {
      state.theme = payload
    },
    SET_PLAYROUTE: (state, payload) => {
      state.playRoute = payload
    },
    SET_PAYVIDEOURL: (state, payload) => {
      state.playVideoUrl = payload
    },
    SET_PAYVIDEOTYPE: (state, payload) => {
      state.playVideoType = payload
    },
    SET_BREADCRUMBS: (state, payload) => {
      state.breadcrumbs = payload
    },
    SET_PAGE: (state, payload) => {
      state.page = payload
    },
    SET_TOTAL: (state, payload) => {
      state.total = payload
    },
    SET_PAGINATIONURL: (state, payload) => {
      state.PaginationUrl = payload
    },
    SET_NOTICES: (state, payload) => {
      state.notices = payload
    },
    SET_SHOWUPDATE: (state, payload) => {
      state.showUpdate = payload
    },
    SET_VIDEODETAILSLOADING: (state, payload) => {
      state.videoDetailsLoading = payload
    },
    SET_PLAYSTARTED: (state, payload) => {
      state.PlayStarted = payload
    },
    SET_STREAMSOURCE: (state, payload) => {
      state.StreamSource = payload
    },
    SET_VERSIONDESCRIPTIONS: (state, payload) => {
      state.versionDescriptions = payload
    },
    SET_LOCALPLAYURL: (state, payload) => {
      state.localPlayUrl = payload
    },
    SET_MIMETYPE: (state, payload) => {
      state.mimeType = payload
    }
    ,
    SET_ISSMARTROUTEENABLED: (state, payload) => {
      state.isSmartRouteEnabled = payload
    },
    SET_SMARTROUTEPATHS: (state, payload) => {
      state.smartRoutePaths = payload
    },
    SET_HISTORY: (state, payload) => {
      state.History = payload
    },
    SET_FAVORITE: (state, payload) => {
      state.Favorite = payload
    }
  }
})
