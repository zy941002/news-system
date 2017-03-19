<template> 
	<div>
		<el-dialog :title="status" v-model="dialogTableVisible">
		<el-form  :model="curLink" class="demo-form-inline">
			<el-form-item label="网站名称">
		    	<el-input  v-model="curLink.name"placeholder="网站名称"></el-input>
		  	</el-form-item>

		  <el-form-item label="网站链接">
		    <el-input  v-model="curLink.url"placeholder="网站链接"></el-input>
		  </el-form-item>
 			
 			<el-button type="primary" @click="addLink">保存</el-button>
 			<el-button type="gray" @click="cancelLink">取消</el-button>
		  
		  </el-form>
		</el-dialog>
		<el-button type="primary" @click="addLink">新增</el-button>
		<el-table
    		:data="tableData"
    		border
    		style="width: 100%">
		   
		    <el-table-column
		      label="网站"
		      width="180">
		      <template scope="scope">
		        <el-icon name="time"></el-icon>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
		      </template>
		    </el-table-column>
		  
		    <el-table-column
		      label="链接"
		      width="180">
		      <template scope="scope">
		            {{ scope.row.url }}
		      </template>
		    </el-table-column>
		    
		    <el-table-column label="操作">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.row , scope.$index)">删除</el-button>
		      </template>
		    </el-table-column>
  		</el-table>
  		
	</div>
</template>

<script>
import Sidebar from '../common/Sidebar.vue'
import API from '../../api/api.js'
export default {
  name: 'admin',
  data(){
  	return{
  		tableData: [],
  		curLink:{},
  		dialogTableVisible: false,
  	}
  },
  computed:{
  	status(){
  		if(this.curLink.id){
  			return `更新链接`
  		}else{
  			return `新增链接`
  		}
  	}
  },
  components:{
  	Sidebar
  },
  mounted(){
  	API.FIND(`admin/config`).then(res=>{
  		this.tableData = res.data.data.filter((item,index)=>{
  			if(item.type == 1){
  				return item
  			}
  		})
  	})
  },
  methods:{
  	handleEdit:function(item,index){
  		this.curLink = item;
  		this.dialogTableVisible  = true
  	},
  	 addLink:function(){
  		this.dialogTableVisible = true
  		if(this.curLink.id){
  			API.PUT(`admin/config/config/name/${this.curLink.name}/url/${this.curLink.url}/${this.curLink.id}/`).then(res=>{
  				if(res.body.errmsg==0){
  					this.$message({
  						message:`${this.status}成功`,
  						type:"success"
  					},
  					)
  				 this.dialogTableVisible = false
  				}
  			})
  		}
  	},
  	cancelLink:function(){
		this.dialogTableVisible = false
  	},
  	handleDelete:function(item,index){
  		API.DELETE(`admin/config/${item.id}`).then(res=>{
  			console.log(res)
  		})
  	}	
  }
}
</script>
<style></style>