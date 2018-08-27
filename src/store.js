import Vue from 'vue'
import Vuex from 'vuex'
import { menuConfig } from "./router";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: menuConfig,
    role: 'admin',
    openTags: [{
      name: 'home',
      text: '首页',
      path: '/'
    }]
  },
  mutations: {
    addRoute(state, payload){
      state.menus = state.menus.concat(payload)
    },
    addOpenTag(state, payload){
      if(state.openTags.every(tag => tag.path !== payload.path)){
        state.openTags = state.openTags.concat(payload)
      }
    },
    removeTag(state, payload){
      const index = state.openTags.findIndex(tag => tag.path === payload)
      state.openTags.splice(index, 1)
    }
  },
  actions: {

  }
})
