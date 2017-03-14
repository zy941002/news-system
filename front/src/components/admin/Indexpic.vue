<template>
  <div>
    <el-tag type="success">图片预览</el-tag>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in pics" :key='item'>
        <img :src="item.url">      
    </el-carousel-item>
  </el-carousel> 

  <el-upload
      action="http://localhost:8360/admin/upload"
      name="image"
      :multiple="false"
      :on-success="setURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :fileList="pics"
      list-type="picture">
      <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>

  </div>
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
      API.FIND(`admin/config`).then((res)=>{
        this.pics = res.data.data
     })
    },
    methods:{
      setURL(res){
        this.pics.push({url:res.url,id:res.id})
        let {originalFilename,url} = res
        API.POST(`admin/config`,{name:originalFilename,url:url,type:0}).then(async (res)=>{
          this.$message({
            message:"添加图片成功"
          })
        })
      },
      handlePreview(file){

      },
      handleRemove(file, fileList) {
      
        API.DELETE(`admin/config/${file.id}`).then(res=>{
          this.pics.splice(fileList.indexOf(file),1)
        })
      },
    }
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