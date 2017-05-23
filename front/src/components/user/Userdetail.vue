  <template>
  <div>    
    <el-breadcrumb separator="/" class="bread-crumb fx-h-center">
      <el-breadcrumb-item :to="{ path: '/admin/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/userlist' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{status}}用户</el-breadcrumb-item>
    </el-breadcrumb>    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-form">
        <div class="upload-avatar  pv-center">
          <el-upload
          action="http://localhost:8360/admin/upload"
          type="drag"
          name="image"
          :data="ruleForm"
          :multiple="false"
          :on-success="setURL"
          >        
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip" >点击上传头像</div>
          </el-upload>
        </div>  
        <div class="user-item">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickname">
            <el-input  v-model="ruleForm.nickname"></el-input>
          </el-form-item>

          <el-form-item type="password" label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <div v-if="'创建'=== status">
           <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          </div>


        
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
            <el-button type="primary" @click="submitForm('ruleForm')">立即{{status}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
    </el-form>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import * as getters from '../../vux/user.js'
import API from '../../api/api.js'
import * as Util from '../../assets/js/util.js'
  export default {
    name:'userdetail',
    computed:{
      status(){
        if(this.$route.query.id){
          return "更新"
        }else{
          return "创建"
        }
      }
    },
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }      
      return {        
        user:null,
        imageUrl: '',
        ruleForm:{
          name: "",
          nickname: "",
          password:"",
          checkPass:"",
          email: "",
          type: 0,          
        },
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
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      }
    }, 
    mounted(){
      let params = {},id="";
      this.$route.query.id?params ={id:this.$route.query.id}:params={id:0}
      API.FIND(`admin/user/fetchuser`,params).then(res=>{
        console.log(res.data.data.data[0])
        if(res.data.data.data[0]){
          if(JSON.parse(res.data.data.data[0].file)){
            this.$set(this,'imageUrl',JSON.parse(res.data.data.data[0].file).url)  
          }else{
            this.$set(this,'imageUrl',"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490099421&di=7e2596e95a1374e5da277896882ffb4c&src=http://n1.itc.cn/img8/wb/recom/2015/12/10/144970265150133679.jpeg") 
          }          
          this.$set(this,`ruleForm`,res.data.data.data[0])
        }        
      })
    },   
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let file = {file:this.$store.state.file}
            let params = Object.assign(this.ruleForm,this.$store.state.file)

            API.POST(`admin/user/add`,params).then((res)=>{
              if(res.data.data){
                this.$message({
                  message:"添加成功",
                  type:"success"
                })
              }
              this.$store.dispatch('SET_USER',{id: res.data.data})
              this.$router.replace({path:'/admin/'})
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
      setURL(res, file, fileList){
        let data = {
          url : res.url,
          name : res.originalFilename
        }
        this.imageUrl = data.url;
        this.$store.dispatch('SET_FILE',res)
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../assets/less/CV.less');
  .avatar-uploader-icon {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 50%;
    color: @Gray;
    border: 1px solid @Gray;
  }
  .avatar {
    width: 150px;
    height: 150px;
  }
  .user-form{
    width: 80%;
  }
  .upload-avatar{
    text-align: center;
    width: 200px;
    margin: 50px 0 0 40px;
    line-height: 32px;
  }
  .el-form-item{
    margin-left: 300px;
    margin-top: 20px;
  }
  .user-item{
    margin-top:-200px;
  }

</style>