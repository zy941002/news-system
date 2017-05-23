	<template>
  <div>
     <el-breadcrumb separator="/" class="bread-crumb fx-h-center">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/newspanle' }">新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    
      <el-tabs v-model="activeName">
    	 <el-tab-pane label="新闻列表" name="first">        
      <newslist></newslist>
    </el-tab-pane>

    <el-tab-pane label="文章置顶" name="second">
  		<topnews></topnews>
    </el-tab-pane>
   </el-tabs>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api.js'
import newslist from './Newslist.vue'
import topnews from './Topnews.vue'
export default {
	data() {
		return {
			activeName:"first"
		}
	},
	components:{
		newslist,
		topnews
	}

}
</script>
<style></style>