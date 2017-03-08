<template>
  <div>
    <el-upload
    action="http://localhost:8360/admin/upload"
    type="drag"
    name="image"
    :data="ruleForm"
    :thumbnail-mode="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :default-file-list="fileList"
    :multiple="false"
    :on-success="setURL"
    >        
    <i class="el-icon-upload"></i>
    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip" >点击上传头像</div>
    </el-upload>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <el-form-item label="邮寄地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="用户类型" prop="type">
        <el-select v-model="ruleForm.type">
          <el-option label="普通用户" value="0"></el-option>
          <el-option label="管理员" value="1"></el-option>
          <el-option label="超级管理员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
import * as getters from '../../vux/user.js'
import API from '../../api/api.js'
  export default {
    name:'userdetail',
    data(){
      return {
        user:null,
        ruleForm:{},
        fileList: [],
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email',  message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
        }
      }
    }, 
    mounted(){
      API.FIND(`admin/user/fetchuser`,{id:this.$route.query.id}).then(res=>{
        this.$set(this,`ruleForm`,res.data.data[0])
      })
    },   
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$store.state.file)
            let file = {file:this.$store.state.file}
            let params = Object.assign(this.ruleForm,this.$store.state.file)
            API.POST(`admin/user/add`,params).then((res)=>{
              this.$store.dispatch('SET_USER',{id: res.data.data})
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
      setURL(res, file, fileList){
        let data = {
          url : res.src,
          name : res.originalFilename
        }
        this.fileList.push(data)
        this.$store.dispatch('SET_FILE',res)
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->