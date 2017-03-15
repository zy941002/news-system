<template>
  <div class="main">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/setting' }">系统设置</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-tabs v-model="activeName">
	    <el-tab-pane label="首页图片" name="first">
			<indexpic></indexpic>      
	    </el-tab-pane>
	    <el-tab-pane label="友链管理" name="second">
	    	<links></links>
	    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import indexpic from '../admin/Indexpic.vue'
import Links from './Links.vue'
export default {
	data(){
		return{
			activeName:"first"
		}
	},
	components:{
		indexpic,
		Links
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>