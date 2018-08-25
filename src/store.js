import Vue from 'vue'
import Vuex from 'vuex'
import { menuConfig } from "./router";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: menuConfig
  },
  mutations: {

  },
  actions: {

  }
})
