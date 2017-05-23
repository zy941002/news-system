<template>
    <div>
        <el-breadcrumb separator="/" class="bread-crumb fx-h-center">
            <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin/' }">数据分析</el-breadcrumb-item>
        </el-breadcrumb>
        <Clickmax></Clickmax>
        <div class="fx-v-btw">
  	       <webclick></webclick>
          <NewsClick></NewsClick>
        </div>
       
    </div>
</template>
<script>
let ECharts = require('vue-echarts/components/ECharts.vue') 
import Vue from 'vue'
Vue.component('chart',ECharts)
import webclick from './Webclick.vue'
import Clickmax from './Clickmax.vue'
import NewsClick from './Newsclick.vue'
import API from '../../api/api.js'

export default {
  components:{
  	webclick,
    Clickmax,
    NewsClick
  }
}
</script>