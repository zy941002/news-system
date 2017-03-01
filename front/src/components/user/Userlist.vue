<template>
  <div>
    <el-button type="primary" @click="goNew">添加用户</el-button>
    <el-table
      :data="users"
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="120">
      </el-table-column>

      <el-table-column
        prop="type"
        label="类型"
        width="120">
      </el-table-column>      
      <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <el-button @click="edit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteUser(scope.$index,scope.row)"type="text" size="small">删除</el-button>
        
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import newuser from '../user/Newuser.vue'
import * as TOOLS from '../../../src/js/tool.js'
import API from '../../api/api.js'
  export default{
  	name:"userlist",
  	 methods:{
      edit(index,row){
        this.$store.dispatch('SET_USER',{id:row.id})
        this.$router.push({ name: 'userdetail', query: { id: row.id }})
      },
      deleteUser(index,row){
      this.$confirm('此操作将永久删除该用户及相关数据, 是否继续?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          API.DELETE(`admin/user/remove`,{id:row.id}).then((res)=>{
            this.users.splice(row.index,1);
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
        })
      },
      goNew(){
        this.$router.push({name:'newuser'})
      }
    },
  	data(){
  		return{
  		  users: []
  		}
  	},
  	mounted(){
  		this.$http.get(`http://localhost:8360/admin/user`).then((res)=> {
        this.$set(this,"users",res.data.data)		
  		})
  	},
    components:{
      newuser,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->