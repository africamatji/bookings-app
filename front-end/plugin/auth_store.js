import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export const auth_store = new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  plugins: [new VuexPersistence().plugin],
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
