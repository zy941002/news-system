<template>
  <div class="news-header hideHeader fx-h-center fx-v-btw":class="[{showHeader:showSide}]">   	
    <span @click="toggleSide" class="news-menu-icon"><i class="fa fa-list" aria-hidden="true"></i></span>
    <div class="user-icon"><Usericon></Usericon></div>
  </div>
</template>
<script>
import Usericon from '../user/Usericon.vue'

export default{
	props:[`showSide`],
	components: {
		Usericon
	},
	methods: {
		toggleSide: function(){
			this.$emit(`toggleSide`)
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.hideHeader{
	margin-left: 43px;
	height: 100px;
	background: @ActiveBlue;
	transition: all .3s ease-in-out;	
}
.showHeader{
  margin-left: 200px;
  transition: all .4s ease-in-out;
}
.news-menu-icon {
	display: inline-block;
	margin-left: 20px;
}
.user-icon {
	margin: 20px;
}
</style>