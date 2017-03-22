<template>
  <div class="recommend-news">
    <h1 class="category-title">今日要闻</h1>  	
    <div v-for="news in topNews" class="article-item">
  		<h1 class="article-title">
      <router-link :to="{path:'/index/newsdetail',query:{id:news.id}}">{{news.title}}</router-link>
      </h1>
  			<time><i>{{moment(news.timeflag).format("YYYY年MM月DD日")}}</i></time>
        <div class="article">
          <article v-html="news.content"></article>
        </div>
  		<el-tag class="more-btn">
        <router-link :to="{path:'/index/newsdetail',query:{id:news.id}}">查看详情</router-link>
      </el-tag>
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
	width: 600px;
	height: auto;
  margin-top:50px;
}
.article-item {
  width: 500px;
  height: 450px;
  margin: 40px auto;
  position: relative;
  border:1px solid @Gray;
  border-width: 1px 0 0 0;
  padding: 10px 0;
  overflow: hidden;
}
.article{
  width: 100%;
  height: 200px;
}
.more-btn{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.category-title{
  margin-left: 50px;
}
</style>