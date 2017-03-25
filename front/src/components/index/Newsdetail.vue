<template>
	<div class="index-news-main">
		<h1 class="pv-center">{{news.title}}</h1>
		<section class="pv-center news-preivew">{{news.preview}}</section>
		<div class="pv-center news-extra">
			<section class="news-extra-info"><i>WRITE BY&nbsp;&nbsp;{{news.extra.user.name}}&nbsp;&nbsp;</i></section>
			<section class="news-extra-info">&nbsp;&nbsp;{{moment(news.timeflag).format(`YYYY-HH-DD`)}}&nbsp;&nbsp;</section>
			<section class="news-extra-info"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{news.clicked}}</i> &nbsp;&nbsp;</section>
		</div>
		<div class="index-news-content"v-html='news.content'></div>		
		<div class="index-news-comment">
			<i class="fa fa-pencil add-comment-icon" aria-hidden="true" @click="showCommentbox">&nbsp;&nbsp;添加新评论</i>	
			<el-input :class="{hide:hide}" type='textarea' v-model="comment" placehoder="有话要说"></el-input>
			<el-button  :class="{hide:hide}" type='primary' @click="submitComment">提交</el-button>
		</div>		
		<div class="index-news-comments" v-for="(item,index) in news.extra.comment">			
			<section>
				<figure>
					<img class="comment-user-avatar icon" :src="JSON.parse(item.user.file).url"/>
					<div class="nick-date">
						<div class="comment-user">{{item.user.name}}</div>
						<span class="comment-date">{{moment(item.createTime).format(`YYYY·MM·DD`)}}</span>	
					</div>					
				</figure>
			</section>
			<div class="comment-content">{{item.content}}</div>		
		</div >
	</div>
</template>
<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
import store from '../../assets/js/storage.js'
import '../../assets/less/overwriteeditor.less'
export default{
	data(){
		return{
			hide:true,
			news:{
				extra:{
					user:{

					},
					cate:[],
					comment:[]
				}
			},
			comment:''
		}
	},
	mounted(){
		if(this.$route.query.id){
			API.FIND(`news/news/fetch`,{id:this.$route.query.id}).then((res)=>{
				this.$set(this,'news',res.data.data.data[0])
			})	
		}
	},
	methods:{
		moment(){
			return moment()
		},
		showCommentbox(){
			this.hide = !this.hide;
		},
		submitComment(){
			let user = JSON.parse(store.get(`userInfo`));
			if(user==null||user==undefined){
				alert(`请先登录`)
				return;
			}else{
				API.POST(`comments/comments/add`,{
					content : this.comment,
					newsid : this.news.id,
					userid : user.id
				}).then(res=>{
					console.log(res)
				})
			}			
		}
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.hide{
	display: none;
}
.news-preivew {
	margin: 10px 0;
	color: @DarkGray;
}
.index-news-content, .news-preivew,
.index-news-comment, .index-news-comments,{
	width: 55%;
	display: block;
	margin: 0 auto;	
}
.news-preivew {
	text-align: center;
	margin: 10px auto;
	line-height: 24px;
}
.index-news{
	&-content{
		margin-bottom: 50px;
	}

	&-comments {
		border-bottom: 1px solid #f0f0f0;
		padding: 20px 0 30px;
	}
}
.comment{
	&-user-avatar {
		width: 40px;
		height: 40px;
		vertical-align: middle;
		border-radius: 50%;
	}
	&-date{
		font-size: 12px;
	}
	&-content {
		margin: 10px 0 10px 50px;		
	}
}	
.nick-date {
	display: inline-block;
	vertical-align: middle;
}
.add-comment-icon {
	margin: 10px 0;
}
</style>