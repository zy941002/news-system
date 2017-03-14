<template>
  <div class="main category-list">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/' }">分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <newcategoy></newcategoy>
    
    <el-tabs v-model="activeName">
    <el-tab-pane label="分类列表" name="first">
      <categories></categories>    
    </el-tab-pane>

    <el-tab-pane label="列表查询" name="second">
      <categorylist></categorylist>
    </el-tab-pane>
  </el-tabs>
  
  
  </div>
</template>

<script>
import newcategoy from './Newcategory.vue'
import categorylist from './Categorylist.vue'
import categories from './categories.vue'
import { mapGetters } from 'vuex'
export default {
	name:"category",
  data(){
    return{
      activeName: 'first'
    }
  },
	mounted(){
    this.$store.dispatch('SET_CATEGORIES')
	},
  // computed: {
  //   ...mapGetters({
  //     tableData: 'GET_CATEGORIES'
  //   })
  // },
  components:{
    newcategoy,
    categorylist,
    categories
  },
  methods:{

  }
}
</script>
<style scoped lang="less"></style>