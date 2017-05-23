<template>
	<div class="category-main index-news-main">
		<div class="other-cate-wrapper">
			<div v-for="(item ,index) in news"  class="othercate">
				<div v-if="item.imageurl==''">
					<h2  class="category-title category-title-middle" v-if="index==0">{{item.name}}</h2>
					<h1 class="category-news-title" @click="goDetail(item)">
							{{item.title}}
					</h1>				
					<div class="news-extra">
						<section class="news-extra-info">{{moment(item.create_time).format(`YYYY-HH-DD`)}}&nbsp;&nbsp;
							<i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{item.clicked}}</i> &nbsp;&nbsp;				
						</section>
					</div>
					<div class="cate-preview">{{item.preview}}</div>
				</div>			
			</div>
		</div>
		<div v-for="(item ,index) in news">
			<div v-if="item.imageurl!==''"class="index-category">
				<h2  class="category-title category-title-middle" v-if="index==0">{{item.name}}</h2>
				<h1 class="category-news-title" @click="goDetail(item)">{{item.title}}</h1>				
				<figure><img class="category-img" :src="item.imageurl"></figure>
				<div class="news-extra">
					<section class="news-extra-info">{{moment(item.create_time).format(`YYYY-HH-DD`)}}&nbsp;&nbsp;
					<i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{item.clicked}}</i> &nbsp;&nbsp;				
					</section>
				</div>
				<div class="cate-preview">{{item.preview}}</div>
			</div>						
		</div>
	</div>
</template>
<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default{
	name: "indexCategory",
	mounted(){
		if(this.$route.query.id){
			let now = new Date().toString()
			this.$store.dispatch('SET_IDXCATEGORY',{id:this.$route.query.id,date:now})
		}
		
	},
	data(){
		return {
		}
	},
	methods:{
		moment(){
			return moment()
		},
		goCategory(id){
			this.$store.dispatch('SET_IDXCATEGORY',{id:id,date:new Date().toString()})
		},
	},
	computed: {
		news(){
			console.log(this.$store.state.idxCategory.idxcategory)
			return this.$store.state.idxCategory.idxcategory
		},
		othercate(){
			return this.$store.state.idxCategory.idxcategory
			}		
  		},
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
@firstpartheight:280px;
.category-main{
	width: 960px;
	margin: 120px auto;
	position: relative;
	overflow: hidden;
}
.index-category{
	width: 60%;
	margin: 10px 10px 0 0;
	padding-bottom: 10px;
	border-bottom: 1px solid @Gray;
	figure{
		img{
			width: 100%;
			height: 350px;
			float: right;
		}
	}
}
.cate-preview {
	font-size: 13px;
	line-height: 24px;
}
.category-news-title {
	font-size: 24px;
}
.other-cate-wrapper{	
	width: 38%;
	float: right;
	border-left: 1px solid @Gray;
}
.othercate {
	width: 88%;
	margin: 10px auto;
	padding-bottom: 10px;
	border-bottom: 1px solid @Gray;
	img{
		width: 100%;
		height: 150px;
	}
}
.cate-title {
	padding: 5px 0;
 	display: block;
	border-width: 2px 0 0 0 ;
}
.category-title{
	border-width: 2px 0 0 0 ;	
}
</style>