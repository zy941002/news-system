<template>
	<div>
		<div v-for="item in news">
			<h1>{{item.news.title}}</h1>
			<div class="content" v-html="item.news.content"></div>
			<el-tag>{{item.cate.name}}</el-tag>
			<el-tag>
				<router-link :to="{path:'/index/newsdetail',query:{id:item.news.id}}">查看详情</router-link>
			</el-tag>			
		</div >
	</div>
</template>
<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
export default{
	name: "indexCategory",
	mounted(){
		if(this.$route.query.id){
			this.$store.dispatch('SET_IDXCATEGORY',{id:this.$route.query.id})	
		}
	},
	computed: {
		news(){
			if(!!this.$store.state.idxCategory.idxcategory.length){
				return this.$store.state.idxCategory.idxcategory;
			}
		}
  	},
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