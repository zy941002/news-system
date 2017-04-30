<template>
  <div>	  
	    <el-date-picker
	      v-model="topDate"
	      align="right"
	      type="date"
	      placeholder="选择日期"
	      :picker-options="pickerOptions1">
	    </el-date-picker>
  	 <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        label="新闻ID"
        width="90">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>    
      <el-table-column
        label="标题"
        width="180">
        <template scope='scope'>
        	{{ scope.row.title }}			      
        </template>		
      </el-table-column>
      <el-table-column
        label="审核状态"
        width="90">
        <template scope='scope'>
        <el-switch
          v-model="scope.row.pass"
          on-text="通过"
          @change="handleStatus(scope.$index, scope.row)"
          off-text="不通过">
        </el-switch>
        </template>		
      </el-table-column>


      <el-table-column 
        label="操作"
        width="150"
      >
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>

      <el-table-column  label="置顶" width="120">
        <template scope='scope'>
        <el-switch
          v-model="scope.row.top"
          on-text="置顶"
          @change="handleStatus(scope.$index, scope.row)"
          off-text="不置顶">
        </el-switch>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api.js'
export default {
	data() {
      return {
      	data:[],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        topDate:""
      };
    },
    mounted(){    	
    	this.topDate = new Date().toString()
    	API.FIND(`news/news/top?date=${this.topDate}`).then(res=>{
    		res.data.data.forEach((item,index)=>{
    			item.pass = Boolean(item.pass)
    			item.top = Boolean(item.top)
    		})
    		this.$set(this,"data",res.data.data)
    	})
    },
    methods:{
    	handleEdit(index, data) {
      		this.$router.push({name:"newsdetail",query:{id:data.id}});
    	},
    },
    watch:{
    	topDate(newVal){
    		API.FIND(`news/news/top?date=${this.topDate}`).then(res=>{
    			res.data.data.forEach((item,index)=>{
    			item.pass = Boolean(item.pass)
    			item.top = Boolean(item.top)
    		})
    		this.$set(this,"data",res.data.data)
    		})
    	}
    }
}
</script>
<style></style>