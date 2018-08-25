import Vue from 'vue'
import Vuex from 'vuex'
import { menuConfig } from "./router";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: menuConfig
  },
  mutations: {
    addRoute(state, payload){
      state.menus = state.menus.concat(payload)
      return state
    }
  },
  actions: {

  }
})
