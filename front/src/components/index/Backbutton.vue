<template>
  <div class="back-button icon">
  	<router-link :to="{path:'/index/'}"> 回到首页</router-link>	
  </div>
</template>
<style lang="less" scoped>
@import url("../../assets/less/CV.less");
.back-button {
	width: 60px;
	height: 60px;
	position: fixed;
	right: 20px;
	line-height: 60px;
	text-align: center;
	bottom: 20px;
	color:white;
	background: @ActiveBlue;
	a{
		color: white;
		font-size: 12px;
	}
}
</style>