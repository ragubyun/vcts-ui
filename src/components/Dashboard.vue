<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
import store from '@/store'
export default {
  store,
  name: 'hello',
  computed: {
    msg () {
      return this.$store.state.hello
    }
  }
}
</script>

<style scoped>
</style>
