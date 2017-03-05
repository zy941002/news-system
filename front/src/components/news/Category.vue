<template>
  <div>
  <newcategoy></newcategoy>
	<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="分类ID"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="分类名称"
      width="180">
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
import newcategoy from './Newcategory.vue'
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
  components:{
    newcategoy,
  },
  methods:{
    handleDelete(index,data) {
      this.$http.delete(`http://localhost:8360/admin/category/${data.id}`).then((res)=>{
         this.$store.dispatch(`SET_CATEGORIES`)
      })
    }
  }
}
</script>
<style></style>