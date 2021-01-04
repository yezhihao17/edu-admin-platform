import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取本地用户数据
const user = JSON.parse(window.localStorage.getItem('user') || 'null')
export default new Vuex.Store({
  state: {
    user // 用户信息
  },
  mutations: {
    // 设置用户数据
    setUser (state, payload) {
      state.user = JSON.parse(payload || 'null')

      // 设置 localStorage
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
