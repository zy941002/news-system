  <template>
    <div class="analysis-wrapper">
      <chart class="news-analysis" :options="option"></chart>
    </div>
</template>
<script>
let ECharts = require('vue-echarts/components/ECharts.vue') 
Vue.component('chart',ECharts)
import Vue from 'vue'
import API from '../../api/api.js'
export default {
  mounted(){
    API.FIND("news/news/maxclick").then(res=>{
      res.data.forEach((item,index)=>{
        this.option.xAxis.data.push (item.title)
        this.option.series[0].data.push(item.clicked)
      })
    })
  },  
  data() {
    return{
      option: {
          title: {
              text: '点击量最高五条新闻',
          },
          tooltip: {
              trigger: 'axis'
          },
          toolbox: {
              show: true,
              feature: {
                saveAsImage: {show: true}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              name: '点击量',
              type: 'line',
              smooth: true,
              data: []
          }]
      }
    }
  }
}
</script>
<style type="text/css">
  .news-analysis{
    background: red;
    width: 100%;
  }
  .analysis-wrapper {
    width: 50%;
  }
</style>