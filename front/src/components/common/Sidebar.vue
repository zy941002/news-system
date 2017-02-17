<template>
  <div class="news-menu">
    <el-row>
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :router=true>
        	<el-menu-item index="user">
        		<span><img class="user-logo" src="../../assets/logo.png"></span>
        		<span class="nick-name">zhouying</span>
        	</el-menu-item>          
        	<el-menu-item index="userlist" @clcik="set_state('')"><i class="el-icon-star-on"></i>用户管理</el-menu-item>
          <el-menu-item index="newslist" @clcik="set_state('SET_NEWS')"><i class="el-icon-menu"></i>新闻管理</el-menu-item>
          <el-menu-item index="category" @clcik="set_state('')"><i class="el-icon-setting"></i>分类管理</el-menu-item>
          <el-menu-item index="setting" @clcik="set_state('')"><i class="el-icon-setting"></i>系统设置</el-menu-item>
        </el-menu>
      </el-col>
      <div> LOG OUT</div>
    </el-row>
  </div>
</template>
<script>
  export default {
  	components: {

  	},
    props: ['showMenu'],
    methods: {
      set_state(type){
        this.$store.dispatch(type);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
    // position: fixed;
    float: left;
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