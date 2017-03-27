<template>
  <div class="">
    <el-select v-model="category" placeholder="按分类查询">
      <el-option
        v-for="item in categories":key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  
  
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cate.name"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="news.title"
        label="新闻"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
        <el-button  type="primary" size="small">查看</el-button>
      </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import API from '../../api/api.js'
import { mapGetters } from 'vuex'
export default{
  name:'categorylist',
  mounted(){
    API.FIND(`news/news/categorylist`).then(res=>{
      this.$set(this,'tableData',res.data.data)
    }),
    API.FIND(`admin/category`).then((res)=>{
      this.$set(this,'categories',res.data.data)
    })
  },
  data(){
    return {
      tableData:[],
      category:"",
      categories:[],
    }
  },
  watch:{
    category:function(newVal){
      API.FIND(`news/news/categorylist`,{id:newVal}).then(res=>{
        console.log(res.data.data)
        this.$set(this,'tableData',res.data.data)
      })
    }
  }
}

</script>