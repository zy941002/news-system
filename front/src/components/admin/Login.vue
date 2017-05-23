<template>
  <div class="login-panel fx-hs-center">
    <h2 class="brand-name"><i>欢迎使用新闻发布系统</i></h2>
    <div class="login-board">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      	<el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item class="fx-v-btw">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Storage from '../../assets/js/storage.js'
import API from '../../api/api.js'
  export default{
  	name:"login",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          username:"",
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur',required: true},
          ],
          username: [
          	 { required: true, message: '请输入用户名', trigger: 'change' }
          ]
        }
      };
    },
    porp:[],
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid){
            API.POST(`admin/auth/login`,{
              name : this.ruleForm.username,
              password: this.ruleForm.password
            }).then( (res)=> {
              if(res.data.errorno<0 ){
                this.$message.error('用户名或密码错误')
                return;
              }
              else if(res.data.data[0][`type`]===0){
                this.$message.error("非管理员,不能使用本系统");
              }
              else{
                Storage.set('userInfo',JSON.stringify(res.data.data[0]));
                this.$store.commit('SET_USER',res.data.data[0]);
                this.$router.push({path:"/admin/"});
              }
            })
          }
          else{
            this.$message.error('请正确填写表单信息');
            return false;
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    },
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
  .login-panel{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: @Navyblue;
  }
  .login-board {
    background: @ColorF;
    border-radius: 5px;
    padding: 30px 45px;
    box-shadow: rgba(0, 0, 0, 0.7) 5px 3px 8px;
    margin-top:40px;
  }
  .brand-name{
    color:@ColorF;
    margin-top:40px;
  }
  .el-form {
    width: 300px;
  } 
  .el-form-item{
    margin-bottom: 20px !important;
  }
  // .el-form-item__content {
  //   margin: 0;
  // }
  .fx-v-btw{
    margin-left: -80px;
  }
</style>