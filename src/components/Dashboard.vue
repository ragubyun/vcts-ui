<template>
  <div>
    <history-summary></history-summary>
  </div>
</template>

<script>
import store from '@/store'
import HistorySummary from './History-Summary'
export default {
  store,
  name: 'hello',
  created () {
    this.$store.dispatch('history/reload')
    this.$store.dispatch('market/reload')
  },
  components: {
    'history-summary': HistorySummary
  }
}
</script>

<style scoped>
</style>
