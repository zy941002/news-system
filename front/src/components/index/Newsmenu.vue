<template>
  <div class="menu-list" :class="{'trans-right':showList}">
  	全部
   <div v-for="category in categories">
   	{{category.name}}
   </div >
  </div>
</template>
<script>
import API from '../../api/api.js'
export default{
	props:['showList'],
	mounted(){
		API.FIND(`admin/category`).then(res=>{
			this.$set(this,"categories",res.data.data)
			console.log(res.data.data)
		})
	},
	data(){
		return{
			categories:[]
		}
	},
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.menu-list{
	width: 300px;
	background: @ColorF;
	position: absolute;
	top: 0;
	z-index: 100;
	left: -300px;
	transition: all .3s ease;
	bottom: 0;
}
</style>