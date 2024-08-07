import { createStore } from 'vuex'

interface Notice {
  title: string,
  message: string
}

export default createStore({
  state() {
    return {
      view: 'v1',
      searchUrl: '',
      playAddress1: -1,//这个是一级目录选择值
      playAddress2: -1,//这个是二级目录选择值
      theme: 'darkTheme',//lightTheme 亮，darkTheme 暗
      playRoute: 'https://jx.2s0.cn/player/?url=',
      playVideoUrl: 'https://www.yyds.one/',
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
      mimeType:''//本地视频类型
    }
  },
  getters: {
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

  },
  mutations: {
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
  }
})
