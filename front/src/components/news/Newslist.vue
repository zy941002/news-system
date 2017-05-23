<template>
  <div>
    <div>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        >
      </el-date-picker>
    </div>
  	<el-table
    :data="pageInfo.data"
    style="width: 100%">
      <el-table-column
        label="新闻ID"
        width="80">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>    
      <el-table-column
        label="作者"
        width="100">
        <template scope='scope'>
        	{{ scope.row.name }}
        </template>		
      </el-table-column>
      <el-table-column
        label="标题"
        width="250">
        <template scope='scope'>
        	{{ scope.row.title }}			      
        </template>		
      </el-table-column>
      
      <div v-if="user.type==1">
        <el-table-column
          label="审核状态"
          width="100">
          <template scope='scope'>
          <div v-if="scope.row.pass=='0'">
            <el-button size="small" type=" danger">拒绝</el-button>  
          </div>
          <div v-if="scope.row.pass=='1'">
            <el-button size="small" type="success">通过</el-button>  
          </div>          
          </template>     
        </el-table-column>

        <el-table-column  label="置顶" width="120">
        <template scope='scope'>
          <div v-if="scope.row.top=='0'">
            <el-button size="small" type=" danger">未置顶</el-button>  
          </div>
          <div v-if="scope.row.top=='1'">
            <el-button size="small" type="success">置顶</el-button>  
          </div>        
        </template>
        </el-table-column> 
      </div>
      <div v-if="user.type==2">
        <el-table-column
          label="审核状态">
          <template scope='scope'>
            <el-switch
            v-model="scope.row.pass"
            on-text="通过"
            @change="handleStatus(scope.$index, scope.row)"
            off-text="不通过">
          </el-switch>
          </template>   
        </el-table-column> 
        <el-table-column  label="置顶">
        <template scope='scope'>
          <el-switch
            v-model="scope.row.top"
            on-text="置顶"
            @change="handleStatus(scope.$index, scope.row)"
            off-text="不置顶">
          </el-switch>
        </template>
      </el-table-column>
      </div>

      <el-table-column 
        label="操作"
        width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table-column>      
    </el-table>  
    <div class="fx-v-btw pagenation">
      <el-button type="primary" @click="goNew">添加新闻</el-button>    
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        layout="prev, pager, next, jumper"
        :page-count="pageInfo.totalPages">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '../../api/api.js'
import store from '../../assets/js/storage.js'
import moment from 'moment'
export default {
	mounted(){
    this.user = JSON.parse(store.get("userInfo"));
    let create_time =moment( this.date||new Date()).format(`YYYY-MM-DD`);
    if(this.user.type==1){
      API.FIND(`news/news/findlists`,{pageNum:1,author_id:this.user.id}).then(res=>{      
        res.data.data.data.map((item,index)=>{
          item.pass = Boolean(item.pass)
          item.top = Boolean(item.top)
        })
        this.$set(this,'pageInfo',res.data.data)
      })
    }
    if(this.user.type==2){
      API.FIND(`news/news/findlists`,{page:1}).then(res=>{      
        res.data.data.data.map((item,index)=>{
          item.pass = Boolean(item.pass)
          item.top = Boolean(item.top)
        })
        this.$set(this,'pageInfo',res.data.data.data)
      })
    }    
	},
  data(){
    return{
      user:{},
      date:"",
      pageInfo: {
        count: 0,
        currentPage:1,
        data:[],
        numsPerPage: 10,
        totalPages: 0
      },
      multipleSelection: [],
    }
  },
  watch:{
    date:function(newVal){
      let create_time =moment( this.date||new Date()).format(`YYYY-MM-DD`);
      this.user = JSON.parse(store.get("userInfo"));
      if(newVal){
        if(this.user.type==1){
          API.FIND(`news/news/findlists`,{pageNum:1,author_id:this.user.id,create_time:create_time}).then(res=>{      
            res.data.data.data.map((item,index)=>{
              item.pass = Boolean(item.pass)
              item.top = Boolean(item.top)
            })
            this.$set(this,'pageInfo',res.data.data)
          })
        }
        if(this.user.type==2){
          API.FIND(`news/news/findlists`,{page:1,create_time:create_time}).then(res=>{      
            res.data.data.data.map((item,index)=>{
              item.pass = Boolean(item.pass)
              item.top = Boolean(item.top)
            })
            this.$set(this,'pageInfo',res.data.data.data)
          })
        }        



      }
    }
  },
  methods: {
    handleStatus(index,item){
      API.POST(`news/news/addnews`,item).then((res)=>{
        if(res.data.errno==0){
          return true;
        }
      })
    },
    handleCurrentChange(val) {
        API.FIND(`news/news/findlists`,{page:val}).then((res)=>{
          res.data.data.data.map((item,index)=>{
            item.pass = Boolean(item.pass)
            item.top = Boolean(item.top)
          })
        this.$set(this,'pageInfo',res.data.data)
      })
    },
    goNew(){
      this.$router.push({name:'newsdetail'})
    },
    handleEdit(index, data) {
      this.$router.push({name:"newsdetail",query:{id:data.id}});
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.DELETE(`news/news/remove`,{id:row.id}).then((res)=>{
            this.pageInfo.data.splice(index,1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });      
    }
  }
}
</script>