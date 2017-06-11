<template>
  <div>
    <md-button class="md-raised md-primary" v-on:click.native="onRefreshClick">Refresh</md-button>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Type</md-table-head>
          <md-table-head></md-table-head>
          <md-table-head>Holding</md-table-head>
          <md-table-head></md-table-head>
          <md-table-head>Sold</md-table-head>
          <md-table-head></md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head>Units</md-table-head>
          <md-table-head>Price(USDT)</md-table-head>
          <md-table-head>Market Price(USDT)</md-table-head>
          <md-table-head>Total(BTC)</md-table-head>
          <md-table-head>Total(USDT)</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in summary">
          <md-table-cell>{{ row.vcType }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.units }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.price }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.marketPrice }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.sumBtc }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.sumUsdt }}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
import store from '@/store'
export default {
  store,
  name: 'history-table',
  computed: {
    summary () {
      let market = this.$store.getters['market/lastPrices']
      let tradeHistory = this.$store.getters['history/all']
      let summary = [{
        vcType: 'Total',
        units: 0,
        price: 0,
        marketPrice: 0,
        sumBtc: 0,
        sumUsdt: 0
      }]

      for (let vcType in tradeHistory) {
        let subSummary = this.calculateSummary(tradeHistory[vcType])
        subSummary.vcType = vcType
        subSummary.marketPrice = market[vcType] && market[vcType].highestBidPrice
        subSummary.marketPrice *= subSummary.units
        summary[0].price += subSummary.price
        summary[0].marketPrice += subSummary.marketPrice
        summary[0].sumBtc += subSummary.sumBtc
        summary[0].sumUsdt += subSummary.sumUsdt
        summary.push(subSummary)
      }

      summary.sort((s1, s2) => {
        if (s1.vcType === 'Total') return -1
        if (s2.vcType === 'Total') return 1
        return s1.vcType < s2.vcType ? -1 : 1
      })

      summary.forEach(row => {
        for (let k in row) {
          if (typeof row[k] !== 'number') {
            continue
          }
          row[k] = Math.trunc(row[k] * 100000000) / 100000000
        }
      })

      return summary
    }
  },
  methods: {
    calculateSummary (tradeList) {
      let summary = {
        units: 0,
        price: 0,
        sumBtc: 0,
        sumUsdt: 0
      }
      let buyList = []
      tradeList.forEach(row => {
        let copiedRow = Object.assign({}, row)
        if (row.type === 'buy') {
          buyList.push(copiedRow)
        } else {
          buyList.sort((b1, b2) => b2.price - b1.price)
          for (let i = buyList.length - 1; i >= 0; i--) {
            let soldUnits = Math.min(buyList[i].units, copiedRow.units)
            buyList[i].units -= soldUnits
            copiedRow.units -= soldUnits
            summary.sumBtc += (copiedRow.rate - buyList[i].rate) * soldUnits
            summary.sumUsdt += (copiedRow.price - buyList[i].price) * soldUnits
            if (buyList[i].units === 0) {
              buyList.splice(i, 1)
            }
            if (copiedRow.units === 0) {
              break
            }
          }
        }
      })

      buyList.forEach(r => {
        summary.units += r.units
        summary.price += r.units * r.price
      })

      return summary
    },
    onRefreshClick (event) {
      this.$store.dispatch('history/reload')
      this.$store.dispatch('market/reload')
    }
  }
}
</script>

<style scoped>
</style>
