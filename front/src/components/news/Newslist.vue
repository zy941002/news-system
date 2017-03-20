<template>
  <div>
 

    <el-button type="primary" @click="goNew">添加新闻</el-button>    
  	<el-table
    :data="pageInfo.data"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="新闻ID"
        width="90">
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
        width="90">
        <template scope='scope'>
        	{{ scope.row.pass }} 
        </template>		
      </el-table-column>


      <el-table-column 
        label="操作"
        width="150"
      >
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
      <el-table-column  label="置顶" width="120">
        <el-table-column type="selection"></el-table-column>
      </el-table-column>
    </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      layout="prev, pager, next, jumper"
      :page-count="pageInfo.totalPages">
    </el-pagination>
  </div>


  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api.js'
export default {
	mounted(){
		API.FIND(`news/news/fetch`,{pageNum:1}).then((res)=>{
      this.$set(this,'pageInfo',res.data.data)
    })
	},
  data(){
    return{
      pageInfo: {
        count: 0,
        currentPage:1,
        data:[],
        numsPerPage: 10,
        totalPages: 0
      },
      multipleSelection: [],
    }
  },
  watch:{
    multipleSelection:function(newTop){
      if(newTop.length>=10){
          this.$alert("最多置顶十条热门新闻")
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
        API.FIND(`news/news/fetch`,{pageNum:val}).then((res)=>{
        this.$set(this,'pageInfo',res.data.data)
      })
    },
    goNew(){
      this.$router.push({name:'newsdetail'})
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleEdit(index, data) {
      this.$router.push({name:"newsdetail",query:{id:data.id}});
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