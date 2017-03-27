<template>
<div class="index-main">
  <div class="news-wrapper">
    <sidecate></sidecate>
    <div class="recommend-news">
      <h1 class="category-title category-title-large">今日要闻</h1>
      <div v-for="news in topNews" class="article-item">    		
        <h3 class="article-title article-title-large" @click="updateCount(news)">
          {{news.title}}
        </h3>  		
        <time class="news-extra-info"><i>{{moment(news.timeflag).format("YYYY-MM-DD")}}</i>&nbsp;&nbsp;<i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{news.clicked}}</i></time>       
          <div class="news-image"  @click="updateCount(news)">
             <img :src="news.imageurl">
          </div>
          <p class="news-preview">{{news.preview}}</p>
    	</div>    
    </div>
  </div>    
    <carousel height="400"class="carousel"></carousel>
  </div>
</template>
<script>
import API from '../../api/api.js'
import sidecate from './Sidecate.vue'
import carousel from './Carousel .vue'

import moment from 'moment'
export default{
  components:{
    sidecate,
    carousel
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
      API.POST(`news/news/updateclick`,{
        id : news.id,
        clicked : ++news.clicked
      }).then(res=>{
        if(res.data.errno==0){
          this.$router.push({path:"/index/newsdetail",query:{id:news.id}})
        }
      })
    }
  },
  mounted(){
  	let now = new Date()
  	API.FIND(`news/news/top?date=${now}`).then(res=>{
  		this.$set(this,`topNews`,res.data.data)
  	})
  },
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.index-main {
  width: 960px;
  margin: 100px auto;
}
.news-wrapper {
  overflow: hidden;
}
.recommend-news {
	width: 600px;
	height: auto;
}
.top-news-title {
  margin: 15px 0;
}
.article-item {
  width: 100%;
  height: auto;
  position: relative;
  border:1px solid @Gray;
  border-width: 1px 0 0 0;
  overflow: hidden;
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
.carousel {
  width: 800px;
  margin: 0 auto;
}


</style>