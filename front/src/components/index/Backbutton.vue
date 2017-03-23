<template>
  <div class="backbutton icon">
  	<router-link :to="{path:'/index/'}"> 回到首页</router-link>	
  </div>
</template>
<style lang="less" scoped>
.backbutton {
	width: 80px;
	height: 80px;
	position: fixed;
	right: 20px;
	line-height: 80px;
	text-align: center;
	bottom: 20px;
}
</style>