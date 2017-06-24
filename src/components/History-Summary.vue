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
export default {
  name: 'history-summary',
  mounted () {
    fetch('http://localhost:3000/api/v1/accounts/poloniex/history', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(json => {
      return json
    })
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
