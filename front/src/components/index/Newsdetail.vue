<template>
	<div class="index-news-detail">
		<h1 class="pv-center">{{news.title}}</h1>
		<section class="pv-center news-preivew">{{news.preview}}</section>
		<div class="pv-center news-extra">			
			<section class="news-extra-info">
				<i>WRITE BY&nbsp;&nbsp;
					{{user.name}}&nbsp;&nbsp;
					{{moment(news.create_time).format(`YYYY-MM-DD`)}}&nbsp;&nbsp;
					<i class="fa fa-eye active" aria-hidden="true"></i>&nbsp;&nbsp;
					{{news.clicked}} &nbsp;&nbsp;
				</i>
			</section>			
			<i v-for="cate in news.categories">
				<span class="tag tag-small" @click="goCategory(cate.id)">{{cate.name}}</span>
			</i>
		</div>
		<div class="index-news-content"v-html='news.content'></div>		
		
		<div class="index-news-comment">
			<i class="fa fa-pencil add-comment-icon" aria-hidden="true" @click="toggleComment">&nbsp;&nbsp;添加新评论</i>	
			<el-input :class="{hide:hide}" type='textarea' v-model="comment" placehoder="有话要说"></el-input>
			<el-button  :class="{hide:hide}"class="submit-btn"@click="toggleComment">收起评论</el-button>
			<el-button  :class="{hide:hide}" type='primary' class="submit-btn"@click="submitComment">提交</el-button>	
		</div>		
		<div class="index-news-comments" v-for="(item,index) in comments.data">
			<section>
				<figure>
					<img class="comment-user-avatar icon" :src="JSON.parse(item.file).url"/>
					<div class="nick-date">
						<div class="comment-user">{{item.nickname}}</div>
						<span class="comment-date">{{moment(item.createTime).format(`YYYY-MM-DD`)}}</span>					
					</div>					
				</figure>
			</section>
			<div class="comment-content">{{item.content}}</div>			
		</div >
		<div class="fx-v-center comment-pagnation">
			<el-pagination			
	  			small
	  			layout="prev, pager, next"
	  			@size-change="handleSizeChange"
	      		@current-change="handleCurrentChange"
	  			:page-count="comments.totalPages">
			</el-pagination>
		</div>
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
			categories:[],
			news:{
			},
			user:{},
			comments:{
				count: "",
				totalPages: 0,
				numsPerPage: "",
				currentPage: "",
				data:[]
			},
			comment:''
		}
	},
	mounted(){
		if(this.$route.query.id){
			API.FIND(`news/news/find`,{id:this.$route.query.id}).then((res)=>{
				this.$set(this,'news',res.data.data);
				this.$set(this,'user',res.data.data.user)
			})
			API.FIND(`comments/comments/find`,{id:this.$route.query.id,page:1}).then((res)=>{
				this.$set(this,"comments",res.data.data)				
			})	
			API.FIND(`news/news/find`,{id:this.$route.query.id}).then((res)=>{				
				this.$set(this,"categories",res.data.data)
			})
		}
	},
	methods:{
		moment(){
			return moment()
		},
		handleSizeChange(val) {
      		console.log(`每页 ${val} 条`);
    	},
	    handleCurrentChange(val) {
	    	let self = this;
			API.FIND(`comments/comments/find`,{id:this.$route.query.id,page:val}).then((res)=>{
				this.$set(this,"comments",res.data.data)
			})
	    },
		showCommentbox(){
			this.hide = !this.hide;
		},
		goCategory(id){
			this.$router.push({path:'/index/categoty',query:{id,id}})
		},
		toggleComment(){
			this.hide = !this.hide
		},
		submitComment(){
			let user = JSON.parse(store.get(`userInfo`));
			if(user==null||user==undefined){
				alert(`请先登录`)
				return;
			}else{
				API.POST(`comments/comments/add`,{
					content : this.comment,
					newsid : this.$route.query.id,
					userid : user.id,
				}).then(res=>{
					if(res.data.errno==0){
						this.comments.data.unshift({
							content:this.comment,
							file:user.file,							
						})
						this.comment="";
						this.toggleComment();
					}					
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
.index-news-detail{
	margin-top: 50px;
}
.index-news{
	overflow: hidden;
	&-content{
		margin-bottom: 50px;
		min-height: 560px;
	}
	&-comment {
		overflow: hidden;
	}
	&-comments {
		border-bottom: 1px solid #f0f0f0;
		padding: 20px 0 10px;
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
	&-pagnation {
		margin: 10px 0;
	}
}	
.nick-date {
	display: inline-block;
	vertical-align: middle;
}
.add-comment-icon {
	margin: 10px 0;
}
.submit-btn{
	float: right;
	margin: 10px;
}
</style>