<template>
  <div class="recommend-news index-news-main">
    <h1 class="category-title category-title-large">今日要闻</h1>  	
    <div v-for="news in topNews" class="article-item">
  		<h3 class="article-title" @click="updateCount(news)">
        <router-link :to="{path:'/index/newsdetail',query:{id:news.id}}">{{news.title}}</router-link>
      </h3>  		
      <time class="c-time"><i>{{moment(news.timeflag).format("YYYY年MM月DD日")}}</i></time>        
        <div class="news-image">
           <img :src="news.imageurl">
        </div>
        <p class="news-preview">{{news.preview}}</p>
  	</div>
    <carousel class="carousel"></carousel>
  </div>
</template>
<script>
import API from '../../api/api.js'
import carousel from './Carousel .vue'

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
  },
  components: {
    carousel
  }

}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.recommend-news {
	width: 550px;
	height: auto;
}
.article-item {
  width: 100%;
  height: auto;
  position: relative;
  border:1px solid @Gray;
  border-width: 1px 0 0 0;
  overflow: hidden;
}
.article-title {
  font-size: 23px;
  margin: 6px 0;
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