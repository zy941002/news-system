<template>
  <div class="news-index">    
    <newsmenu :showList='showList' @hideMenus="hideMenus"></newsmenu>    
    <div :class="{'trans-left':showAccess,'trans-right':showList}" class="news-title pv-center"> 
      <i class="fa fa-list icon list-icon her-center"  aria-hidden="true" @click="showLists"></i>
        <h1>Incredible</h1>
      <i class="fa fa-user-o icon access-icon her-center"  aria-hidden="true" @click="access"></i>
    </div>    
    <access  :showAccess="showAccess" @hideAccess="hideAccess"></access>        
    <div :class="{'cover':coverFlag}" @click="showCover"></div>
  </div>
</template>
<script>
import API from '../../api/api.js'
import newsheader from './Newsheader.vue'
import access from './Access.vue' 
import newsmenu from './Newsmenu.vue'
export default{
  data(){
    return {
      showAccess: false,
      showList: false,      
      coverFlag: false,
      active: "first",
    }
  },
  methods:{
    access(){
      this.showAccess = !this.showAccess
      this.coverFlag = true;
    },
    showCover(){
      this.coverFlag =!this.coverFlag      
      if(this.showAccess){
        this.showAccess = !this.showAccess        
      }
      if(this.showLists){
        this.showList = !this.showLists
      }
    },
    showLists(){
      this.showList = !this.showList
      this.coverFlag = true;
    },
    hideMenus(...args){
      switch (args.length){
        case 0:
          this.$router.push({path:'/index/'})
          this.showList = this.coverFlag = false
          break;
        case 1:
          this.showAccess =this.coverFlag = true 
          this.showList = false
          break;
        case 2:
          this.showList = this.coverFlag = false;
          let [id,position] = args
          this.$store.dispatch('SET_IDXCATEGORY',{id:id})
          this.$router.push({path:'/index/category',query:{id:id}})        
          break;
      }
    },
    hideAccess(){
      this.showAccess = this.coverFlag = false;
      this.$router.push({path:'/index'})
    },
    showAccess(){
      alert()
      this.showAccess = !this.showAccess
      this.coverFlag = false
    }
  },
  components:{
    newsheader,
    access,
    newsmenu
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.news-title{
  width: 100%;
  height: 50px;
  box-shadow: 0 0 4px rgba(0,0,0,.9);
  background: white;
  z-index: 11;
  position: fixed;
  top: 0;
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
  z-index: 111;
  background: rgba(0,0,0,.4);
}
.access-icon{
  right: 0;
}
.list-icon{
  left: 0;
}
</style>