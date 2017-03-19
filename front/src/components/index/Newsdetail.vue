<template>
	<div>
		<h1>{{news.title}}</h1>
		<div>点击量<el-tag>{{news.clicked}}</el-tag></div>
		<div v-html='news.content'></div>
		评论框	
		<el-input type='textarea' placehoder="有话要说"></el-input>
		<div v-for="item in news.extra.comment">
			<span>{{item.user.name}}</span>
			{{item.content}}
		</div >
	</div>
</template>
<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
export default{
	data(){
		return{
			news:{
				extra:{}
			}
		}
	},
	mounted(){
		if(this.$route.query.id){
			API.FIND(`news/news/fetch`,{id:this.$route.query.id}).then((res)=>{
				this.$set(this,'news',res.data.data[0])
			})	
		}
		

	}

}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.contet {
	width: 500px;
	height: auto;
	background: red;
}
</style>