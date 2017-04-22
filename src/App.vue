<template>
  <div id="app">
    <loading v-show='loadingState' />
    <router-view></router-view>
  </div>
</template>

<script>
import loading from 'components/loading/'
export default {
  name: 'app',
  components:{
    loading
  },
  computed:{
    loadingState(){
      return this.$store.state.baseData.loadingState
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
