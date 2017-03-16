<template>
  <div class="main">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/newslist' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{status}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新闻名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="点击量" prop="clicked">
        <el-input v-model="ruleForm.clicked":disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="审核状态">
        <el-switch on-text="通过" off-text="不通过" v-model="ruleForm.pass"></el-switch>
      </el-form-item>
      <el-form-item label="分类于">
        <div v-if="ruleForm.extra.cate.length>0">
            <el-tag
            v-for="tag in ruleForm.extra.cate"
            :closable="true"
            :key='tag'
            @close="handleClose(tag)"
          >
            {{tag.cate.name}}
          </el-tag>
        </div>

        <div v-else>
          <el-tag>暂无分类</el-tag>
        </div>        
      </el-form-item>

      <el-form-item label="新增分类" >
        <el-select  placeholder="请选择" v-model="newscate">
          <el-option
            v-for="item in categories"
            :label="item.name"
            :key = 'item'
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" id="editor"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getters from '../../vux/news.js'
import API from '../../api/api.js'
import wangEditor from 'wangeditor'
import storage from '../../js/storage.js'
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
    let id = this.$route.query.id?this.$route.query.id:-1;
    let __this = this;

    API.FIND(`news/news/fetch`,{id:id}).then((res)=>{
      if(res.data.data.length>0){
        res.data.data[0].pass =   Boolean(res.data.data[0].pass);  
        __this.$set(__this,'ruleForm',res.data.data[0])
      }
      
    
      let editor = new wangEditor('editor');
        editor.config.uploadImgUrl = 'http://localhost:8360/admin/upload';
        editor.config.uploadImgFileName = 'image';
      
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
        __this.ruleForm.content = this.$txt.html();
      };
      
      editor.$txt.html(__this.ruleForm.content);
    })        
  },
  created(){
    API.FIND(`admin/category`).then((res)=>{
      this.categories = res.data.data
    })
  },
  watch:{
    newscate:function(newVal){
      API.FIND(`admin/category/${newVal}`).then(res=>{
        let hasin = false;
        let  cell = res.data.data;
        this.ruleForm.extra.cate.forEach((item,index)=>{
          if(item.cate.name==cell.name){
            this.$message({message:`该新闻已属于${item.cate.name}`,type:"error"});
            hasin = true;
            return;
          }
        });        
        if(!hasin){
          this.ruleForm.extra.cate.push({cate:{name:cell.name,id:cell.id}})
        }
      })
    }
  },
  data() {
    return {
      categories:[],
      newscate:'',
      ruleForm:{
        title:"",
        extra:{
          cate:[],
          user:""
        }
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.extra.user = JSON.parse(storage.get(`userInfo`));
            console.log(this.ruleForm.extra.cate.cate)
            API.POST(`news/news/addnews`,this.ruleForm).then((res)=>{
              
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(tag){
        API.DELETE(`news/news/delcate`,{news_id:tag.news_id,cate_id:tag.cate_id}).then((res)=>{})
          this.ruleForm.extra.cate.splice(this.ruleForm.extra.cate.indexOf(tag),1)
      }
    }
}
</script>