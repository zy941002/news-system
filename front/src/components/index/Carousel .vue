<template>
	 <el-carousel :interval="4000" type="card" height="200px">
	    <el-carousel-item v-for="item in pics" :key='item'>
	    	<img :src="item.url">      
	     </el-carousel-item>
	 </el-carousel> 
 </template>
 <script>
import API from '../../api/api.js'
export default{
    data(){
      return{
        pics:[],
      }
    },
    mounted(){
      API.FIND(`admin/config/`).then((res)=>{    
        this.pics = res.data.data.filter((item,index)=>{
          if(item.type==0){
            return item
          }
        })    
     })
    },
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>