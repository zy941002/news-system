<template>
    <figure @click="goDetail()" >
      <img :src="file.url" class="admin-avatar">
    </figure>
</template>

<script>
  import Storage from '../../assets/js/storage.js'
  import API from '../../../src/api/api.js'
  import { mapGetters } from 'vuex'
  export default {
  	name:"manage",
  	data(){
  		return{
  			user:{},
        file:{
          url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489927021733&di=4270db9a6def0a9a10e18cbd8f856ac9&imgtype=0&src=http%3A%2F%2Ffb.topit.me%2Fb%2F68%2Fec%2F1196527923131ec68bl.jpg"
        }
  		}
  	},
    created(){
      this.user = JSON.parse(Storage.get("userInfo"));
      this.file = JSON.parse(this.user.file)
    },
    mounted(){
      
    },
    methods:{
      goDetail(){
        this.$router.push({name:"userdetail",query:{id:this.user.id}})
      }
    }
  }
</script>
<style lang="less">
@import url("../../assets/less/CV.less");
  .admin-avatar{
    &:extend(.avatar);
    margin: 20px 0px 0 40px;
  }
</style>