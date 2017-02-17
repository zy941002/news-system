<template>
  <div id="admin">
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	mounted(){
    
		// console.log(this.$route.query.id)
	},
	computed: {
    ...mapGetters({
      news: 'GET_NEWS'
    })
  	},
    methods: {
      handleEdit(index, data) {
  
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style>
</style>
