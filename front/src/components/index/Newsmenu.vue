<template>
	 <div class="menu-list" :class="{'trans-right':showList}">	  	
  		<div v-if="user" class="sign-icon">
  			<figure class="fx-h-center">
  				<img class="avatar" :src="file.url">
  				<h3 class="user-nickname"><i>{{user.name}}</i></h3>
  			</figure>
  		</div>
  		<div v-else class="sign-icon" @click="goLogin">
  			<i class="fa fa-sign-in icon" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span class="txt-info" >登录</span>	
  		</div>
	   	<dl>
	   		<dt  class="recommend tag" @click="goIndex()">推荐</dt>
			<dt v-for="(category,index) in categories" class="tag">
				<span @click="goCategory(category.id,category.name)">{{category.name}}</span>
			</dt>
	   	</dl>
	   	<div v-if="user">
		   	<div class="logout-btn fx-hv-center "@click="logout">
   				<i class="fa fa-2x fa-sign-out " aria-hidden="true">退出</i>
   			</div>	   		   		
	   	</div>	   	
	 </div>
</template>
<script>
import API from '../../api/api.js'
import Storage from '../../assets/js/storage.js'
export default{
	props:['showList'],
	name:"Menus",
	mounted(){
		API.FIND(`admin/category`).then(res=>{
			this.$set(this,"categories",res.data.data)
		});
		this.user = JSON.parse(Storage.get("userInfo"));
		if(this.user){
			this.file = JSON.parse(this.user.file)	
		}
      	
	},
	data(){
		return{
			categories:[],
			user:{},
			file:''
			
		}
	},
	methods:{
		goCategory(id,name){
			let res = this.$emit("hideMenus",id,name);
			this.$store.dispatch('SET_IDXCATEGORY',id)
		},
		goIndex(){
			this.$emit("hideMenus");
		},
		goLogin(type){
			this.$emit("hideMenus",1);	
		},
		logout(){
			Storage.delete(`userInfo`);
        	this.$emit("hideMenus");
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.sign-icon {
	padding: 10px 0;
	border-bottom: 1px solid @Gray;
	margin: 10px 3em;
	color:@ActiveRed;
}
.user-nickname {
	color: @ActiveBlue;
	margin-left:3em;
}
.recommend {
	color: @ActiveBlue;
}
.menu-list {
	width: 300px;
	background: @ColorF;
	position: fixed;
	top: 0;
	bottom: 0;
	z-index: 115;
	left: -300px;
	overflow: hidden;
	transition: all .3s ease;
}

@iterations: 15;
.mixin-loop (@i) when (@i > 0) {
  .tag:nth-child(@{i}){  	
  	padding: 12px 0;
  	text-indent: 3em;
  	margin: 5px 0;
  	transform : all .6s ease; 
  	display: flex;
  	background: @ColorF;
  	justify-content:space-between;
  	border-bottom: 1px solid @Gray;
  	&:hover{
  		transform:scale(1.1);
  		cursor: pointer;
  		box-shadow: 0 0 4px rgba(0,0,0,.9);
  		color:@ActiveBlue;
  		border-bottom: 1px solid @Gray;
  	}
  }
  .mixin-loop(@i - 1);
}
.mixin-loop(@iterations);

.logout-btn {
	 position: absolute;
	 width: 100%;
	 height: 30px;
	 cursor: pointer;
	 bottom: 0;
	 color: white;
	 padding: 2px 0;
	 font-size: 16px;
	 background: @ActiveBlue;
}
</style>