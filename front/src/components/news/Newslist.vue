<template>
  <div class="main">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/newslist' }">新闻列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="goNew">添加新闻</el-button>    
  	<el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        label="新闻ID"
        width="180">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>    
      <el-table-column
        label="作者"
        width="180">
        <template scope='scope'>
        	{{ scope.row.extra.user.name }}
        </template>		
      </el-table-column>
      <el-table-column
        label="标题"
        width="180">
        <template scope='scope'>
        	{{ scope.row.title }}			      
        </template>		
      </el-table-column>
      <el-table-column
        label="审核状态"
        width="180">
        <template scope='scope'>
        	{{ scope.row.pass }} 
        </template>		
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api.js'
export default {
	mounted(){
		API.FIND(`news/news/fetch`).then((res)=>{
      this.$set(this,'tableData',res.data.data)
    })
	},
  data(){
    return{
      tableData:[]
    }
  },
  methods: {
    goNew(){
      this.$router.push({name:'newsdetail'})
    },
    handleEdit(index, data) {
      this.$router.push({name:"newsdetail",query:{id:data.id}});
      // this.$store.dispatch('SET_NEWS',{id:data.id})
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.DELETE(`news/news/remove`,{id:row.id}).then((res)=>{
            this.tableData.splice(index,1);
            // this.$store.dispatch('SET_NEWS')
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      



      
    }
  }
}
</script>
<style></style>