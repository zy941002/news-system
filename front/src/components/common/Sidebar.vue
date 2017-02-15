<template>
  <div class="news-menu" :class="{'show':showMenu}">
    <el-row class="tac">
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :router=true>
        	<el-menu-item index="user">
        		<span><img class="user-logo" src="../../assets/logo.png"></span>
        		<span class="nick-name">zhouying</span>
        	</el-menu-item>          
        	<el-menu-item index="userlist"><i class="el-icon-star-on"></i>用户管理</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-menu"></i>导航二</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-setting"></i>导航三</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
  	components: {

  	},
    props: ['showMenu'],
    methods: {
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
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 100px;
    z-index: 99;
    // left: -50px;
    background: @Navyblue;
    &.show {
        transform: translateX(200px);
    }
    &::after{
      content: '';
      width: 100px;
      height: 100px;
      position: absolute;
      left: 200px;
      background: red;
    }
  }
</style>