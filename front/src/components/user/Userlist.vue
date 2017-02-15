<template>
  <el-table
    :data="users"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="用户ID"
      width="120">
    </el-table-column>
    
    <el-table-column
      prop="name"
      label="用户名"
      width="120">
    </el-table-column>

    <el-table-column
      prop="nickName"
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
</template>
<script>
  export default {
  	name:"userlist",
  	 methods: {
      edit(index,row) {
        console.log(row.id)
        this.$router.push({ name: 'userdetail', query: { userId: row.id }})
      },
      deleteUser(index,row) {
        this.$http.delete(`http://localhost:8360/user/user/${row.id}`).then((data)=>{
          console.log(data)
        })
      }
    },
  	data(){
  		return {
  		  users: []
  		}
  	},
  	mounted(){
  		this.$http.get(`http://localhost:8360/user/user`).then( (res)=> {
        this.$set(this,"users",res.data.data)		
  		})
  	}
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->