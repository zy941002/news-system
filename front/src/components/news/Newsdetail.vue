<template>
  <div id="admin">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/admin/newslist' }">新闻列表</el-breadcrumb-item>
    <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
  </el-breadcrumb>

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新闻名称" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="创建/修改时间">
      <el-tag type="warning">{{ruleForm.timeflag}}</el-tag>
    </el-form-item>
    <el-form-item label="审核状态">
      <el-switch on-text="通过" off-text="不通过" v-model="ruleForm.pass"></el-switch>
    </el-form-item>

    <el-form-item label="分类于">
      <el-tag
        v-for="tag in ruleForm.extra.cate"
        :closable="true"
        :key='tag'
        @close="handleClose(tag)"
      >
      {{tag.cate.name}}
      </el-tag>
    </el-form-item>

  <el-form-item label="新增分类">
    <el-tag
      v-for="tag in ruleForm.extra.uncate"
      :closable="true"
      :key='tag'
      @close="handleClose(tag)"
    >
    {{tag.uncate.name}}
    </el-tag>
    </el-form-item>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
{{ruleForm.extra.uncate}}
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import getters from '../../vux/news.js'
import API from '../../api/api.js'
export default {
	computed: {
    ruleForm(){
      this.$store.state.news.news.pass=Boolean(this.$store.state.news.news.pass);
      return this.$store.state.news.news
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
      this.$store.state.news.news.extra.cate.splice(this.$store.state.news.news.extra.cate.indexOf(tag), 1);
      }
    }
}
</script>

<style>
</style>
