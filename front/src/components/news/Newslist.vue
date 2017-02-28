<template>
  <div id="admin">
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
      	{{ scope.row.author_id }}
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
          @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
export default {
	mounted(){
		this.$store.dispatch('SET_NEWS')
	},
	computed: {
    ...mapGetters({
      tableData: 'GET_NEWS'
    })
  	},
    methods: {
      handleEdit(index, data) {
        this.$router.push({name:"newsdetail"});
        this.$store.dispatch('SET_NEWS',{dataid:data.id})
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style>
</style>
