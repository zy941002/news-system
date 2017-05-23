<template>
  <div class="category-list">
  	<el-table
      slot = "lable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="分类ID">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="分类名称">        
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
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
	name:"category",
	mounted(){
    this.$store.dispatch('SET_CATEGORIES')
	},
  computed: {
    ...mapGetters({
      tableData: 'GET_CATEGORIES'
    })
  },
  methods:{
    handleDelete(index,data) {
      this.$confirm('确定删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).
      then(() => {
        this.$http.delete(`http://localhost:8360/admin/category/${data.id}`).then((res)=>{
           this.$store.dispatch(`SET_CATEGORIES`)
        })}).
      catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });      
    }
  }
}
</script>
<style scoped lang="less"></style>