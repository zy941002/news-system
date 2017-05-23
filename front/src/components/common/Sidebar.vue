<template>
  <div>
      <Newsheader :showSide="showSide" @toggleSide="toggleSide"></Newsheader>      
      <div class="hideSide fx-v-center":class="[{showSide:showSide}]">                      
          <el-menu :router=true>
            <h1 class="news-brand"><i>Incredible</i></h1>            
            <el-menu-item index="analysis"><i class="el-icon-date"></i>HOME</el-menu-item>
          	<div v-if="user.type==2">
                <el-submenu index="newspanle">
                      <template slot="title"><i class="el-icon-menu"></i>新闻管理</template>
                     <el-menu-item-group>
                        <el-menu-item index="newspanle">新闻列表</el-menu-item>
                        <el-menu-item index="newsdetail">新增新闻</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </div>
            
            <div v-if="user.type==2">
              <el-submenu index="userlist">
                  <template slot="title"><i class="el-icon-star-on"></i>用户管理</template>
                 <el-menu-item-group>
                    <el-menu-item index="userlist">用户列表</el-menu-item>
                    <el-menu-item index="userdetail">新增用户</el-menu-item>
                </el-menu-item-group>
              </el-submenu>                
            </div>

            <div v-if="user.type==1">
              <el-menu-item index="newspanle"><i class="el-icon-star-on"></i>我的新闻</el-menu-item> 
            </div>                        
            <el-menu-item index="category"><i class="el-icon-setting"></i>分类管理</el-menu-item>
            <el-menu-item index="setting" ><i class="el-icon-setting"></i>系统设置</el-menu-item>
          </el-menu>        
        <div>
          <el-button class="log-out-btn" type="primary" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i></el-button>
        </div>
      </div>
      <div class="hidemain" :class="[{main:showSide}]" >
        <router-view class="info-body"></router-view> 
      </div>
    </div>
</template>
<script>
  import Usericon from '../../components/user/Usericon.vue'
  import Storage from '../../assets/js/storage.js'
  import Newsheader from '../news/Newsheader.vue'
  export default {
  	components: {
      Usericon,
      Newsheader
  	},
    mounted(){
      this.user = JSON.parse(Storage.get(`userInfo`))
    },
    data(){
      return {
        user:{},
        showSide:true
      }
    },
    methods: {
      set_state(type){
        this.$store.dispatch(type);
      },
      logout(){
        Storage.delete(`userInfo`);
        this.$router.push({path:'/login'})
      },
      toggleSide(){
        this.showSide = !this.showSide
      }
    }
  }
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
  .log-out-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      border-radius: 0!important;
  }
  .news-brand {
    text-align: center;
    padding: 10px 0;
  }
  .hideSide {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 43px;
    z-index: 99;
    box-shadow: 2px 3px 10px rgba(0,0,0,.25);
    overflow: hidden;
    border-radius: 3px;
    transition: all 0.4s ease-in-out;    
  }
  .showSide {
    width: 200px;
    transition: all 0.4s ease-in-out;    
    .el-menu-item{
      width: 200px;
    } 
 }
.hidemain{
  position: absolute;
  left: 43px;
  top:100px;
  min-height: 760px;
  transition: all .4s ease-in-out;    
  background: @LightGray;
  right: 0;  
}
.hideSide .el-submenu__icon-arrow{
    display: none;
  }
.main{
  left:200px;
  transition: all .4s ease-in-out;
}
.el-menu{
  background: white;
  overflow: hidden;
}
.el-menu-item{
  height: 50px;
  overflow: hidden;

}
.el-menu-item.is-active{
  background: @ActiveBlue;
  color:white;
}
.fa-5x {
  font-size: 14px;
}
</style>