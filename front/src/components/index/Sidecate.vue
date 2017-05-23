<template>
  <div class="side-news">
  <h4 class="category-title category-title-middle">时事追踪</h4>
    <div v-for="untop in untops" class="side-news-item">
    <h4 class="article-title article-title-middle" @click="goDetail(untop)">{{untop.title}}</h4>
        <figure v-if="untop.imageurl!=''"><img class="side-news-image"  @click="goDetail(untop)" :src="untop.imageurl"></figure>
        <section class="news-preview">{{untop.preview}}</section>
        <div>
          <section class="news-extra-info">
            &nbsp;&nbsp;{{moment(untop.create_time).format("YYYY-MM-DD")}}&nbsp;&nbsp;
            <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;<i>{{untop.clicked}}</i> &nbsp;&nbsp;
          </section>
      </div>
    </div>
    
  </div>
</template>
<script>
import API from '../../api/api.js'
import moment from 'moment'
export default{
  data(){
    return {
      untops:[]
    }
  },
  methods:{
    moment() {
      return moment()
    },
    goDetail(news){
      API.POST(`news/news/updateclick`,{
        id : news.id,
        clicked : ++news.clicked
      }).then(res=>{
        console.log(res)
      })
      this.$router.push({path:"/index/newsdetail",query:{id:news.id}});
    }
  },
  mounted(){  	
  	API.FIND(`news/news/untop?date=${new Date()}`).then(res=>{
      this.untops = res.data.data
  	})
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.side-news {
  width: 320px;
  float: right;
  border-left: 1px solid @Gray;
  padding-left: 20px;
  &-item{
    border-top: 1px solid @Gray;
  }
  &-image {
    width: 100%;
    height: 200px;
    display: block;
  }
}
.news-preview{
    font-size: 14px;
    color: gray;
    padding: 10px 0;
}
</style>