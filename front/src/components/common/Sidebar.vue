<template>
  <div>
      <el-row class="news-menu">
        <el-col>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :router=true>
          	<Usericon></Usericon>
            <el-menu-item index="analysis"><i class="el-icon-star-on"></i>走势分析  </el-menu-item>
          	<div v-if="user.type==2">
              <el-menu-item index="userlist"><i class="el-icon-star-on"></i>用户管理</el-menu-item>  
              <el-menu-item index="newspanle"><i class="el-icon-menu"></i>新闻管理</el-menu-item>
            </div>
            
            <div v-if="user.type==1">
              <el-menu-item index="newspanle"><i class="el-icon-star-on"></i>我的新闻</el-menu-item>  
            </div>
            
            <el-menu-item index="category"><i class="el-icon-setting"></i>分类管理</el-menu-item>
            <el-menu-item index="setting" ><i class="el-icon-setting"></i>系统设置</el-menu-item>
          </el-menu>
        </el-col>
        <div><el-button type="primary" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i></el-button></div>
      </el-row>
      <router-view></router-view>
    </div>
</template>
<script>
  import Usericon from '../../components/user/Usericon.vue'
  import Storage from '../../assets/js/storage.js'
  export default {
  	components: {
      Usericon
  	},
    mounted(){
      this.user = JSON.parse(Storage.get(`userInfo`));
      console.log(this.user)
    },
    data(){
      return {
        user:{}
      }
    },
    methods: {
      set_state(type){
        this.$store.dispatch(type);
      },
      handleOpen(key, keyPath) {
        this.$router.push({path:'userdetail',query:{id:JSON.parse(Storage.get('userInfo').id)}})
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goDetail(){
        this.$router.push({path:'userdetail',query:{id:JSON.parse(Storage.get('userInfo').id)}})
      },
      logout(){
        Storage.delete(`userInfo`);
        this.$router.push({path:'/login'})
      }
    }
  }
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
	.user-logo{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: inline-block;
		vertical-align: middle;
	}
  .news-menu{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 99;
    background: @Navyblue;
    transition: all 0.4s ease-in-out;
    &.show {
        transform: translateX(200px);
    }
  }
</style>