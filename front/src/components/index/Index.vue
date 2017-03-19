<template>
  <div>
    <newsheader></newsheader>
    <router-view></router-view>
    <backbutton></backbutton>
  </div>
</template>
<script>
import API from '../../api/api.js'
import newsheader from './Newsheader.vue'
import backbutton from './Backbutton.vue'
export default{
  components:{
    newsheader,
    backbutton
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.news-title{
  width: 100%;
  height: 50px;
  position: relative;
  border-bottom: 1px solid rgba(0,0,0,.25);
}

.news-index{
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0,0,0,.9);
}
.trans-left {
  transform:translateX(-300px)
}
.trans-right {
  transform:translateX(300px) 
}
.cover{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.4);
}
.access-icon{
  right: 0;
}
.list-icon{
  left: 0;
}
</style>