<template>
  <div class="main">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/newspanle' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{status}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="news" :rules="rules" ref="news" label-width="100px">
      <el-form-item label="新闻名称" prop="title">
        <el-input v-model="news.title"></el-input></el-form-item>
      
      <el-form-item label="点击量" prop="clicked">
        <el-input v-model="news.clicked":disabled="true"></el-input></el-form-item>

      <el-form-item label="审核状态">
        <el-switch on-text="通过" off-text="不通过"  @change="handleStatus(news)" v-model="news.pass"></el-switch></el-form-item>

      <el-form-item label="置顶">
        <el-switch on-text="置顶" off-text="不置顶" v-model="news.top"@change="handleStatus(news)"></el-switch>
      </el-form-item>

      <el-form-item label="分类于">
        <div v-if="news.categories.length>0">
          <el-tag
            v-for="tag in news.categories"
            :closable="true"
            :key='tag'
            @close="handleClose(tag)">{{tag.name}}</el-tag>
        </div>
        
        <div v-else>
          <el-tag>暂无分类</el-tag></div>        
      
      </el-form-item>

      <el-form-item label="新增分类" >
        <el-select  placeholder="请选择" v-model="newscate">
          <el-option
            v-for="item in exisitCates"
            :label="item.name"
            :key = 'item'
            :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="首页配图">
          <el-upload
            action="http://localhost:8360/admin/upload"
            type="drag"
            name="image"
            :show-file-list="false"            
            :multiple="false"
             :data="news"
            :on-success="setURL">
            <img v-if="news.imageurl" :src="news.imageurl" class="index-img">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>
      
      <el-form-item label="添加摘要" >
        <el-input v-model="news.preview" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="新闻内容">
          <div  id="editor"></div>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('news')">{{status}}</el-button>
        <el-button @click="resetForm('news')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getters from '../../vux/news.js'
import API from '../../api/api.js'
import wangEditor from 'wangeditor'
import storage from '../../assets/js/storage.js'
export default {
  computed:{
      status(){
        if(this.$route.query.id){
          return "更新新闻"
        }else{
          return "新增新闻"
        }
      }
    },
  mounted(){
    this.news.id = this.$route.query.id
    let __this = this;
     let editor = new wangEditor('editor');
        editor.config.uploadImgUrl = 'http://localhost:8360/admin/upload';
        editor.config.uploadImgFileName = 'image';
        editor.config.printLog = false;
      
    editor.config.uploadImgFns.onload = function (resultText, xhr) {
      var originalName = editor.uploadImgOriginalName || '';  
      editor.command(null, 'insertHtml', '<img src="' + JSON.parse(resultText).url + '" alt="' + originalName + '" style="max-width:100%;"/>');
    };
      
    editor.config.uploadImgFns.ontimeout = function (xhr) {
      alert('上传超时');
    };
    
    editor.config.uploadImgFns.onerror = function (xhr) {
      alert('上传错误');
    };
    
    editor.create();    
    editor.onchange = function () {
      __this.news.content = this.$txt.html();
    };
    
    if(this.news.id){
       API.FIND(`news/news/find`,{id:this.news.id}).then(res=>{
          if(res.data.errno==0){
            res.data.data.pass = Boolean(res.data.data.pass)
            res.data.data.top = Boolean(res.data.data.top)

            __this.$set(__this,'news',res.data.data)
            this.news.id = this.$route.query.id
            editor.$txt.html(__this.news.content)
          }  
       })
    }    
   
        
  },
  created(){
    API.FIND(`admin/category`).then((res)=>{
      this.exisitCates = res.data.data
    })
  },
  watch:{
    newscate:function(newVal){
      let id = this.$route.query.id?this.$route.query.id:-1;
      let hasin = false;
      this.news.categories.forEach((item,index)=>{
        if(newVal.id===item.id){
          this.$message({message:`该新闻已属于${item.name}`,type:"error"});
          hasin  = true;
          return ;
        }
      });
      if(!hasin&&this.news.id){
        API.FIND(`category/category/add`,{id:id,cate_id:newVal.id}).then(res=>{
          console.log(res.data)
        })
        this.news.categories.push({name:newVal.name,id:newVal.id})
      }else if(!hasin){
        this.news.categories.push({name:newVal.name,id:newVal.id})
      }
    }
  },
  data() {
    return {
      exisitCates:[],
      categories:[],
      newscate:'',
      news:{
        user:{},
        title:"",
        categories:[],
        pass:false,
        top:false,
        content:"",
        imageurl:""
      },
      rules: {
        title:[
          {required:true,message:"请输入新闻标题"}
        ]
      }
      };
    },  
    methods: {
      submitForm(formName) {
        this.news.user = JSON.parse(storage.get(`userInfo`))
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.POST(`news/news/addnews`,this.news).then((res)=>{
              if(res.body.errno==0){
                this.$message.success(`${this.status}成功`)
                this.$router.push({path:`/admin/newspanle`})
              }else if(res.body.errno>0){
                this.$message.error(`后台出错，请将错误码发送给客服`)
              }
            })
          } else {
            this.$message.error(`请正确填写表单`)
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag){
        API.DELETE(`category/category/delete`,{id:this.news.id,cate_id:tag.id}).then((res)=>{
          if(res.data.errno===0){
            this.news.categories.splice(this.news.categories.indexOf(tag),1)  
          }
        })          
      },
      setURL(res, file){
        this.news.imageurl =  res.url
        this.$store.dispatch('SET_FILE',res)
      },
      handleStatus(){        
        console.log(this.news.id)
        if(this.news.id){
          API.POST(`news/news/addnews`,this.news).then(res=>{
            console.log(res)
          })
        }
      }
  }
}
</script>
<style type="text/css">
  .index-img {
    width: 300px;
    height: 200px;
  }
</style>