<template>
	<div class="index-news-main">
		<div v-for="item in news" class="index-category">			
			<h1 class="category-news-title">
				<router-link :to="{path:'/index/newsdetail',query:{id:item.news.id}}">{{item.news.title}}</router-link>
			</h1>


			
			<figure>
				<img class="category-img" :src="item.news.imageurl">
			</figure>

			<div class="">
				<section class="news-extra-info">&nbsp;&nbsp;{{moment(news.timeflag).format(`YYYY-HH-DD`)}}&nbsp;&nbsp;</section>
				<section class="news-extra-info"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{item.news.clicked}}</i> &nbsp;&nbsp;</section>
			</div>



			{{item.news.preview}}			
		</div >
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
			this.$store.dispatch('SET_IDXCATEGORY',{id:this.$route.query.id})	
		}
	},
	methods:{
		moment(){
			return moment()
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
.index-category:nth-of-type(1){
	width: 600px;
	background: red;
	margin: 0 auto;	
	overflow: hidden;
	.category-news-title {
		float: left;	
	}	
	figure{
		width: 50%;
		float: right;
		img{
			width: 100%;
		}
	}
}
.category-news-title {
	width: 50%;
	height: auto;
	word-break: break-all;
}

</style>