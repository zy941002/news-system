<template>
  <div @click="goDetail()">
    {{user.name}}
  </div>
</template>

<script>
  import Storage from '../../assets/js/storage.js'
  import API from '../../../src/api/api.js'
  import { mapGetters } from 'vuex'
  export default {
  	name:"manage",
  	data(){
  		return{
  			user:null
  		}
  	},
    created(){
      this.user = JSON.parse(Storage.get("userInfo"));
    },
    methods:{
      goDetail(){
        this.$store.dispatch('SET_USER',{id:this.user.id})
        this.$router.push({name:"userdetail",query:{id:this.user.id}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->