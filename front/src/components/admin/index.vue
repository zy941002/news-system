<template>
  <div id="admin">
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../common/Sidebar.vue'
export default {
  name: 'admin',
  components:{
  	Sidebar
  }
}
</script>

<style></style>
