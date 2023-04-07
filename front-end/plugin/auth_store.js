import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const auth_store = new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status
    }
  },
  actions: {

  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  },
})
