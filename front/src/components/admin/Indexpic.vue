<template>
    <div>
      <el-carousel :interval="2000" type="card" height="200px">
        <el-carousel-item v-for="item in pics" :key='item'>
          <img :src="item.url">      
        </el-carousel-item>
      </el-carousel>     
      <el-upload
          class="carouse-list"
          action="http://localhost:8360/admin/upload"
          name="image"
          :multiple="false"
          :on-success="setURL"
          :on-remove="handleRemove"
          :fileList="pics"
          list-type="picture">
          <el-button size="big" type="success"><i class="el-icon-plus avatar-uploader-icon"></i> 添加图片</el-button>        
      </el-upload>
    </div>
</template>
<script>
import API from '../../api/api.js'
import {baseUrl} from '../../api/baseserver.js'
export default{
    data(){
      return{
        pics:[],
        baseUrl: baseUrl
      }
    },
    mounted(){
      console.log(this.baseUrl)
      API.FIND(`admin/config/`).then((res)=>{
        this.pics = res.data.data.filter((item,index)=>{
          if(item.type==0){
            return item
          }
        })    
     })
    },
    methods:{
      setURL(res){
        this.pics.push({url:res.url,id:res.id})
        let {originalFilename,url} = res;
        console.log(res)
        API.POST(`admin/config/addconfig`,{name:originalFilename,url:url,type:0}).then(async (res)=>{
          this.$message({
            message:"添加图片成功"
          })
        })
      },
      handleRemove(file, fileList) {   
      console.log(file)   
        API.DELETE(`admin/config/delete?id=${file.id}`).then(res=>{
          this.pics.splice(fileList.indexOf(file),1)
        })
      },
    }
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.carouse-list {
  width: 80%;
  margin: 0 auto;
}
</style>