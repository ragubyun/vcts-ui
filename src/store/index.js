import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import market from './modules/market'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    market
  }
})
