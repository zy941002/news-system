<template>
	<div>		
  		<aside class="access-panle" :class="{'show':showAccess}">
		  <el-tabs v-model="active">
		    <el-tab-pane label="登录" name="first">用户管理</el-tab-pane>
		    <el-tab-pane label="注册" name="second">配置管理</el-tab-pane>
		  </el-tabs>
  		</aside>
  </div>

</template>
<script>
import API from '../../api/api.js'
export default{
	data(){
		return {
			show : false,
			showList: false,
			active:"first"
		}
	},
	props:['showAccess'],
	methods:{
		access(){
			this.show = !this.show
		},
		showLists(){
			this.showList = !this.showList
		}
	}

}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.news-title{
	width: 100%;
	height: 50px;
	position: relative;
	transition: all .3s ease;
	border-bottom: 1px solid rgba(0,0,0,.25);
	box-shadow: 0 0 4px rgba(0,0,0,.25);
}
.access-panle{
	width: 300px;
	background: @ColorF;
	position: absolute;
	top: 0;
	right: -300px;
	position: fixed;
	transition: all .3s ease;
	bottom: 0;
}
.show{
	-webkit-transform: translateX(-300px);
	   -moz-transform: translateX(-300px);
	    -ms-transform: translateX(-300px);
	     -o-transform: translateX(-300px);
	        transform: translateX(-300px);
	        z-index: 100;
}
.trans-left {
	transform:translateX(-300px)
}
.trans-right {
	transform:translateX(300px)	
}
.cover{
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.4);
}
</style>