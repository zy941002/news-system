<template>
    <figure @click="goDetail()" >
      <img :src="file.url" class="avatar">
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
        file:{}
  		}
  	},
    created(){

      this.user = JSON.parse(Storage.get("userInfo"));
      this.file = JSON.parse(this.user.file)
    
    },
    methods:{
      goDetail(){
        this.$store.dispatch('SET_USER',{id:this.user.id})
        this.$router.push({name:"userdetail",query:{id:this.user.id}})
      }
    }
  }
</script>
<style lang="less">
  .avatar{
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 50%;
    // margin-left: 40px;
    margin: 20px 0px 0 40px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->