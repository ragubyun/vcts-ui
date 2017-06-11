<template>
  <div>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Type</md-table-head>
          <md-table-head>Units</md-table-head>
          <md-table-head>Total(BTC)</md-table-head>
          <md-table-head>Total(USDT)</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in summary">
          <md-table-cell>{{ row.vcType }}</md-table-cell>
          <md-table-cell md-numeric>{{ row.amount }}</md-table-cell>
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
      let tradeHistory = this.$store.getters['history/all']
      let summary = [{
        vcType: 'Total',
        sumBtc: 0,
        sumUsdt: 0
      }]
      for (let vcType in tradeHistory) {
        let subsum = tradeHistory[vcType].reduce((result, cur) => {
          let usdt = cur.amount * cur.price
          result.amount += cur.type === 'buy' ? cur.amount : -cur.amount
          result.sumBtc += cur.type === 'buy' ? -cur.total : cur.total
          result.sumUsdt += cur.type === 'buy' ? -usdt : usdt
          return result
        }, {
          vcType,
          amount: 0,
          sumBtc: 0,
          sumUsdt: 0
        })
        subsum.amount = Math.trunc(subsum.amount * 100000000) / 100000000
        subsum.sumBtc = Math.trunc(subsum.sumBtc * 100000000) / 100000000
        subsum.sumUsdt = Math.trunc(subsum.sumUsdt * 100000000) / 100000000

        summary[0].sumBtc += subsum.sumBtc
        summary[0].sumUsdt += subsum.sumUsdt
        summary.push(subsum)
      }

      summary.sort((s1, s2) => {
        if (s1.vcType === 'Total') return -1
        if (s2.vcType === 'Total') return 1
        return s1.vcType < s2.vcType ? -1 : 1
      })

      return summary
    }
  }
}
</script>

<style scoped>
</style>
