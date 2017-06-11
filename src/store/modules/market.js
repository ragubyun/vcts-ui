import Vue from 'Vue'

export default {
  namespaced: true,
  state: {
  },
  actions: {
    reload ({ commit }) {
      fetch('http://localhost:3000/api/v1/market', {
        method: 'GET'
      }).then(res => {
        return res.json()
      }).then(json => {
        commit('reload', json)
      })
    }
  },
  mutations: {
    reload (state, value) {
      for (let vcType in value) {
        Vue.set(state, vcType, value[vcType])
      }
    }
  },
  getters: {
    lastPrices (state) {
      let result = {}
      for (let vcType in state) {
        result[vcType] = Object.assign({}, state[vcType])
      }
      return result
    }
  }
}
