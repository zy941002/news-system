<template>
	<div>		
  		<div v-for="link in links">
  			<a :href="link.url">{{link.name}}</a>
  			
  		</div >
  	</div>
</template>
<script>
import API from '../../api/api.js'
export default{
	data(){
		return {
			links:[]
		}
	},
	props:['showAccess'],
	methods:{
		access(){
			this.show = !this.show
		},
		showLists(){
			this.showList = !this.showList
		},
		hideAccess(){
			let res = this.$emit("hideAccess");
		}
	},
	components:{
	},
	mounted(){
		API.FIND(`admin/config`).then(res=>{
			this.links = res.data.data.filter((item,index)=>{
				if(item.type==1){
					return item
				}
			})
			console.log(res.data.data)
		})
	}

}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
</style>