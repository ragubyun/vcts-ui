import Vue from 'Vue'

export default {
  namespaced: true,
  state: {
    trade: {}
  },
  actions: {
    reload ({ commit }) {
      fetch('http://localhost:3000/api/v1/accounts/poloniex', {
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
        Vue.set(state.trade, vcType, value[vcType])
      }
    }
  },
  getters: {
    all (state) {
      let result = {}
      for (let vcType in state.trade) {
        result[vcType] = []
        state.trade[vcType].forEach(row => {
          result[vcType].push({
            usdt_btc: Number(row.usdt_btc),
            price: Number(row.price),
            units: Number(row.units),
            rate: Number(row.rate),
            total: Number(row.total),
            tradeID: row.tradeID,
            type: row.type,
            date: new Date(row.date).getTime()
          })
        })
      }
      return result
    }
  }
}
