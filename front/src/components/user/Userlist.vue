  <template>
  <div class="main">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-button type="primary" @click="goNew">添加用户</el-button>
    <el-table
      :data="pageInfo.data"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="120">
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="用户名"
        width="120">
      </el-table-column>

      <el-table-column
        prop="nickname"
        label="昵称"
        width="120">
      </el-table-column>
      
      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="120">
      </el-table-column>

      <el-table-column
        label="类型"
        width="120">
        <template scope="scope">
          <div v-if="scope.row.type==0">普通用户</div>
          <div v-if="scope.row.type==1">管理员</div>
          <div v-if="scope.row.type==2">超级管理员</div>
        </template>
      </el-table-column> 

      <el-table-column
        label="操作"
        width="150">
        <template scope="scope">
          <el-button @click="edit(scope.$index,scope.row)" type="button" size="small">编辑</el-button>
          <el-button @click="deleteUser(scope.$index,scope.row)"type="danger" size="small">删除</el-button>        
        </template>
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

import * as TOOLS from '../../assets/js/util.js'
import API from '../../api/api.js'
  export default{
  	name:"userlist",
  	 methods:{
      edit(index,row){
        this.$router.push({ name: 'userdetail', query: { id: row.id }})
      },
      deleteUser(index,row){
      this.$confirm('此操作将永久删除该用户及相关数据, 是否继续?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          API.DELETE(`admin/user/remove`,{id:row.id}).then((res)=>{
            if(res.data.errmsg.errno>0){
              this.$message.error(`后台出错, 请将错误码${res.data.errmsg.code}给客服`)
            }
            else{
              this.pageInfo.data.splice(index,1);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            }
            
          })
        }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
        })
      },
      goNew(){
        this.$router.push({name:'userdetail'})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        API.FIND(`admin/user`,{pageNum:val}).then(res=>{
          this.$set(this,"pageInfo",res.data.data)
        })
      }
    },
  	data(){
  		return{
        pageInfo:{
          count:0,
          totalPages:0,
          numsPerPage:10,
          currentPage:1,
          data:[]
        },
  		}
  	},
  	mounted(){
      API.FIND(`admin/user`).then(res=>{
        this.$set(this,"pageInfo",res.data.data)
      })
  	},
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->