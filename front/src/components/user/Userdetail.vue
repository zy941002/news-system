<template>
  <div>
    <el-upload
    action="//jsonplaceholder.typicode.com/posts/"
    type="drag"
    :thumbnail-mode="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :default-file-list="fileList"
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
        <el-input v-model="ruleForm.name"></el-input>
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
          <el-option label="作家" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import * as Utils from '../../js/util.js'
  export default {
    data(){
      return {
        user:null,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        ruleForm: {
          name: '',
          nickname: '',
          address: '',
          email:'',
          type: '',
          region: '',
          
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email',  message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        }



      }
    },    
    mounted(){
      let id = Utils.getQueryString('userId');
      this.$http.get(`http://localhost:8360/user/user/${id}`).then((res)=>{
        let {data} = res;
        this.$set(this,'ruleForm',data.data)
        console.log(this.ruleForm.type)
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->