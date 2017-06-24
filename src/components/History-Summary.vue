<template>
  <div>
    <div>
      <div>
        {{ historyData }}
      </div>
      <div>
      </div>
      <div @click="onClickAlert">hello</div>
    </div>

  </div>
</template>

<script>
import historyData from '../assets/history'
export default {
  name: 'history-summary',
  data () {
    return {
      historyData
    }
  },
  computed: {
    firstName () {
      return 'hello'
    }
  },
  methods: {
    onClickAlert () {
    }
  }
}
</script>

<style scoped>
</style>
