<template>
  <div id="app">
  	<newsHeader></newsHeader>
    <router-view></router-view>
  </div>
</template>
<script>
import newsHeader from './components/common/NewsHeader.vue'
export default {
  name: 'app',
  components:{
  	newsHeader
  }
}
</script>