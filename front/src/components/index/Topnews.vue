<template>
  <div class="recommend-news index-news-main">
    <h4 class="category-title">今日要闻</h4>  	
    <div v-for="news in topNews" class="article-item">
  		<h3 class="article-title" @click="updateCount(news)">
        <router-link :to="{path:'/index/newsdetail',query:{id:news.id}}">{{news.title}}</router-link>
      </h3>
  		
      <time class="c-time"><i>{{moment(news.timeflag).format("YYYY年MM月DD日")}}</i></time>
        
        <div class="news-image">
           <img :src="news.imageurl">
        </div>
       
        <p class="news-preview">{{news.preview}}</p>
  		<!-- <el-tag class="more-btn">
        <router-link :to="{path:'/index/newsdetail',query:{id:news.id}}">查看详情</router-link>
      </el-tag> -->
  	</div >
  </div>
</template>
<script>
import API from '../../api/api.js'
import moment from 'moment'
export default{
  components:{
  },
  data(){
  	return {
  		topNews:[]
  	}
  },
  methods:{
  	moment:function(){
  		return moment();
  	},
    updateCount(news){
      console.log(news)
      API.POST(`news/news/updateclick`,{
        id : news.id,
        clicked : ++news.clicked
      }).then(res=>{
        console.log(res)
      })
    }
  },
  mounted(){
  	let now = new Date()
  	API.FIND(`news/news/top?date=${now}`).then(res=>{
  		this.$set(this,`topNews`,res.data.data)
  	})
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.recommend-news {
	width: 550px;
	height: auto;
}
.category-title{
  color:@ActiveBule;
  margin-left: 50px;
  font-size: 18px;
  width: 100%;
  padding: 10px 0;
  font-size: 23px;
  border-top: 2px solid black;
}
.article-item {
  width: 100%;
  height: auto;
  margin-left: 50px;
  position: relative;
  border:1px solid @Gray;
  border-width: 1px 0 0 0;
  overflow: hidden;
}
.article-title {
  font-size: 23px;
  margin: 6px 0;
  color: black;
}
.c-time{
  margin: 10px 0;
}
.article-item {
  padding-bottom: 20px;
}
.article-item{
  .news-image{
    img {
      margin: 0 10px 10px 0;
      width: 60%;
      height: 200px; 
      float: left;   
    }  
  }  
}

.news-preview {
  font-size: 14px;
  color:gray;
}


</style>