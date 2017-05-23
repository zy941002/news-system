<template>
  <div class="">
    <el-select v-model="category" placeholder="按分类查询">
      <el-option
        v-for="item in categories":key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-date-picker
      v-model="date"
      align="right"
      type="date"
      placeholder="选择日期"
      :onchange="queryByDate"
      :picker-options="pickerOptions1">
    </el-date-picker>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="title"
          label="新闻">
        </el-table-column>      
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button @click="lookup(scope.$index,scope.row)"  type="success" size="small">查看</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default{
  name:'categorylist',
  mounted(){  
    API.FIND(`news/news/categorylist`).then(res=>{
      console.log(res.data)
      this.$set(this,'tableData',res.data)
    })
    API.FIND(`admin/category`).then((res)=>{
      this.$set(this,'categories',res.data.data)
    })

  },
  data(){
    return {
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      tableData:[],
      date:"",
      category:"",
      categories:[],
    }
  },
  methods:{
    queryByDate(newVal){
      console.log(newVal)
    },
    lookup(index,data){
      this.$router.push({path:"/admin/newsdetail",query:{id:data.news_id}});
      console.log(data)
    }
  },
  watch:{
    category:function(newVal){
     let create_time =moment( this.date||new Date()).format(`YYYY-MM-DD`);
      API.FIND(`news/news/categorylist`,{id:this.category,create_time:create_time}).then(res=>{  
        this.$set(this,'tableData',res.data)
      })
    },
    date:function(newDate) {
      let date =moment( this.date||new Date()).format(`YYYY-MM-DD`); 
      API.FIND(`news/news/categorylist`,{id:this.category,date:date}).then(res=>{
        this.$set(this,'tableData',res.data)
      })
    }
  }
}

</script>