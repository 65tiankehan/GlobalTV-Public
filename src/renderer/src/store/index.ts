import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      view: 'v1',
      searchUrl: '',
      playAddress1: '',
      playAddress2: '',
      theme: 'white',
      playRoute: 'https://jx.2s0.cn/player/?url='
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
    }
  }
})
