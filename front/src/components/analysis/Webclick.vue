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
    API.FIND("admin/record/getrecord").then(res=>{
      res.data.data.forEach((item,index)=>{
        this.option.xAxis.data.push (this.$moment(item.date).format(`MM-DD`))
        this.option.series[0].data.push(item.count)
      })
    })
  },  
  data() {
    return{
      option: {
          title: {
              text: '首页PV量',
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