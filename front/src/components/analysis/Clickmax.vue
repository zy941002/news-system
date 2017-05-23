<template>
    <div class="fx-v-btw">
     	<el-button type="success">点击量最高:{{hotnews.title}}</el-button>
    </div>
</template>
<script>
import API from '../../api/api.js'
export default {
	data(){
		return {
			hotnews:{
        title:""
      },
		}
	},
  	mounted(){
    	API.FIND(`news/news/clickmax`).then(res=>{
    		this.$set(this,`hotnews`,res.data)
    })
  }
}
</script>
<style lang="less">
@import url('../../assets/less/CV.less');
</style>