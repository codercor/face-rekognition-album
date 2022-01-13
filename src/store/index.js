import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import eventModule from './event.module';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    event:eventModule
  }
})
