<template>
    <div class="main">
          <el-breadcrumb separator="/" class="bread-crumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
  	   <webclick></webclick>
    </div>
</template>
<script>
let ECharts = require('vue-echarts/components/ECharts.vue') 
import Vue from 'vue'
Vue.component('chart',ECharts)
import webclick from './Webclick.vue'
import API from '../../api/api.js'
export default {
  data: function () {
    let data = []
    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: 
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: ["ZZZ"],
            line:{}

          }
        ,
        animationDuration: 2000
      }
    }
  },
  components:{
  	webclick
  }

}
  
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->