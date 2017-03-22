<template>
  <div class="menu-list" :class="{'trans-right':showList}">
  	<div class="sign-icon phv-center">
  		<i class="fa fa-sign-in icon" aria-hidden="true"></i>
  		<span class="txt-info">登录</span>
  	</div>   	
   	<dl >
   		<dt @click="goIndex()">推荐</dt>
		<dt v-for="category in categories" class="tag">
			<span @click="goCategory(category.id,category.name)">{{category.name}}</span>
		</dt>
   	</dl>
  </div>
</template>
<script>
import API from '../../api/api.js'
export default{
	props:['showList'],
	name:"Menus",
	mounted(){
		API.FIND(`admin/category`).then(res=>{
			this.$set(this,"categories",res.data.data)
		})
	},
	data(){
		return{
			categories:[]
		}
	},
	methods:{
		goCategory(id,name){
			let res = this.$emit("hideMenus",id,name);
		},
		goIndex(){
			this.$emit("hideMenus");
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.menu-list {
	width: 300px;
	background: @ColorF;
	position: fixed;
	// position: absolute;
	top: 0;
	z-index: 100;
	left: -300px;
	transition: all .3s ease;
	bottom: 0;
}
.sign-icon {
	color:@Tipred;
	height: 60px;
	border-bottom: 1px solid @Gray;
	padding: 0 20px;
	.txt-info{
		color:black;
	}
}
.tag{
	display: inline-block;
	padding: 0 9px;
	margin: 0 4px;
	overflow: hidden;
}
.tag:nth-child(2){
	border:1px solid black;
}
</style>