  <template>
  <div class="">
    <chart :options="option"></chart>
  </div>

</template>
<script>
let ECharts = require('vue-echarts/components/ECharts.vue') 
import Vue from 'vue'
Vue.component('chart',ECharts)
import * as TOOLS from '../../../src/js/tool.js'
import API from '../../api/api.js'
export default {
  data: function () {
    return {
      option :{
        title: {
          text: '网站点击量',
          // subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['点击量','预购','成交']
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {show: true, type: ['stack', 'tiled']},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          ype: 'value'
        },
        series: [
        {
          name: '点击量',
          type: 'line',
          smooth: true,
          data: [1320, 1132, 601, 234, 120, 90, 20]
        }]
      }
    }
  },
}
  
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->