<template>
  	<div>
    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          	<el-upload
          		action="http://120.77.37.91:8360/admin/upload"
          		type="drag"
          		name="image"
          		:data="ruleForm"
          		:multiple="false"
          		:on-success="setURL">        
          		<img v-if="imageUrl" :src="imageUrl" class="avatar">
          		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
          		<div class="el-upload__tip" slot="tip" >点击上传头像</div>
         	</el-upload>
	      	
	      	<el-form-item label="昵称" prop="name">
	        	<el-input type="text" v-model="ruleForm.nickname" auto-complete="off"></el-input>
	      	</el-form-item>

	      	<el-form-item label="用户名" prop="name">
	        	<el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
	      	</el-form-item>

	      	<el-form-item label="密码" prop="password">
	        	<el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
	      	</el-form-item>

	      	<el-form-item label="确认密码" prop="checkPass">
	        	<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
	      	</el-form-item>

	      	<el-form-item label="邮箱" prop="email">
	        	<el-input v-model.number="ruleForm.email"></el-input>
	      	</el-form-item>

	      	<el-form-item>
	        	<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
	        	<el-button @click="resetForm('ruleForm')">重置</el-button>
	     	</el-form-item>
    	</el-form>
  	</div>
</template>

<script>
import API from '../../api/api.js'
  export default {
    name:"register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          	if (this.ruleForm.checkPass !== '') {
            	this.$refs.ruleForm.validateField('checkPass');
         	}
          	callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          	callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          	callback(new Error('两次输入密码不一致!'));
        }else {
         	 callback();
        }
      };
      return {
        imageUrl: '',
        ruleForm: {
          	password: '',
          	checkPass: '',
          	age: '',
          	name:'',
          	nickname:'',
          	email: '',
          	type:1,
        },
        rules: {
          	pass: [
            	{ validator: validatePass, trigger: 'blur',required: true},
          	],
          	checkPass: [
            	{ validator: validatePass2, trigger: 'blur', required: true},
          	],
          	email: [
            	{ required: true, message: '请输入邮箱地址' },
            	{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          	],
          	username: [
             	{ required: true, message: '请输入用户名', trigger: 'change' }
          	]
        }
      };
    },
    methods: {
    	submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          	if (valid) {
	            	let file = {file:this.$store.state.file}
	            	let params = Object.assign(this.ruleForm,this.$store.state.file)
	            	API.POST(`admin/user/add`,this.ruleForm).then((res)=>{
	            	
	            	})
	          	} else {
	            	this.$message.error('请正确填写表单信息');
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
}
</script>