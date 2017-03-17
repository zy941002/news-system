<template>
  <div>
   {{categories}}

  </div>
</template>
<script>
import API from '../../api/api.js'
export default{
	mounted(){
		API.FIND(`admin/category`).then(res=>{
			this.$set(this,"categories",res.data.data)
			console.log(res.data.data)
		})
	},
	data(){
		return{
			categories:[]
		}
	}

}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
</style>