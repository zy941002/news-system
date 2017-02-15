<template>
  <div class="news-header">      
      <Sidebar
      	:show-menu="show"
      ></Sidebar>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
export default {
  name: 'header',
  data(){
  	return {
  		show:false,
  	}
  },
  components:{
  	Sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"scoped>
	.news-header{
		width: 100%;
		height: 50px;
		background: #324157;
	}
</style>